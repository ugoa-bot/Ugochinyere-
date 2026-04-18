"use client";
import { Star } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  text: string;
  image: string;
  Name: string;
  position: string;
}

export default function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <div className="max-w-full w-[711px] mx-auto  rounded-[5px] !bg-[#3B3B3B] text-white relative overflow-hidden">
      <div className="absolute -bottom-2 right-20 text-[40px] text-white">
        <div className="w-[58px] h-[135px]">
          <Image
            src="/images/quote.png"
            width={500}
            height={500}
            alt="quote"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="p-[26px] flex flex-col justify-between h-full">
        <div className="flex items-center gap-[2px] text-[#FA7892]">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current" />
          ))}
        </div>
        <p className="text-[16px] leading-[1.6] mb-[20px]">
          {testimonial.text}
        </p>

        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-3">
            <div className="w-[40px] h-[40px] bg-white rounded-full">
              <Image
                src={testimonial.image}
                alt={testimonial.Name}
                className="w-[40px] h-[40px] rounded-full object-cover"
                width={500}
                height={500}
              />
            </div>
            <div>
              <span className="text-[14px] font-medium">
                {testimonial.Name}
              </span>
              <p className="text-[11px] font-normal">{testimonial.position}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
