import { useCallback, useEffect, useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { classNames } from "@/app/utils/functions";
import { IoLogOutOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { getProfile } from "@/services/auth/profile";
import { Profile } from "@/@types/profile";

export default function Dropdown() {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile | null>();
  const [effect, setEffect] = useState({ active: false, style: "" });
  const router = useRouter();

  const hideDropdown = useCallback(async () => {
    setEffect((effect) => {
      return { ...effect, active: true, style: "duration-200 opacity-0" };
    });
    setTimeout(() => {
      setOpenDropdown(false);
      setEffect((effect) => {
        return { ...effect, active: false, style: "" };
      });
    }, 300);
  }, []);

  const logout = () => {
    Cookies.remove("token");
    router.push("/");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await getProfile();

      if (response.success) {
        setProfile(response.data);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="relative">
      <button
        className="flex cursor-pointer items-center gap-1 outline-none"
        onClick={() =>
          openDropdown ? hideDropdown() : setOpenDropdown((open) => !open)
        }
      >
        <img
          src={"https://cdn-icons-png.flaticon.com/512/3135/3135768.png"}
          width={100}
          height={100}
          className="w-8 h-8  rounded-full"
          alt="Foto de Perfil"
        />
        <HiChevronDown className="text-gray-900 text-xl" />
      </button>
      <div
        onClick={() => hideDropdown()}
        className={classNames(openDropdown ? "" : "hidden", "fixed inset-0")}
      ></div>
      {openDropdown && (
        <div
          className={classNames(
            effect.active ? effect.style : "",
            "z-10 w-32 h-auto flex flex-col gap-2 animate-appearance px-4 py-3 border text-center text-sm text-gray-900 font-semibold bg-white shadow-lg rounded-md absolute origin-top-right right-0 top-9",
          )}
        >
          <p>{profile?.nome}</p>
          <button
            onClick={logout}
            className="cursor-pointer flex gap-1 bg-gray-50 duration-100 hover:opacity-80 p-2 rounded-md shadow-inner"
          >
            <IoLogOutOutline className="w-5 h-5" />
            Sair
          </button>
        </div>
      )}
    </div>
  );
}
