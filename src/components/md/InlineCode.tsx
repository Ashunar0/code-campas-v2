import React from "react";

type CodeProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
};

export default function InlineCode({
  className,
  children,
  ...rest
}: CodeProps) {
  // code block の <code class="language-*"></code> には干渉しない
  if (typeof className === "string" && className.includes("language-")) {
    return (
      <code className={className} {...rest}>
        {children}
      </code>
    );
  }

  return (
    <code
      className={`rounded bg-black/5 dark:bg-white/10 px-1 py-0.5 text-[0.9em] font-medium text-foreground/80 ${
        className ?? ""
      }`}
      {...rest}
    >
      {children}
    </code>
  );
}
