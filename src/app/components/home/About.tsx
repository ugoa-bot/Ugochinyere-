"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../ui/Button";
import { MdOutlineArrowOutward } from "react-icons/md";
import Pagination from "../ui/Pagination";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

const images = ["/images/About.png", "/images/About1.jpg"];

export default function About() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-in-out",
      once: true,
      offset: 50,
    });
  }, []);

  return (
    <section id="about" className="bg-cover bg-black">
      <div className="container mx-auto py-[50px]">
        <div
          className="w-[179px] h-[52px] mx-auto"
          data-aos="fade"
          data-aos-delay="100"
        >
          <Image
            src="/images/Aboutme.svg"
            alt="about me image"
            width={500}
            height={500}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex flex-col md:flex-col lg:flex-row items-center justify-center gap-x-[72px] mt-10 px-4">
          {/* Box One */}
          <div
            className="w-full max-w-full  mb-[16px]"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="w-full h-full space-y-[24px]">
              <p className="text-[16px] md:text-[16px] lg:text-[18px] font-normal leading-[130%] text-white">
                I&apos;m{" "}
                <span className="text-[#FA7892]">Ugochinyere Amaonyeanaso</span>{" "},
                You built something worth running well. I make sure it runs that way
                on time, on budget, and without you having to do everything yourself.
              </p>
              <p className="text-[16px] md:text-[16px] lg:text-[18px] font-normal leading-[130%] text-white">
                 Your projects keep running over deadline. Your business is stagnant without structure.
                Your team is busy but there is no thing to show for it.
                You're making big decisions without a
                clear framework. Your website is live but not bringing in clients. And
                you're the smartest person in your business, and still the most overworked one.
                You don't have a talent problem. You have an execution gap. That's exactly what I close.
              </p>
              <p className="text-[16px] md:text-[16px] lg:text-[18px] font-normal leading-[130%] text-white">
                I come in, understand the full picture, identify where you are losing time and money,
                and build the systems that make your business run better than it did before I arrived.
              </p>
              <div>
                <Link href="#contact">
                  <Button
                    type="button"
                    icon={<MdOutlineArrowOutward />}
                    style="pink"
                    css="w-[150px] lg:w-[182px] h-[45px] lg:h-[56px] rounded-[31px]"
                  >
                    Hire here
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Box Two */}
          <div
            className="w-full  max-w-full h-[216px] md:h-[350px] lg:h-[400px]"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <Image
              src={images[currentIndex]}
              width={500}
              height={500}
              alt="Picture of Ugochinyere"
              className="rounded-[10px] w-full h-full object-cover transition-all duration-500 object-top-right"
            />
            <Pagination
              activeIndex={currentIndex}
              setActiveIndex={setCurrentIndex}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
