"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import FeatureCard from "./FeatureCard";
import AnimatedText from "./AnimatedText";
import Badge from "./Badge";

// Home page client component
const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      <div className="flex flex-col items-center mb-16">
        <Badge>v1.0.0 Release 🎉</Badge>
        <AnimatedText>Build Better React Apps with Fewings</AnimatedText>
        <p
          className={`text-xl text-gray-400 max-w-3xl text-center mb-10 transition-all duration-500 delay-100 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          Fewings is an efficient and lightweight collection of React utilities
          and components for modern web applications. Enhance your development
          experience and boost productivity with our various packages.
        </p>

        <div className="flex gap-4">
          <Link href="/docs/react">
            <button
              className={`bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none py-3 px-6 rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
              style={{ transitionDelay: "0.2s" }}
              onMouseEnter={(e) => {
                e.currentTarget.classList.add(
                  "transform",
                  "-translate-y-0.5",
                  "shadow-md",
                );
              }}
              onMouseLeave={(e) => {
                e.currentTarget.classList.remove(
                  "transform",
                  "-translate-y-0.5",
                  "shadow-md",
                );
              }}
            >
              Get Started
            </button>
          </Link>
          <Link href="https://github.com/livemehere/fewings">
            <button
              className={`bg-transparent text-gray-200 border border-gray-600 py-3 px-6 rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
              style={{ transitionDelay: "0.3s" }}
              onMouseEnter={(e) => {
                e.currentTarget.classList.add("bg-gray-700/20");
              }}
              onMouseLeave={(e) => {
                e.currentTarget.classList.remove("bg-gray-700/20");
              }}
            >
              GitHub
            </button>
          </Link>
        </div>
      </div>

      <h2
        className={`text-3xl font-semibold text-white text-center mb-12 transition-all duration-500 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
        }`}
        style={{ transitionDelay: "0.4s" }}
      >
        Explore Packages
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          className={`transition-all duration-500 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
          style={{ transitionDelay: "0.5s" }}
        >
          <FeatureCard
            title="@fewings/core"
            description="A collection of useful pure functions for frontend development, including math utilities, path helpers, hashing, and FP utilities."
            icon="🧰"
            link="/docs/core"
            color="#3b82f6"
          />
        </div>

        <div
          className={`transition-all duration-500 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
          style={{ transitionDelay: "0.6s" }}
        >
          <FeatureCard
            title="@fewings/react"
            description="Various React components and hooks with zero external dependencies. Includes Stack, Space, Float, Popover, and more."
            icon="⚛️"
            link="/docs/react"
            color="#8b5cf6"
          />
        </div>

        <div
          className={`transition-all duration-500 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
          style={{ transitionDelay: "0.7s" }}
        >
          <FeatureCard
            title="@fewings/fancy-react"
            description="More fancy React components utilizing @emotion/react and motion for building beautiful UIs."
            icon="✨"
            link="/docs/fancy-react"
            color="#ec4899"
          />
        </div>

        <div
          className={`transition-all duration-500 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
          style={{ transitionDelay: "0.8s" }}
        >
          <FeatureCard
            title="@fewings/react-qs"
            description="Manage URL query parameters as state with React hooks. Use alongside react-router."
            icon="🔗"
            link="/docs/react-qs"
            color="#10b981"
          />
        </div>

        <div
          className={`transition-all duration-500 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
          style={{ transitionDelay: "0.9s" }}
        >
          <FeatureCard
            title="@fewings/svgr"
            description="Type-safe SVGR code generator for converting SVG files into React components."
            icon="🖌️"
            link="/docs/svgr"
            color="#f59e0b"
          />
        </div>
      </div>

      <div
        className={`mt-24 p-12 bg-gray-900 rounded-2xl text-center transition-all duration-500 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
        }`}
        style={{ transitionDelay: "1s" }}
      >
        <h2 className="text-2xl font-semibold text-white mb-4">
          Get Started Now
        </h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Easily install via npm, yarn, or pnpm and start using it right away.
        </p>
        <div className="bg-gray-800 p-4 rounded-lg font-mono text-gray-200 text-left overflow-auto mb-6">
          <code>npm install @fewings/core</code>
        </div>
        <Link href="/docs/core">
          <button
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none py-3 px-6 rounded-lg text-base font-semibold cursor-pointer transition-all duration-200"
            onMouseEnter={(e) => {
              e.currentTarget.classList.add(
                "transform",
                "-translate-y-0.5",
                "shadow-md",
              );
            }}
            onMouseLeave={(e) => {
              e.currentTarget.classList.remove(
                "transform",
                "-translate-y-0.5",
                "shadow-md",
              );
            }}
          >
            View Documentation
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
