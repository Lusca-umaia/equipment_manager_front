"use client";

import { useEffect, useState } from "react";
import Table from "./components/UsuarioTable";
import { Usuario } from "@/@types/usuario";
import { getUsuarios } from "@/services/usuarios/getUsuarios";
import Loading from "@/components/UI/Loading/Loading";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const response = await getUsuarios();

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
      <div className="animate-appearance shadow-lg mt-4 flow-root bg-white px-4 py-4 rounded-lg">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle">
            <Table data={usuarios} />
          </div>
        </div>
      </div>
    </div>
  );
}
