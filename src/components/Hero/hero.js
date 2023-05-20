import React from "react";

import heroImg from "../../assets/heroImg.jpg";
import "./hero.css";

const Hero = () => {
  const scrollingText = [
    "Fashion Collection",
    "Beauty Collection",
    "Jewelry Collection",
  ];

  return (
    <section className="text-gray-600 body-font mt-20">
      <div className="container mx-auto flex px-5 py-24 md:flex-row md:justify-center flex-col items-center">
        <div className="md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium">
            Unleash Your Style with our
            <br className="hidden lg:inline-block" />
            <p className="scrolling-text mt-1 mb-5">
              <u>Fashion Collection</u>
            </p>
          </h1>
          <p className="mb-10 leading-relaxed hero-text">
            Step into the world of fashion with our exclusive range of clothing
            and accessories. From trendy outfits for all occasions to stylish
            footwear and statement accessories, we offer a diverse selection
            that caters to every taste and budget. Stay ahead of the fashion
            curve and express your unique style with StyLash.
          </p>
          <div className="flex justify-center">
            <button className="inline-flex text-white border-0 py-2 px-6 focus:outline-none rounded text-lg showproduct-btn">
              Show All Products
            </button>
            <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
              Contact Us
            </button>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src={heroImg}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
