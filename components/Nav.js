import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import Logo from "@/components/Logo";
import AsideNav from "./AsideNav";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Nav() {
  const inactiveLink = "flex gap-2 p-1 pr-10 hover:bg-highlight";
  const activeLink = inactiveLink + " bg-highlight";
  const [show, setShow] = useState(false);
  const router = useRouter();
  const { pathname } = router;
  const { data: session } = useSession();
  // console.log(session);

  async function logout() {
    await signOut();
    await router.push("/");
    toast.success("User Logged out");
  }

  return (
    <header className="sticky top-0 z-10 bg-white shadow-md flex items-center justify-between md:px-8 px-2">
      {/* <!-- logo --> */}
      <h1 className="mb-0 text-center">
        <Logo />
        {/* <Link href="/">Restaurants</Link> */}
      </h1>
      <div className="md:hidden flex items-center p-4">
        {session?.user && (
          <button className="bg-blue-500 text-white h-8 w-8 rounded-full font-bold ring-2 ring-white capitalize">
            {session?.user?.name.slice(0, 2)}
          </button>
        )}

        <button
          onClick={() => {
            setShow(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* <!-- navigation --> */}
      {session?.user?.role === "restaurant" && (
        <nav className="font-semibold hidden md:block">
          <ul className="flex items-center justify-center flex-wrap">
            <li
              className={`md:p-4        hover:border-opacity-100   duration-200 cursor-pointer  md:text-sm text-[10px] ${
                pathname === "/restaurant/dashboard" ? activeLink : inactiveLink
              }`}
            >
              <Link href="/restaurant/dashboard">Dashboard</Link>
            </li>
            <li
              className={`md:p-4        hover:border-opacity-100   duration-200 cursor-pointer  md:text-sm text-[10px] ${
                pathname === "/restaurant/pending" ? activeLink : inactiveLink
              }`}
            >
              <Link href="/restaurant/pending">Pending</Link>
            </li>
            <li
              className={`md:p-4        hover:border-opacity-100   duration-200 cursor-pointer md:text-sm text-[10px] ${
                pathname === "/restaurant/accepted" ? activeLink : inactiveLink
              }`}
            >
              <Link href="/restaurant/accepted">Accepted</Link>
            </li>
            <li
              className={`md:p-4        hover:border-opacity-100   duration-200 cursor-pointer md:text-sm text-[10px] ${
                pathname === "/restaurant/delivered" ? activeLink : inactiveLink
              }`}
            >
              <Link href="/restaurant/delivered">Delivered</Link>
            </li>
            <li
              className={`md:p-4        hover:border-opacity-100   duration-200 cursor-pointer md:text-sm text-[10px] ${
                pathname === "/restaurant/categories"
                  ? activeLink
                  : inactiveLink
              }`}
            >
              <Link href="/restaurant/categories">Categories</Link>
            </li>
            <li
              className={`md:p-4        hover:border-opacity-100   duration-200 cursor-pointer md:text-sm text-[10px] ${
                pathname === "/restaurant/foodItems" ? activeLink : inactiveLink
              }`}
            >
              <Link href="/restaurant/foodItems">FoodItems</Link>
            </li>
          </ul>
        </nav>
      )}

      {session?.user?.role === "Customer" && (
        <nav className="hidden md:flex gap-2">
          <ul className="flex items-center justify-center flex-wrap">
            <li
              className={`md:p-4        hover:border-opacity-100   duration-200 cursor-pointer  md:text-sm text-[10px] ${
                pathname === "/customer/homepage" ? activeLink : inactiveLink
              }`}
            >
              <Link href="/customer/homepage">All Restaurants</Link>
            </li>
            <li
              className={`md:p-4  hover:border-opacity-100   duration-200 cursor-pointer  md:text-sm text-[10px] ${
                pathname === "/customer/orders" ? activeLink : inactiveLink
              }`}
            >
              <Link href="/customer/orders">My Orders</Link>
            </li>
          </ul>
        </nav>
      )}

      <AsideNav show={show} setShow={setShow} />

      {/* <!-- buttons ---> */}
      <div className="hidden md:flex gap-2 items-center">
        {session?.user ? (
          <>
            <button className="bg-blue-500 text-white h-8 w-8 rounded-full font-bold ring-2 ring-white capitalize">
              {session?.user?.name.slice(0, 2)}
            </button>
            <button
              className="  py-2 md:px-3 bg-red-500 hover:bg-black text-sm text-white font-bold  rounded-xl transition duration-200"
              onClick={() => {
                logout();
              }}
            >
              LogOut
            </button>
          </>
        ) : (
          <>
            <Link
              className="  py-2 md:px-5 bg-blue-500 hover:bg-blue-600 text-lg text-white font-bold  rounded-xl transition duration-200"
              href="/usertype/signin"
            >
              Sign In
            </Link>
            <Link
              className=" py-2 md:px-5 bg-blue-500 hover:bg-blue-600 text-lg text-white font-bold rounded-xl transition duration-200"
              href={`/usertype/signup`}
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
