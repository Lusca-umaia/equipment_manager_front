"use client";
import Image from "next/image";
import { IoMenu } from "react-icons/io5";
import Dropdown from "@/components/UI/Navbar/topbar/Dropdown";

interface TopbarProps {
  openMenu: boolean;
  setOpenMenu: () => void;
}

export default function Topbar(props: TopbarProps) {
  return (
    <div className="z-10 pl-2 pr-6 flex items-center justify-between fixed top-0 left-0 bg-white border-b shadow-inner w-full h-12">
      <span className="flex gap-1 items-center">
        <button
          type="button"
          onClick={() => props.setOpenMenu()}
          className="lg:hidden inline-flex ml-auto rounded-md bg-white text-gray-900 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <IoMenu className="h-5 w-5" />
        </button>
        <Image
          src={"/logo.png"}
          width={140}
          height={36}
          className="w-auto h-9"
          alt="Logo da Empresa"
          quality={100}
        />
      </span>
      <Dropdown />
    </div>
  );
}
