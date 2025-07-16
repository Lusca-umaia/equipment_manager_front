import Header from "@/components/UI/Header/Header";
import Navbar from "@/components/UI/Navbar/Navbar";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mt-12 max-lg:mx-2 lg:px-2 lg:ml-14">
      <Navbar />
      <div className="max-w-7xl mx-auto mb-8">
        <Header />
        {children}
      </div>
    </div>
  );
}
