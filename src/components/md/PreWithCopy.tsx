"use client";

import { useRef, useState } from "react";
import { FaCheck, FaCopy } from "react-icons/fa";

type PreProps = React.HTMLAttributes<HTMLPreElement> & {
  children?: React.ReactNode;
};

export default function PreWithCopy(props: PreProps) {
  const preRef = useRef<HTMLPreElement | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = preRef.current?.innerText ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // noop
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-2 top-2 z-10 rounded bg-gray-800/80 px-2 py-1 text-xs text-white hover:bg-gray-700"
        aria-label="Copy code"
      >
        {copied ? (
          <FaCheck size={12} className="text-green-200 cursor-pointer" />
        ) : (
          <FaCopy size={12} className="text-neutral-400 cursor-pointer" />
        )}
      </button>
      <pre ref={preRef} {...props} style={{ fontSize: "0.9rem" }} />
    </div>
  );
}
