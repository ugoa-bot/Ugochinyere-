"use client";
import { Instagram } from "lucide-react";
import Link from "next/link";
import { RiTwitterXFill } from "react-icons/ri";
import { RxLinkedinLogo } from "react-icons/rx";
import { SiTiktok } from "react-icons/si";

export default function Footer() {
  return (
    <section className="footer-section bg-[#262626] px-4 fade-in-up">
      <div className="container mx-auto py-[58px]">
        <div className="flex flex-col lg:flex-row justify-between gap-y-8">
          {/* Column 1: About */}
          <div className="max-w-[426px]">
            <h4 className="text-[18px] lg:text-[24px] font-semibold text-[#FA7892] mb-4">
              Ugochinyere Amaonyeanaso
            </h4>
            <p className="text-[16px] text-white">
              Project Manager & Business Operations Analyst helping businesses stay
              organized and efficient. Let&apos;s work together!
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="max-w-[128px]">
            <h4 className="text-[18px] lg:text-[24px] font-semibold text-[#FA7892] mb-4">
              Navigation
            </h4>
            <div className="flex flex-col gap-3 text-white">
              <Link href="#">Home</Link>
              <Link href="#service">Services</Link>
              <Link href="#portfolio">Portfolio</Link>
              <Link href="#contact">Contact</Link>
            </div>
          </div>

          {/* Column 3: Socials */}
          <div className="max-w-[210px]">
            <h4 className="text-[18px] lg:text-[24px] font-semibold text-[#FA7892] mb-4">
              Contact
            </h4>
            <div className="flex gap-5">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram size={24} color="white" />
              </a>

              <a
                href="https://x.com/UProjectManager"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <RiTwitterXFill size={24} color="white" />
              </a>

              <a
                href="https://www.linkedin.com/in/ugochinyereamaonyeanaso-digitalprojectmanager/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <RxLinkedinLogo size={24} color="white" />
              </a>

              <a
                href="https://www.tiktok.com/@ugochinyere_amaonyeanaso"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <SiTiktok size={24} color="white" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-600 mt-10 pt-6 text-center text-white text-sm">
          © {new Date().getFullYear()} Ugochinyere Amaonyeanaso. All Rights
          Reserved.
        </div>
      </div>
    </section>
  );
}
