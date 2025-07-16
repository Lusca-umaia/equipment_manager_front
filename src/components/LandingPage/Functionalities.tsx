import { TiUserDelete, TiUserAdd } from 'react-icons/ti';
import { FaBox, FaUserEdit } from "react-icons/fa";

const functionalities = [
  {
    name: "Cadastro de Usuários",
    icon: TiUserAdd,
    description:
      "Inclui formulários para a inserção de novos usuários no sistema.",
  },
  {
    name: "Empréstimo de equipamentos",
    icon: FaBox,
    description:
      "Permite emprestar equipamentos e gerenciar o seu recebimento.",
  },
];

export default function Functionalities() {
  return (
    <div className="bg-white pt-24 sm:pt-32" id="functionalities">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Funcionalidades
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Tudo que você precisa em um só lugar!
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Além de gerenciar seus equipamentos, nosso sistema permite fazer
            mais o quê?
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-10 gap-y-16 lg:max-w-none lg:flex lg:justify-center">
            {functionalities.map((functionality) => (
              <div key={functionality.name} className="flex flex-col">
                <dt className="flex items-center justify-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <functionality.icon className="text-3xl flex-none text-indigo-600" />
                  {functionality.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{functionality.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
