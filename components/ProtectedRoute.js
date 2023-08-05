import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";

const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();
  // console.log(session?.user);

  useEffect(() => {
    if (session?.user?.role === undefined && status === "unauthenticated") {
      router.push("/usertype/signin");
    }
    // console.log(session?.user?.role);
    //                                       for CUSTOMER, ACCESSING RESTAURANT ROUTES
    if (
      session?.user?.role === "Customer" &&
      router.pathname.includes("/restaurant/")
    ) {
      // console.log("customer mein");
      router.push("/customer/homepage");
      setIsLoading(false);
      return;
    }

    // for restaurant routes
    if (
      session?.user?.role === "restaurant" &&
      router.pathname.includes("/restaurant/")
    ) {
      // console.log(session?.user);
      // console.log("res res");
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

export default ProtectedRoute;
