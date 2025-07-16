import { FaXmark } from "react-icons/fa6";
import { useRouter } from "next/navigation";

import { classNames } from "@/app/utils/functions";
import { navigationOptions } from "./Sidebar";

interface SidebarMobileProps {
  openMenu: boolean;
  setOpenMenu: () => void;
  path: string;
}

export default function SidebarMobile(props: SidebarMobileProps) {
  const router = useRouter();

  return (
    <>
      {props.openMenu && (
        <div
          onClick={() => props.setOpenMenu()}
          className="lg:hidden fixed inset-0 backdrop-blur-md z-0 animate-appearance"
        ></div>
      )}
      <div
        className={classNames(
          props.openMenu ? "left-0" : "-left-full",
          "duration-700 lg:hidden max-[340px]:w-full z-10 pt-12 top-0 fixed flex items-start h-full",
        )}
      >
        <ul
          className={
            "flex flex-col max-[340px]:w-full w-72 gap-2.5 duration-100 h-full bg-white py-2.5 border-r px-2 shadow-inner"
          }
        >
          <button
            type="button"
            onClick={() => props.setOpenMenu()}
            className="lg:hidden inline-flex ml-auto rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <FaXmark className="h-5 w-5" />
          </button>
          {navigationOptions.map((option, index) => (
            <li
              onClick={() => {
                props.setOpenMenu();
                router.push(option.href);
              }}
              key={index}
              className={classNames(
                props.path.split("/")[1] == option.href.replace("/", "")
                  ? "bg-indigo-600 text-gray-100"
                  : "text-gray-900 bg-gray-50",
                "cursor-pointer w-full shadow-md justify-center hover:bg-indigo-600 hover:scale-105 px-2 hover:text-gray-100 duration-100 h-10 flex items-center rounded-md",
              )}
            >
              <option.icon className="text-2xl mx-2 shrink-0 duration-100" />
              <span className={"w-full text-sm font-semibold duration-100"}>
                {option.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
