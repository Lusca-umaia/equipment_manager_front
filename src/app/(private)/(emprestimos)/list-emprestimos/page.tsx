"use client";

import { Emprestimo } from "@/@types/emprestimo";
import Table from "./components/EmprestimosTable";
import Loading from "@/components/UI/Loading/Loading";
import { useEffect, useState } from "react";
import { getEmprestimos } from "@/services/emprestimos/getEmprestimos";

export default function Emprestimos() {
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const response = await getEmprestimos();

      if (response.success) {
        setEmprestimos(response.data);
      } else {
        setError("Erro ao carregar empréstimos");
      }

      setLoading(false);
    };

    fetchUsuarios();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-center font-semibold">{error}! : (</p>;
  }

  return (
    <div>
      <div
        className={
          "animate-appearance shadow-lg mt-4 flow-root bg-white px-4 py-4 rounded-lg"
        }
      >
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle">
            <Table data={emprestimos} />
          </div>
        </div>
      </div>
    </div>
  );
}
