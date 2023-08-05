import HomeCarousel from "@/components/HomeCarousel";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  // const { data: session } = useSession();
  const router = useRouter();
  const [restaurants, setRestaurants] = useState([]);

  const getAllRestaurants = async () => {
    let resp = await axios.get("/api/allrestaurants");
    console.log(resp.data.allrestaurants);
    if (resp.data.success) {
      setRestaurants(resp.data.allrestaurants);
    }
  };

  useEffect(() => {
    getAllRestaurants();
  }, []);

  return (
    <div className="text-blue-900 flex justify-between w-screen">
      <HomeCarousel restaurants={restaurants} />
    </div>
  );
}
