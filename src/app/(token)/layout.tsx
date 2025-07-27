import Header from "@/components/UI/Header/Header";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mt-12 max-lg:mx-2 lg:px-2 lg:ml-14">
      <div className="flex h-full flex-col">
        <div className="z-10 pl-2 pr-6 flex items-center justify-between fixed top-0 left-0 bg-white border-b shadow-inner w-full h-12">
          <span className="flex gap-1 items-center">
            <Image
              src={"/logo.png"}
              width={140}
              height={36}
              className="w-auto h-9"
              alt="Logo da Empresa"
              quality={100}
            />
          </span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mb-8">
        <Header />
        {children}
      </div>
    </div>
  );
}
