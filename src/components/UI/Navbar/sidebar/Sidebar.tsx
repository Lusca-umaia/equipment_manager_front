"use client";
import SidebarMobile from "@/components/UI/Navbar/sidebar/SidebarMobile";
import SidebarDesktop from "@/components/UI/Navbar/sidebar/SidebarDesktop";
import { usePathname } from "next/navigation";

import { TiUserAdd } from "react-icons/ti";
import { FaUsers, FaBox, FaBoxes } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa6";
import { FaBoxesPacking } from "react-icons/fa6";

interface SidebarProps {
  openMenu: boolean;
  setOpenMenu: () => void;
}

export const navigationOptions = [
  {
    name: "Usuários",
    icon: FaUsers,
    href: "/list-usuarios",
  },
  {
    name: "Registrar Usuário",
    icon: TiUserAdd,
    href: "/create-usuario",
  },
  {
    name: "Equipamentos",
    icon: FaBoxes,
    href: "/list-equipamentos",
  },
  {
    name: "Registrar Equipamento",
    icon: FaBox,
    href: "/create-equipamento",
  },
  {
    name: "Empréstimos",
    icon: FaBoxesPacking,
    href: "/list-emprestimos",
  },
  {
    name: "Realizar empréstimo",
    icon: FaBoxOpen,
    href: "/create-emprestimo",
  },
];

export default function Sidebar(props: SidebarProps) {
  const path = usePathname();

  return (
    <>
      <SidebarMobile
        openMenu={props.openMenu}
        path={path}
        setOpenMenu={props.setOpenMenu}
      />
      <SidebarDesktop path={path} />
    </>
  );
}
