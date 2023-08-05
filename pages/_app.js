import Nav from "@/components/Nav";
import ProtectedRoute from "@/components/ProtectedRoute";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps: { ...pageProps } }) {
  return (
    <SessionProvider>
      <Nav />
      <ToastContainer />
      {/* <ProtectedRoute> */}
      <Component {...pageProps} />
      {/* </ProtectedRoute> */}
    </SessionProvider>
  );
}
