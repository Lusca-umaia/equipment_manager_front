"use client";
import { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import InformationBox from "@/components/UI/InformationBox/InformationBox";
import { useRouter } from "next/navigation";
import Button from "@/components/UI/Button/Button";
import Loading from "@/components/UI/Loading/Loading";
import { Emprestimo } from "@/@types/emprestimo";
import { getEmprestimo } from "@/services/emprestimos/getEmprestimos";
import StatusLoan from "@/components/UI/StatusLoan/StatusLoan";
import { realizarDevolucao } from "@/services/emprestimos/realizarDevolucao";
import Swal from "sweetalert2";

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
  const [buttoIsLoading, setButtonIsLoading] = useState(false);

  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [emprestimo, setEmprestimo] = useState<Emprestimo | null>(null);

  const params = useParams();
  const { id: emprestimoId } = params;

  const router = useRouter();

  const toggleLoading = () => {
    setButtonIsLoading((prevLoading) => !prevLoading);
  };

  const handleDevolucao = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toggleLoading();

    const response = await realizarDevolucao(emprestimoId as string);

    Swal.fire({
      icon: response.success ? "success" : "error",
      title: response.success ? "Equipamento devolvido" : "Erro inesperado",
      text: response.message,
    });

    toggleLoading();

    if (response.success) {
      router.push("/list-emprestimos");
    }
  };

  useEffect(() => {
    const fetchEmprestimo = async () => {
      const response = await getEmprestimo(emprestimoId! as string);

      if (response.success) {
        setEmprestimo(response.data);
      } else {
        setError("Erro ao carregar empréstimo");
      }

      setLoadingData(false);
    };

    fetchEmprestimo();
  }, [emprestimoId]);

  if (loadingData) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-center font-semibold">{error}! : (</p>;
  }

  return (
    <div className="animate-appearance space-y-12 divide-y divide-gray-900/10">
      <form onSubmit={handleDevolucao}>
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
            <span className={"flex gap-2 justify-end pt-6 pb-2"}>
              {emprestimo!.status === "Em andamento" && (
                <Button
                  disabled={buttoIsLoading}
                  isLoading={buttoIsLoading}
                  buttonStyle="primary"
                  type="submit"
                >
                  Marcar como devolvido
                </Button>
              )}
            </span>
          </dl>
        </div>
      </form>
    </div>
  );
}
