"use client";

import { Equipamento } from "@/@types/equipamento";
import Table from "./components/EquipamentosTable";
import { useEffect, useState } from "react";
import { getEquipamentos } from "@/services/equipamentos/getEquipamentos";
import Loading from "@/components/UI/Loading/Loading";

export default function Equipamentos() {
  const [usuarios, setUsuarios] = useState<Equipamento[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const response = await getEquipamentos();

      if (response.success) {
        setUsuarios(response.data);
      } else {
        setError("Erro ao carregar usuários");
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
            <Table data={usuarios} />
          </div>
        </div>
      </div>
    </div>
  );
}
