"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CommonHeader from "@/components/Common/CommonHeader";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import Stats from "../../components/Stats";

interface NewsArticle {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  date: string;
}

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleCardClick = (id: number) => {
    router.push(`/news/${id}`);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  const categories = [
    "All Categories",
    "Inspection",
    "Force & Torque",
    "Process Control Instrumentation",
    "Electrical & Electronics",
    "Laboratories",
    "Mechanical & Inspection Equipment",
  ];

  // Helper function to generate dynamic dates (past dates)
  const generateDynamicDate = (daysAgo: number) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const newsArticles: NewsArticle[] = [
    {
      id: 1,
      title: "Ensuring Quality with Comprehensive Inspection Services",
      category: "Inspection",
      excerpt:
        "Inspection services are crucial for maintaining safety, quality, and compliance across industries. From vendor checks to factory audits, thorough inspections help identify risks early. Mechanical, electrical, and civil inspections ensure your operations run smoothly. With expert auditors and systematic processes, businesses gain confidence in every aspect of production.",
      image:
        "/news/Ensuring Quality with Comprehensive Inspection Services.png",
      date: generateDynamicDate(5), // 5 days ago
    },
    {
      id: 2,
      title: "Precision Matters: Force Torque Testing Solutions",
      category: "Force Torque",
      excerpt:
        "Force and torque measurement is vital for industrial efficiency and safety. Our services include calibration of torque wrenches, gauges, load cells, and testing machines. Accurate testing ensures equipment reliability and product quality. Expert evaluation and precise calibration support optimal performance in all applications.",
      image:
        "/news/Laboratories Material Testing Ensuring Structural Integrity.png",
      date: generateDynamicDate(10), // 10 days ago
    },
    {
      id: 3,
      title:
        "Advanced Process Control Instrumentation for Industrial Efficiency",
      category: "Process Control Instrumentation",
      excerpt:
        "Process control instrumentation monitors and regulates critical processes accurately. Pressure, temperature, flow, and level transmitters help maintain operational stability. Safety devices, converters, and detectors enhance compliance and efficiency. Our solutions provide reliable, real-time control for diverse industrial systems.",
      image:
        "/news/Advanced Process Control Instrumentation for Industrial Efficiency.png",
      date: generateDynamicDate(15), // 15 days ago
    },
    {
      id: 4,
      title: "Electrical & Electronics Testing for Reliable Operations",
      category: "Electrical & Electronics",
      excerpt:
        "Accurate testing of electrical and electronic systems prevents failures and ensures safety. Digital & analogue multimeters, high-voltage testers, and power supplies are calibrated to meet industry standards. Our services enhance system reliability and operational efficiency. Expert solutions help businesses stay compliant and efficient.",
      image: "/news/Electrical Electronics Testing for Reliable Operations.png",
      date: generateDynamicDate(20), // 20 days ago
    },
    {
      id: 5,
      title: "Laboratories & Material Testing: Ensuring Structural Integrity",
      category: "Laboratories",
      excerpt:
        "Comprehensive laboratory testing is essential for construction and industrial projects. Soil, concrete, asphalt, and chemical testing guarantee quality and safety. Structural integrity assessment, NDT, and field investigations help detect defects and evaluate durability. Our advanced labs deliver accurate, reliable results for informed decisions.",
      image:
        "/news/Laboratories Material Testing Ensuring Structural Integrity.png",
      date: generateDynamicDate(25), // 25 days ago
    },
    {
      id: 6,
      title: "Lifting, Non-Destructive Equipment & Mechanical Solutions",
      category: "Mechanical & Inspection Equipment",
      excerpt:
        " Safe lifting operations and precise mechanical testing are key to industrial efficiency. From crane certification to hardness testers and universal testing machines, our services cover it all. Non-destructive testing ensures structural reliability without damage. Trust our solutions for accurate assessment, operational safety, and compliance.",
      image: "/news/Lifting Non-Destructive Equipment Mechanical Solutions.png",
      date: generateDynamicDate(30), // 30 days ago
    },
  ];

  const filteredArticles = newsArticles.filter((article) => {
    const matchesCategory =
      selectedCategory === "All Categories" ||
      article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      <CommonHeader
        title="Blogs"
        breadcrumb="Blogs"
        imagePath="/about-us/about-us-1.png"
      />

      <div className="w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold theme-text-main mb-4">
              Explore Our Blogs
            </h2>
            <p className="text-lg text-gray-900/80 max-w-4xl mx-auto">
              Insights, tips, and stories from the world of engineering — stay
              updated with the latest trends, innovative solutions, and expert
              advice from Majoka Engineering.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Sidebar */}
            <aside className="w-full lg:w-96 flex flex-col gap-6">
              {/* Search Box */}
              <div
                className="bg-[#01a9a0]/10 rounded-2xl p-5 sm:p-7"
                data-aos="fade-right"
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-white rounded-[50px] outline outline-1 outline-offset-[-1px] outline-black/60 text-base focus:outline-2 focus:outline-pink-950 transition-all text-gray-800"
                  />
                  <svg
                    className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-black/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="11" cy="11" r="8" strokeWidth="2" />
                    <path d="m21 21-4.35-4.35" strokeWidth="2" />
                  </svg>
                  <svg
                    className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-black/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="11" cy="11" r="8" strokeWidth="2" />
                    <path
                      d="m21 21-4.35-4.35"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Blog Categories */}
              <div
                className="bg-[#01a9a0]/10 rounded-2xl p-5 sm:p-7"
                data-aos="fade-right"
                data-aos-delay="100"
              >
                <h3 className="text-stone-900 text-xl font-bold mb-4">
                  Blog categories
                </h3>
                <div className="flex flex-col gap-0">
                  {categories.map((category, index) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left pl-3.5 py-3 transition-all duration-300 ${
                        selectedCategory === category
                          ? "bg-[#01a9a0]/30 rounded-md text-[#01a9a0] font-black"
                          : "text-stone-900/60  font-medium border-b border-white hover:bg-white/50"
                      }`}
                      data-aos="fade-up"
                      data-aos-delay={index * 50}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Card */}
              <div
                className="bg-white rounded-3xl shadow-[2px_4px_10px_0px_rgba(0,0,0,0.10)] outline outline-1 outline-offset-[-1px] outline-sky-400/30 p-6"
                data-aos="fade-right"
                data-aos-delay="200"
              >
                <div className="flex flex-col items-center gap-6">
                  <div className="p-3 theme-bg-main rounded-2xl">
                    <svg
                      className="w-9 h-9 text-indigo-50"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <p className="text-black text-base font-bold text-center">
                    We are always available to discuss with you
                  </p>
                  <a
                    href="mailto:info@majokaengineering.com"
                    className="text-black text-lg font-medium hover:text-sky-500 transition-colors duration-300 break-all text-center"
                  >
                    info@majokaengineering.com
                  </a>
                  <button
                    className="px-4 py-2 theme-bg-main rounded-[50px] hover:bg-pink-900 transition-all duration-300 flex items-center gap-2 shadow-lg cursor-pointer"
                    onClick={() => router.push("/contact")}
                  >
                    <span className="text-indigo-50 text-base font-bold">
                      Contact Us
                    </span>
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </aside>

            {/* News Grid */}
            <main className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
                {filteredArticles.map((article, index) => (
                  <article
                    key={article.id}
                    className="bg-white rounded-3xl outline outline-1 outline-offset-[-1px] outline-stone-200 p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                    // onClick={() => handleCardClick(article.id)}
                  >
                    <div className="relative h-60 rounded-xl overflow-hidden mb-6">
                      <Image
                        height={700}
                        width={700}
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-col gap-2">
                        <span className="inline-flex items-center w-fit px-3 py-2 theme-bg-main rounded-lg text-white text-sm font-medium">
                          {article.category}
                        </span>
                        <div className="flex flex-col gap-4">
                          <h3 className="text-stone-900 text-2xl font-bold leading-7 group-hover:text-[#01a9a0] transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-stone-500 text-base leading-relaxed">
                            {article.excerpt}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <button
                          className="flex items-center gap-2 group/btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            // handleCardClick(article.id);
                          }}
                        >
                          {/* <span className="text-stone-900 text-lg font-medium underline group-hover/btn:text-pink-950 transition-colors">
                            Continue to Reading
                          </span>
                          <svg
                            className="w-6 h-6 text-stone-900 group-hover/btn:text-pink-950 group-hover/btn:translate-x-1 transition-all"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg> */}
                        </button>
                        <time className="text-stone-500 text-base">
                          {article.date}
                        </time>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* No Results Message */}
              {filteredArticles.length === 0 && (
                <div className="text-center py-12" data-aos="fade-up">
                  <p className="text-stone-500 text-xl">
                    No articles found. Try adjusting your search or filter.
                  </p>
                </div>
              )}
            </main>
          </div>

          {/* CTA Section */}
          <section className="mt-16 lg:mt-24" data-aos="fade-up">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                {/* Image Gallery */}
                <div
                  className="w-full lg:w-1/2 relative h-96"
                  data-aos="fade-right"
                  data-aos-delay="100"
                >
                  <div className="relative w-full h-full">
                    {/* Top Left Image */}
                    <div
                      className="absolute top-12 left-12 w-full h-full rounded-lg overflow-hidden"
                      data-aos="zoom-in"
                      data-aos-delay="200"
                    >
                      <Image
                        width={500}
                        height={500}
                        src="/news/1.png"
                        alt="Gallery"
                        className="w-44 h-auto object-cover px-6"
                      />
                    </div>

                    {/* Center Card with Stats */}
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-48 theme-bg-main rounded-tr-[90px] shadow-xl flex items-center justify- ml-6 pl-6"
                      data-aos="flip-left"
                      data-aos-delay="300"
                    >
                      <div className="text-center">
                        <p className="text-indigo-50 text-base font-semibold mb-2">
                          Tech Stack
                        </p>
                        <p className="text-white text-4xl font-semibold">
                          50<span className="text-3xl">+</span>
                        </p>
                      </div>
                    </div>

                    {/* Bottom Left Image */}
                    <div
                      className="absolute bottom-0 left-0 w-56 h-52 rounded-tr-[100px] overflow-hidden shadow-lg"
                      data-aos="zoom-in"
                      data-aos-delay="400"
                    >
                      <Image
                        width={700}
                        height={700}
                        src="/news/3.png"
                        alt="Gallery"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Right Tall Image */}
                    <div
                      className="absolute top-20 right-0 w-auto h-64 rounded-lg overflow-hidden"
                      data-aos="zoom-in"
                      data-aos-delay="500"
                    >
                      <Image
                        height={500}
                        width={500}
                        src="/news/2.png"
                        alt="Gallery"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Bottom Right Image */}
                    <div
                      className="absolute bottom-0 right-[30%] w-auto h-36 rounded-lg overflow-hidden"
                      data-aos="zoom-in"
                      data-aos-delay="600"
                    >
                      <Image
                        height={500}
                        width={500}
                        src="/news/4.png"
                        alt="Gallery"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div
                  className="w-full lg:w-1/2 flex flex-col gap-6"
                  data-aos="fade-left"
                  data-aos-delay="100"
                >
                  <h2 className="text-stone-900 text-3xl sm:text-4xl font-bold leading-tight">
                    Boost Your Construction Project Efficiency with Our
                    Solutions
                  </h2>
                  <p className="text-black/60 text-base leading-normal">
                    With our innovative solutions and dedicated expertise,
                    success is a guaranteed outcome. Lets accelerate together
                    towards your goals and beyond.
                  </p>
                  <div>
                    <button
                      className="px-6 py-3 theme-bg-main rounded-[50px] outline outline-1 outline-offset-[-1px] outline-[#01a9a0] hover:bg-[#01a9a0] transition-all duration-300 flex items-center gap-2 group cursor-pointer"
                      onClick={() => router.push("/project")}
                    >
                      <span className="text-white text-xl font-bold">
                        Let&apos;s Build Your Project
                      </span>
                      <svg
                        className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Stats />
    </div>
  );
};

export default News;
