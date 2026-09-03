"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RelatedArticle {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  date: string;
}

interface RelatedProps {
  currentArticleId: number;
  articles?: RelatedArticle[];
}

const Related: React.FC<RelatedProps> = ({ currentArticleId, articles }) => {
  const router = useRouter();

  // Mock data - replace with API call later
  const mockRelatedArticles: RelatedArticle[] = [
    {
      id: 1,
      title: "Development Firms Shaping the Future of Architecture",
      category: "Architectural",
      excerpt:
        "The U.S. fintech sector alone generated over $39 billion in revenue in 2023, which is expected to grow to $70.5...",
      image: "/news/news-1.png",
      date: "Mar 12,2023",
    },
    {
      id: 2,
      title: "The Best Architectural Design Reveals",
      category: "Architectural",
      excerpt:
        "The U.S. fintech sector alone generated over $39 billion in revenue in 2023, which is expected to grow to $70.5...",
      image: "/news/news-2.png",
      date: "Mar 12,2023",
    },
    {
      id: 3,
      title: "Leading Innovations in Civil Engineering.",
      category: "Civil Engineering",
      excerpt:
        "The U.S. fintech sector alone generated over $39 billion in revenue in 2023, which is expected to grow to $70.5...",
      image: "/news/news-3.png",
      date: "Mar 12,2023",
    },
  ];

  const relatedArticles = articles || mockRelatedArticles;

  // Filter out current article and limit to 3 articles
  const filteredArticles = relatedArticles
    .filter((article) => article.id !== currentArticleId)
    .slice(0, 3);

  const handleArticleClick = (id: number) => {
    router.push(`/news/${id}`);
  };

  if (filteredArticles.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Related Articles
          </h2>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => handleArticleClick(article.id)}
            >
              {/* Article Image */}
              <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Category Badge */}
              <div className="mb-3">
                <span className="inline-flex items-center px-3 py-1 bg-red-900 rounded-lg text-white text-sm font-medium">
                  {article.category}
                </span>
              </div>

              {/* Article Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-red-900 transition-colors">
                {article.title}
              </h3>

              {/* Article Excerpt */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {article.excerpt}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                {/* Continue Reading Button */}
                <button
                  className="flex items-center gap-2 group/btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleArticleClick(article.id);
                  }}
                >
                  <span className="text-gray-900 text-sm font-medium underline group-hover/btn:text-red-900 transition-colors">
                    Continue to Reading
                  </span>
                  <svg
                    className="w-4 h-4 text-gray-900 group-hover/btn:text-red-900 group-hover/btn:translate-x-1 transition-all"
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
                  </svg>
                </button>

                {/* Date */}
                <time className="text-gray-500 text-sm">{article.date}</time>
              </div>
            </div>
          ))}
        </div>

        <div>
          <section className="mt-16 lg:mt-24" data-aos="fade-up">
            <div className="bg-gray-200 rounded-3xl p-8 lg:p-12 shadow-lg border border-gray-300">
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
                      className="absolute top-12 left-12 w-32 h-24 rounded-lg overflow-hidden shadow-lg"
                      data-aos="zoom-in"
                      data-aos-delay="200"
                    >
                      <Image
                        src="/news/news-1.png"
                        alt="Gallery"
                        fill
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Center Card with Stats */}
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-48 bg-pink-950 rounded-tr-[90px] shadow-xl flex items-center justify-center"
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
                        src="/news/news-2.png"
                        alt="Gallery"
                        fill
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Right Tall Image */}
                    <div
                      className="absolute top-20 right-0 w-48 h-64 rounded-lg overflow-hidden shadow-lg"
                      data-aos="zoom-in"
                      data-aos-delay="500"
                    >
                      <Image
                        src="/news/news-3.png"
                        alt="Gallery"
                        fill
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Bottom Right Image */}
                    <div
                      className="absolute bottom-0 right-40 w-32 h-32 rounded-lg overflow-hidden shadow-lg"
                      data-aos="zoom-in"
                      data-aos-delay="600"
                    >
                      <Image
                        src="/news/news-4.png"
                        alt="Gallery"
                        fill
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
                    <button className="px-6 py-3 bg-pink-950 rounded-[50px] outline outline-1 outline-offset-[-1px] outline-pink-950 hover:bg-pink-900 transition-all duration-300 flex items-center gap-2 group">
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
    </div>
  );
};

export default Related;
