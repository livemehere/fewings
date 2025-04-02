"use client";

import { useState } from "react";
import Link from "next/link";

// Feature card component with animation effects
const FeatureCard = ({
  title,
  description,
  icon,
  link,
  color,
}: {
  title: string;
  description: string;
  icon: string;
  link: string;
  color: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={link} className="no-underline">
      <div
        className={`bg-gray-800 rounded-xl p-8 h-full border border-gray-700 transition-all duration-200 cursor-pointer relative overflow-hidden ${
          isHovered ? "transform -translate-y-1 shadow-lg" : ""
        }`}
        style={{ borderColor: isHovered ? color : "" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="absolute -top-5 -right-5 w-20 h-20 rounded-full opacity-10"
          style={{ background: color }}
        />
        <div className="text-4xl mb-4" style={{ color }}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
        <p className="text-gray-400 text-base leading-relaxed">{description}</p>
      </div>
    </Link>
  );
};

export default FeatureCard;
