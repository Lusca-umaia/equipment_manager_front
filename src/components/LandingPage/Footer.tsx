import { FaGithub, FaLinkedin } from "react-icons/fa";

interface IProps {
  navigation: {
    name: string;
    href: string;
  }[];
  scrollToSection: (id: string) => void;
}

const socialMedia = [
  {
    href: "https://github.com/Lusca-umaia",
    icon: FaGithub,
  },
  {
    href: "https://www.linkedin.com/in/lucas-maia-41b478214/",
    icon: FaLinkedin,
  },
];

export default function Footer(props: IProps) {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 pt-24 pb-6 sm:pt-32 lg:px-8">
        <nav className="-mb-6 border-t pt-20 sm:pt-24 flex justify-center flex-wrap max-sm:gap-6 sm:space-x-12">
          {props.navigation.map((item) => (
            <div key={item.name} className="pb-6">
              <button
                onClick={() => props.scrollToSection(item.href)}
                className="text-sm leading-6 text-gray-600 hover:text-gray-900"
              >
                {item.name}
              </button>
            </div>
          ))}
        </nav>
        <div className="mt-10 flex justify-center space-x-10">
          {socialMedia.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              className="text-gray-400 hover:text-gray-500"
            >
              <item.icon className="h-6 w-6" />
            </a>
          ))}
        </div>
        <p className="mt-10 text-center text-xs leading-5 text-gray-500">
          &copy; Copyright &copy; 2025 – Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
