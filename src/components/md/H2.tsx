export default function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-bold mt-10 mb-5 py-2 border-b-2 border-primary">
      {children}
    </h2>
  );
}
