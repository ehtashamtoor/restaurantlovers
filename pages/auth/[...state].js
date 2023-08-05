import { useRouter } from "next/router";
import React from "react";
import SignupPage from "../signup";
import LoginPage from "../signin";

const Page = () => {
  const router = useRouter();
  const { state } = router.query;
  // console.log(state);

  if (Array.isArray(state) && state[0] === "signup") {
    const user = state[1];
    const type = state[0];
    return <SignupPage user={user} type={type} />;
  }

  if (Array.isArray(state) && state[0] === "signin") {
    const user = state[1];
    const type = state[0];
    return <LoginPage user={user} type={type} />;
  }
};

export default Page;
