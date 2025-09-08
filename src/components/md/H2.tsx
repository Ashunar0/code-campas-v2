export default function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl md:text-2xl font-bold mt-4 md:mt-8 mb-5 py-2 border-b-2 border-primary">
      {children}
    </h2>
  );
}
