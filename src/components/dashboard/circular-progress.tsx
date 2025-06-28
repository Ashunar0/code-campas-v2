import React from "react";

interface CircularProgressProps {
  percentage: number;
  size: number;
  strokeWidth?: number;
  className?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  size,
  strokeWidth = 8,
  className = "",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  // sizeに基づいて文字サイズを動的に計算
  const getTextSize = (size: number) => {
    if (size <= 60) return "text-sm";
    if (size <= 80) return "text-base";
    if (size <= 100) return "text-lg";
    if (size <= 120) return "text-xl";
    if (size <= 150) return "text-2xl";
    if (size <= 200) return "text-3xl";
    return "text-4xl";
  };

  const textSizeClass = getTextSize(size);

  return (
    <div className={`relative ${className}`}>
      <svg
        className="circle-progress"
        width={size}
        height={size}
        style={{ transform: "rotate(-90deg)" }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-gray-200"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-primary"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`${textSizeClass} font-bold text-gray-900`}>
          {percentage}%
        </span>
      </div>
    </div>
  );
};
