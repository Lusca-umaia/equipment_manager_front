"use client";

import { useState } from "react";
import Button from "@/components/UI/Button/Button";
import FormInput from "@/components/UI/FormInput/FormInput";
import z from "zod";

const inputInformation = [
  {
    label: "Nome",
    name: "nome",
    type: "text",
    placeholder: "Digite o nome do equipamento",
    customClass: "col-span-full md:col-span-2",
  },
  {
    label: "Marca",
    name: "marca",
    type: "text",
    placeholder: "Digite a marca",
    customClass: "col-span-full md:col-span-2",
  },
  {
    label: "Modelo",
    name: "modelo",
    type: "text",
    placeholder: "Digite o modelo",
    customClass: "col-span-full md:col-span-2",
  },
  {
    label: "Categoria",
    name: "categoria",
    type: "text",
    placeholder: "Digite a categoria",
    customClass: "col-span-full md:col-span-2",
  },
];

export const equipamentoSchema = z.object({
  nome: z.string().min(1, "Este campo não pode ser vazio"),
  marca: z.string().min(1, "Este campo não pode ser vazio"),
  modelo: z.string().min(1, "Este campo não pode ser vazio"),
  categoria: z.string().min(1, "Este campo não pode ser vazio"),
});

export type EquipamentoSchema = z.infer<typeof equipamentoSchema>;

const initalFormData: EquipamentoSchema = {
  nome: "",
  marca: "",
  modelo: "",
  categoria: "",
};

export default function CadastrarEquipamento() {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState(initalFormData);
  const [errors, setErrors] = useState<
    Partial<Record<keyof EquipamentoSchema, string>>
  >({});

  const handleChange = (name: string, value: string) => {
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = equipamentoSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof EquipamentoSchema, string>> = {};
      result.error.issues.forEach((err) => {
        const fieldName = err.path[0] as keyof EquipamentoSchema;
        fieldErrors[fieldName] = err.message;
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
      console.log("Formulário válido:", result.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="bg-white shadow-lg w-full col-span-2 p-4 rounded-lg grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          {inputInformation.map((information) => (
            <div className={information.customClass} key={information.name}>
              <FormInput
                name={information.name}
                label={information.label}
                handleChange={(value) => handleChange(information.name, value)}
                required
                type={information.type}
                placeholder={information.placeholder}
                value={formData[information.name as keyof typeof formData]}
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
