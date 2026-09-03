import React from "react";
import Image from "next/image";
import Related from "./Related";

interface NewsArticleData {
  id: number;
  title: string;
  category: string;
  content: string;
  image: string;
  lastUpdate: string;
}

interface EachNewsProps {
  article: NewsArticleData;
}

const EachNews: React.FC<EachNewsProps> = ({ article }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-8">
          {/* Category Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-red-900 rounded-full text-white text-sm font-semibold mb-4">
            {article.category}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {article.title}
          </h1>

          {/* Last Update */}
          <p className="text-gray-600 text-base">
            Last Update : {article.lastUpdate}
          </p>
        </div>

        {/* Featured Image */}
        <div className="relative w-full h-64 md:h-80 lg:h-[700px] rounded-2xl overflow-hidden mb-12 shadow-lg">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover w-full h-full"
            priority
          />
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed space-y-6">
                {article.content.split("\n\n").map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-base md:text-lg leading-7 md:leading-8"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Get updated with latest development news and events
              </h3>

              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                Looking for top-tier IT staff augmentation services? Rapid has
                you covered. We offer comprehensive solutions...
              </p>

              {/* Email Subscription Form */}
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent transition-all"
                  />
                </div>

                <button className="w-full bg-red-900 hover:bg-red-800 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300 cursor-pointer">
                  Get started
                </button>

                <p className="text-xs text-gray-500 text-center">
                  We care about your data in our{" "}
                  <a href="#" className="text-red-900 hover:underline">
                    privacy policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Articles Section */}
      <Related currentArticleId={article.id} />
    </div>
  );
};

export default EachNews;
