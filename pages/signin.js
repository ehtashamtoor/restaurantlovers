import { useState } from "react";
// import { signIn } from "next-auth/client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from "@/Schema";
import Link from "next/link";
import LoginCustomer from "@/components/LoginCustomer";
import LoginRestaurant from "@/components/LoginRestaurant";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

export default function LoginPage({ user, type }) {
  const router = useRouter();

  if (user === "restaurant") {
    // await signIn("Restaurant Login");
    return <LoginRestaurant />;
  }
  if (user === "customer") {
    return <LoginCustomer />;
  }
}
