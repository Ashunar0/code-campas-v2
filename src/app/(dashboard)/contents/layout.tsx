export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css"
        rel="stylesheet"
      />
      <article className="prose prose-sm md:prose-base mb-8 mx-auto px-4 py-12 max-w-4xl !prose-pre:text-[0.9rem] !prose-code:text-[0.9rem] !prose-pre:leading-7 bg-white">
        {children}
      </article>
    </>
  );
}
