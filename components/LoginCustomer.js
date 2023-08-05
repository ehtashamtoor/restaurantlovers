import { LoginSchemaCustomer } from "@/Schema";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Logo from "./Logo";

const LoginCustomer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchemaCustomer),
  });
  const router = useRouter();
  const [ErrorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    const { email, password } = data;
    // console.log(data);
    try {
      // Use the signIn function to authenticate the user
      const result = await signIn("customer", {
        email: email,
        password: password,
        redirect: false,
      });
      if (result?.error !== null) {
        // setErrorMessage(result.error);
        toast.error("Error signing in, Try again");
      }

      if (result?.status === 200) {
        // console.log(result);
        router.push("/customer/homepage");
        toast.success("Login success");
      }
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };
  return (
    <section>
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-4">
          <div className="hidden lg:absolute top-[10rem] lg:block md:p-12">
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Enter Credentials to Login
            </h2>
          </div>
        </section>

        <main
          aria-label="Main"
          className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 xl:col-span-8"
        >
          <div className="md:w-full w-fit">
            <div className="block md:hidden text-center">
              <h1 className="mt-2 text-2xl font-bold sm:text-3xl md:text-4xl">
                Best Restaurants Around the world
              </h1>
            </div>

            <div className="text-center mb-5 hidden md:block">
              <Logo />
            </div>
            <h1 className="text-center md:flex justify-center flex-col text-3xl text-blue-600 font-bold hidden">
              Best Restaurants Around the world
            </h1>
            <h1 className="text-red-500 text-2xl">{ErrorMessage}</h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 grid grid-cols-6 gap-6"
            >
              <div className="col-span-12 h-[4.5rem]">
                <label htmlFor="email" className="block text-sm font-semibold ">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  name="email"
                  className="mt-1 w-full rounded-md block border-gray-200 bg-white text-lg text-gray-700 shadow-md p-1"
                />
                {errors.email && (
                  <span className="text-red-600 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="col-span-12 h-[4rem]">
                <label
                  htmlFor="Password"
                  className="block text-sm font-semibold "
                >
                  Password
                </label>
                <input
                  type="password"
                  {...register("password")}
                  id="Password"
                  name="password"
                  className="mt-1 w-full block rounded-md border-gray-200 bg-white text-lg text-gray-700 shadow-md p-1"
                />
                {errors.password && (
                  <span className="text-red-600 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div className="col-span-12 mt-2  flex flex-col md:flex-row sm:flex sm:items-center sm:gap-4 gap-2">
                <button
                  type="submit"
                  className="inline-block shrink-0 rounded-md w-full md:w-auto border border-blue-600 bg-blue-600 px-12 py-3 text-md font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  Login
                </button>
                <p className="mt-4 text-[12px] text-gray-500 sm:mt-0">
                  Don&rsquo;t have an account?{" "}
                  <Link
                    href="/auth/signup/customer"
                    className="text-orange-600 underline cursor-pointer"
                  >
                    SignUp
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default LoginCustomer;
