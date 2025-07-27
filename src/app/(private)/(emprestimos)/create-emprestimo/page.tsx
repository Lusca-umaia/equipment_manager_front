"use client";
import Button from "@/components/UI/Button/Button";
import Select, { Option } from "@/components/UI/Select/Select";
import { inputInformation, EmprestimoSchema, emprestimoSchema } from "../utils";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { realizarEmprestimo } from "@/services/emprestimos/realizarEmprestimo";
import { useEffect, useState } from "react";
import { getEquipamentos } from "@/services/equipamentos/getEquipamentos";
import { getUsuarios } from "@/services/usuarios/getUsuarios";
import { Equipamento } from "@/@types/equipamento";
import { Usuario } from "@/@types/usuario";
import Loading from "@/components/UI/Loading/Loading";

const initialFormData = {
  usuario: null,
  equipamento: null,
};

export default function RegisterLoan() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [equipamentos, setEquipamentos] = useState<Option[]>([]);
  const [usuarios, setUsuarios] = useState<Option[]>([]);

  const { formData, errors, isLoading, handleChange, handleSubmit } =
    useFormSubmit<EmprestimoSchema>({
      schema: emprestimoSchema,
      initialData: initialFormData as EmprestimoSchema,
      onSubmit: realizarEmprestimo,
      redirectUrl: "/list-emprestimos",
    });

  useEffect(() => {
    const fetchEntidades = async () => {
      const [responseEquipamento, responseUsario] = await Promise.all([
        getEquipamentos(),
        getUsuarios(),
      ]);

      if (responseEquipamento.success && responseUsario.success) {
        setUsuarios(
          responseUsario.data.map(({ nome, id }: Equipamento) => ({
            nome,
            id,
          })),
        );
        setEquipamentos(
          responseEquipamento.data.map(({ nome, id }: Usuario) => ({
            nome,
            id,
          })),
        );
      } else {
        setError("Erro ao carregar dados");
      }

      setLoading(false);
    };

    fetchEntidades();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-center font-semibold">{error}! : (</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="bg-white shadow-lg w-full col-span-2 p-4 rounded-lg grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          {inputInformation.map((information) => (
            <div key={information.name} className={information.customClass}>
              <Select
                name={information.name}
                value={formData[information.name as keyof typeof formData]}
                handleChange={(value) => handleChange(information.name, value)}
                options={
                  information.name === "equipamento" ? equipamentos : usuarios
                }
                label={information.label}
                error={errors[information.name as keyof typeof errors]}
              />
            </div>
          ))}
          <div className=" col-span-full pt-6 flex items-center justify-end border-t border-gray-900/10">
            <Button
              isLoading={isLoading}
              disabled={isLoading}
              type="submit"
              buttonStyle="primary"
            >
              {isLoading ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
