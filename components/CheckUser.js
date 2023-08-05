import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

const CheckUser = () => {
  const router = useRouter();
  const { state } = router.query;

  return (
    <div
      className={` h-[88.2vh] flex items-center justify-center bg-no-repeat bg-cover bg-center relative`}
      style={{
        backgroundImage: "url(/typeuserBG.jpg)",
        height: "88.2vh",
        width: "100%",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="flex flex-col gap-2 justify-center z-10">
        <h1 className="md:text-3xl text-md text-white font-bold text-center">
          {state?.toUpperCase()} for a customer or a Restaurant?{" "}
        </h1>
        <div className="flex gap-2  justify-center">
          <Link
            href={`/auth/${state}/customer`}
            className=" py-2 md:px-8 px-4  text-white hover:bg-blue-500 border-2 border-orange-500 hover:border-transparent text-md md:text-xl font-bold rounded-md transition duration-200"
          >
            Customer
          </Link>
          <Link
            href={`/auth/${state}/restaurant`}
            className=" py-2 md:px-8 px-4  text-white hover:bg-blue-500 border-2 border-orange-500 hover:border-transparent text-md md:text-xl font-bold rounded-md transition duration-200"
          >
            Restaurant
          </Link>
          {/* <button
            onClick={signIn}
            className="lg:ml-auto lg:mr-3 py-2 px-6 bg-blue-700 text-white hover:bg-blue-900 text-sm font-bold  rounded-xl transition duration-200"
          >
            Restaurant
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default CheckUser;
