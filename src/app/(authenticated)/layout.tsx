import Navbar from "../../components/Navbar";
import RequireAuthWrapper from "../../components/RequireAuthWrapper";
import { Toaster } from "../../components/ui/toaster";

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-screen w-full flex flex-col">
      <Navbar />
      <RequireAuthWrapper>{children}</RequireAuthWrapper>
      <Toaster />
    </main>
  );
}
