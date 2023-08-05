import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"} className="flex justify-center">
      <img src="/logo.png" className="w-[10rem]" />
      {/* <Image src="/logo.png" width={100} height={100} alt="logo" /> */}
    </Link>
  );
}
