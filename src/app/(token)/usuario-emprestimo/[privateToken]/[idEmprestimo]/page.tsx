"use client";
import { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import InformationBox from "@/components/UI/InformationBox/InformationBox";
import Loading from "@/components/UI/Loading/Loading";
import { Emprestimo } from "@/@types/emprestimo";
import StatusLoan from "@/components/UI/StatusLoan/StatusLoan";
import { getEmprestimoComToken } from "@/services/emprestimos/getEmprestimosComToken";

const fields = [
  {
    label: "Nome do equipamento",
    name: "nomeEquipamento",
  },
  {
    label: "Nome do usuário",
    name: "nomeUsuario",
  },
  {
    label: "CPF do usuário",
    name: "cpfUsuario",
  },
  {
    label: "Email do usuário",
    name: "emailUsuario",
  },
];

export default function Usuario() {
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [emprestimo, setEmprestimo] = useState<Emprestimo | null>(null);

  const params = useParams();
  const { privateToken, idEmprestimo } = params;

  useEffect(() => {
    const fetchEmprestimo = async () => {
      const response = await getEmprestimoComToken(
        idEmprestimo as string,
        privateToken as string,
      );

      if (response.success) {
        setEmprestimo(response.data);
      } else {
        setError("Erro ao carregar empréstimo");
      }

      setLoadingData(false);
    };

    fetchEmprestimo();
  }, [privateToken, idEmprestimo]);

  if (loadingData) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-center font-semibold">{error}! : (</p>;
  }

  return (
    <div className="animate-appearance space-y-12 divide-y divide-gray-900/10">
      <div>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <dl className="divide-y divide-gray-100">
            {fields.map((information, index) => (
              <InformationBox
                index={index}
                key={information.name}
                length={fields.length}
              >
                <dt className="flex gap-1 items-center text-sm font-semibold leading-6 text-gray-900">
                  <span>
                    {information.label}
                    <span className="md:hidden">:</span>
                  </span>
                </dt>
                <dd className="text-sm leading-6 font-medium text-gray-700 sm:col-span-1">
                  {emprestimo![information.name as keyof typeof emprestimo]}
                </dd>
              </InformationBox>
            ))}
            <div
              className={
                "relative sm:items-center grid py-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0"
              }
            >
              <dt className="flex gap-1 items-center text-sm font-semibold leading-6 text-gray-900">
                <span>
                  Status
                  <span className="md:hidden">:</span>
                </span>
              </dt>
              <dd className="text-sm leading-6 font-medium text-gray-700 sm:col-span-1">
                <StatusLoan status={emprestimo!.status} />
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
