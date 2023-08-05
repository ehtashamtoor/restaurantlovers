import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";

const CustomerProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();
  // console.log(session?.user);

  useEffect(() => {
    // console.log(status);
    if (session?.user?.role === undefined && status === "unauthenticated") {
      router.push("/usertype/signin");
    }
    // console.log(session?.user?.role);
    //                                     for RESTAURANT, ACCESSING CUSTOMER ROUTES
    if (
      session?.user?.role === "restaurant" &&
      router.pathname.includes("/customer/")
    ) {
      // console.log("restaurant mein");
      router.push("/restaurant/dashboard");
      setIsLoading(false);
      return;
    }

    // for customer routes
    if (
      session?.user?.role === "Customer" &&
      router.pathname.includes("/customer/")
    ) {
      // console.log(session?.user);
      // console.log("customer customer");
      setIsLoading(false);
      return;
    }
  }, [session]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <BeatLoader />
      </div>
    );
  }

  return <div>{children}</div>;
};

export default CustomerProtectedRoute;
