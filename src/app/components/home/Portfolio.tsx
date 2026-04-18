"use client";
import { useEffect, useState } from "react";
import { client } from "../../../sanity/lib/client";
import { portfolioQuery } from "../../lib/queries";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../../../sanity/lib/sanityImage";
import { SkeletonLoader } from "../ui/SkeletonLoader";

interface Project {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage?: {
    asset?: {
      url?: string;
    };
  };
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    AOS.init({ duration: 700, easing: "ease-in-out", once: true, offset: 50 });

    async function fetchData() {
      try {
        const data: Project[] = await client.fetch(portfolioQuery);
        setProjects(data);
        console.log(data);
      } catch (err) {
        console.error("Error fetching portfolio:", err);
        setError("Failed to load portfolio. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <section id="portfolio" className="py-[30px]">
      <div className="container mx-auto px-4">
        <h1
          className="text-[28px] md:text-[38px] font-medium text-center thai-text mb-[40px]"
          data-aos="fade"
          data-aos-delay={100}
        >
          My Portfolio
        </h1>

        {error && <p className="text-center text-red-500 mb-6">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <SkeletonLoader key={i} delay={150 + i * 100} />
              ))
            : projects.map((project, index) => (
                <Link
                  key={project._id}
                  href={`/project/${project?.slug?.current ?? "#"}`}
                >
                  <div
                    className="relative cursor-pointer group w-full h-[400px] rounded-[10px] overflow-hidden"
                    data-aos="fade-up"
                    data-aos-delay={150 + index * 100}
                  >
                    <Image
                      src={
                        project.mainImage
                          ? urlFor(project.mainImage).url()
                          : "/images/placeholder.png"
                      }
                      fill
                      className="object-cover"
                      alt={project.title}
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <h1 className="text-white text-2xl font-bold text-center">
                        {project.title}
                      </h1>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
}
