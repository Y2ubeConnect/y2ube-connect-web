import Navbar from "../../components/Navbar";

export default function UnauthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-screen w-full flex flex-col">
      <Navbar />
      {children}
    </main>
  );
}
