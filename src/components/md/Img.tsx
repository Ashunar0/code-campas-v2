export function Img({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} className="w-full h-auto shadow-md" />;
}
