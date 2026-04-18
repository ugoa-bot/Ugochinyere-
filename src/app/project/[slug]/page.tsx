// "use client";

import Back from "@/app/components/ui/Back";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/sanityImage";

import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/types";

interface Project {
  _id: string;
  title: string;
  slug?: { current?: string };
  mainImage?: { asset?: { url?: string } };
  description?: string;
  body?: PortableTextBlock[];
  content?: PortableTextBlock[];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

// ✅ Safe static params (no crash on null slug)
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const projects: Project[] = await client.fetch(
    `*[_type == "project"]{ slug }`
  );

  return projects
    .filter((p) => p?.slug?.current)
    .map((p) => ({ slug: p.slug!.current! }));
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;

  const project: Project = await client.fetch(
    `*[_type == "project" && slug.current == $slug][0]{
      _id,
      title,
      mainImage,
      description,
      body,
      content
    }`,
    { slug }
  );

  // fallback (prevents crash if project not found)
  if (!project) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-lg font-medium">Project not found</p>
      </div>
    );
  }

  const imageUrl =
    project?.mainImage?.asset
      ? urlFor(project.mainImage).url()
      : "";

  return (
    <div className="w-full min-h-screen bg-white">
      <Header />

      {/* HERO SECTION */}
      <div className="relative">
        <Back />

        <div
          className="h-[60vh] flex flex-col items-center justify-center text-center px-4"
          style={{
            background: `linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0.65), rgba(0,0,0,0.9)), url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-4xl">
            {project.title}
          </h1>

          {project.description && (
            <p className="text-white/90 mt-4 text-lg sm:text-xl max-w-2xl leading-relaxed font-medium">
              {project.description}
            </p>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-4 sm:px-8 py-12 max-w-4xl mx-auto">
        <PortableText
          value={Array.isArray(project.content) ? project.content : []}
          components={{
            block: {
              h2: ({ children }) => (
                <h2 className="text-3xl sm:text-4xl font-extrabold mt-12 mb-4 text-gray-900 leading-tight">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl sm:text-2xl font-semibold mt-8 mb-3 text-gray-800">
                  {children}
                </h3>
              ),
              normal: ({ children }) => (
                <p className="mt-4 text-[17px] leading-8 text-gray-700">
                  {children}
                </p>
              ),
            },

            list: {
              bullet: ({ children }) => (
                <ul className="list-disc ml-6 mt-4 space-y-2 text-[17px] leading-7">
                  {children}
                </ul>
              ),
            },

            listItem: {
              bullet: ({ children }) => (
                <li className="pl-1">{children}</li>
              ),
            },
          }}
        />
      </div>

      <Footer />
    </div>
  );
}