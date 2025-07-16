import { FaReact } from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiZod,
} from "react-icons/si";

const technologies = [
  {
    name: "React",
    icon: FaReact,
  },
  {
    name: "Typescript",
    icon: SiTypescript,
  },
  {
    name: "NextJs",
    icon: SiNextdotjs,
  },
  {
    name: "Tailwind",
    icon: SiTailwindcss,
  },
  {
    name: "Zod",
    icon: SiZod,
  },
];

export default function Technologies() {
  return (
    <div className="bg-gray-900 py-24 sm:py-32" id="technologies">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8 text-white">
          Utilização de tecnologias da atualidade
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          {technologies.map((technology) => (
            <span
              key={technology.name}
              className="col-span-2 lg:col-span-1 font-semibold text-white text-lg flex flex-col gap-2 text-center"
            >
              <technology.icon className=" mx-auto text-7xl" />
              {technology.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
