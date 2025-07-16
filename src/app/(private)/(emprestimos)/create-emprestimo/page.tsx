"use client";
import { useState } from "react";
import Button from "@/components/UI/Button/Button";
import Select from "@/components/UI/Select/Select";
import { Option } from "@/components/UI/Select/Select";

import z from "zod";

const optionSchema = z.object({
  id: z.number(),
  nome: z.string(),
});

const emprestimoSchema = z.object({
  usuario: optionSchema.nullable().refine((val) => val !== null, {
    message: "Usuário é obrigatório",
  }),
  equipamento: optionSchema.nullable().refine((val) => val !== null, {
    message: "Equipamento é obrigatório",
  }),
});

export type EmprestimoSchema = z.infer<typeof emprestimoSchema>;

const inputInformation = [
  {
    label: "Usuário",
    name: "usuario",
    type: "text",
    customClass: "col-span-full md:col-span-2",
  },
  {
    label: "Equipamento",
    name: "equipamento",
    type: "text",
    customClass: "col-span-full md:col-span-2",
  },
];

interface FormData {
  usuario: Option | null;
  equipamento: Option | null;
}

const initialFormData = {
  usuario: null,
  equipamento: null,
};

export default function RegisterLoan() {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<
    Partial<Record<keyof EmprestimoSchema, string>>
  >({});

  const handleChange = (name: string, value: Option) => {
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = emprestimoSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof EmprestimoSchema, string>> = {};
      result.error.issues.forEach((err) => {
        const fieldName = err.path[0] as keyof EmprestimoSchema;
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
            <div key={information.name} className={information.customClass}>
              <Select
                name={information.name}
                value={formData[information.name as keyof typeof formData]}
                handleChange={(value) => handleChange(information.name, value)}
                options={[
                  { id: 1, nome: "Lucas" },
                  { id: 2, nome: "Cauã" },
                ]}
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
