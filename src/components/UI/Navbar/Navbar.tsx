"use client";
import { useState } from "react";

import Topbar from "@/components/UI/Navbar/topbar/Topbar";
import Sidebar from "@/components/UI/Navbar/sidebar/Sidebar";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="flex h-full flex-col">
      <Topbar
        openMenu={openMenu}
        setOpenMenu={() => setOpenMenu((openMenu) => !openMenu)}
      />
      <Sidebar
        openMenu={openMenu}
        setOpenMenu={() => setOpenMenu((openMenu) => !openMenu)}
      />
    </div>
  );
}
