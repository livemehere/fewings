'use client';

// Badge component
const Badge = ({ children }: { children: string }) => (
  <span className="bg-gradient-to-r from-blue-500 to-purple-500 px-3 py-1.5 rounded-full text-sm font-semibold text-white inline-block mb-6">
    {children}
  </span>
);

export default Badge;
