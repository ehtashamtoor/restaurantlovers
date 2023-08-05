import { Carousel } from "flowbite-react";
import style from "./HomeCarousel.module.css";

const HomeCarousel = ({ restaurants }) => {
  return (
    <Carousel className={`w-screen h-[87vh] ${style.customCarousel}`}>
      {restaurants.slice(0, 4).map((item, index) => {
        return (
          <div
            key={index}
            className="flex items-center justify-center relative bg-no-repeat bg-cover  bg-center"
            style={{
              backgroundImage: `url(${item.image?.url || "/restaurant.jpg"})`,
              height: "87vh",
            }}
          >
            <div className="absolute inset-0 bg-black opacity-40 z-[19]"></div>
            <div className="absolute top-16 left-0 z-20 pl-4 md:pl-20">
              <h1 className="text-white capitalize font-bold text-md md:text-4xl">
                {item.name}
              </h1>
              <p className="text-white text-md md:text-xl lg:w-6/12 md:mr-72 text-left">
                Our menu boasts a diverse selection of dishes, ranging from
                spicy delights to mild, comforting favorites.The restaurant's
                interior is an enchanting blend of rustic charm and mystical
                allure. Glistening fairy lights hang from the ceiling, casting a
                soft, ethereal glow over the quaint wooden tables adorned with
                delicate floral arrangements.
              </p>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default HomeCarousel;
