import { LoginSchemaRes } from "@/Schema";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Logo from "./Logo";

const LoginRestaurant = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchemaRes),
  });
  const router = useRouter();

  const onSubmit = async (data) => {
    const { username, password } = data;
    // console.log(data);
    try {
      // Use the signIn function to authenticate the user
      const result = await signIn("restaurant", {
        username: username,
        password: password,
        redirect: false,
      });
      // console.log(result);
      if (result?.error !== null) {
        // console.log(result.error);
        toast.error("error signing in, try again");
      }

      if (result?.status === 200) {
        // console.log(result);
        router.push("/restaurant/dashboard");
        toast.success("Login Success");
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
                Enter Credentials to Login..
              </h1>
            </div>

            <div className="text-center mb-5 hidden md:block">
              <Logo />
            </div>
            <h1 className="text-center text-3xl  font-bold hidden md:block">
              Restaurant Login
            </h1>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 grid grid-cols-6 gap-6"
            >
              <div className="col-span-12 h-[4.5rem]">
                <label
                  htmlFor="username"
                  className="block text-sm font-semibold "
                >
                  Username
                </label>
                <input
                  type="username"
                  id="username"
                  {...register("username")}
                  name="username"
                  className="mt-1 w-full rounded-md block border-gray-200 bg-white text-lg text-gray-700 shadow-md p-1"
                />
                {errors.username && (
                  <span className="text-red-600 text-sm">
                    {errors.username.message}
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
                    href="/auth/signup/restaurant"
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

export default LoginRestaurant;
