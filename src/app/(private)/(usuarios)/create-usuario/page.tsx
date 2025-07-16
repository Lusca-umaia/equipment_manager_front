"use client";
import { useState } from "react";
import Button from "@/components/UI/Button/Button";
import FormInput from "@/components/UI/FormInput/FormInput";

import z from "zod";

export const usuarioSchema = z.object({
  nome: z.string().min(1, "Este campo não pode ser vazio"),
  email: z
    .email("Formato inválido de E-mail")
    .min(1, "Este campo não pode ser vazio"),
  telefone: z.string().refine((telephone) => !telephone.includes("_"), {
    message: "Preencha todos os caracteres necessários",
  }),
  endereco: z.string().min(1, "Este campo não pode ser vazio"),
  cep: z.string().refine((cep) => !cep.includes("_"), {
    message: "Preencha todos os caracteres necessários",
  }),
  logradouro: z.string(),
  cidade: z
    .string()
    .min(1, "Preencha um CEP válido para que este valor seja preenchido"),
  estado: z
    .string()
    .min(1, "Preencha um CEP válido para que este valor seja preenchido"),
  numero: z.coerce
    .number()
    .int("O número deve ser inteiro")
    .min(0, "O número da casa não pode ser negativo"),
});

export const inputInformation = [
  {
    label: "Nome",
    name: "nome",
    type: "text",
    placeholder: "Digite o nome completo",
    customClass: "col-span-full md:col-span-2",
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "exemplo@dominio.com",
    customClass: "col-span-full md:col-span-2",
  },
  {
    label: "Telefone",
    name: "telefone",
    type: "telefone",
    mask: "(00)0000-0000",
    placeholder: "(99)9999-9999",
    customClass: "col-span-full md:col-span-2",
  },
  {
    label: "Endereço",
    name: "endereco",
    type: "text",
    placeholder: "Rua, avenida, etc.",
    customClass: "col-span-full md:col-span-4",
  },
  {
    label: "CEP",
    name: "cep",
    type: "text",
    mask: "00000-000",
    placeholder: "00000-000",
    customClass: "col-span-full md:col-span-2",
  },
  {
    label: "Logradouro",
    name: "logradouro",
    type: "text",
    placeholder: "Bairro ou zona",
    customClass: "col-span-full md:col-span-2",
  },
  {
    label: "Cidade",
    name: "cidade",
    type: "text",
    placeholder: "Digite a cidade",
    customClass: "col-span-full md:col-span-2",
  },
  {
    label: "Estado",
    name: "estado",
    type: "text",
    placeholder: "Digite o estado",
    customClass: "col-span-full md:col-span-2",
  },
  {
    label: "Número",
    name: "numero",
    type: "number",
    placeholder: "Nº da residência",
    customClass: "col-span-full md:col-span-2",
  },
];

const initalFormData = {
  nome: "",
  email: "",
  telefone: "",
  endereco: "",
  cep: "",
  logradouro: "",
  cidade: "",
  estado: "",
  numero: "",
};

export type UsuarioSchema = z.infer<typeof usuarioSchema>;

export default function CadastrarUsuario() {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState(initalFormData);
  const [errors, setErrors] = useState<
    Partial<Record<keyof UsuarioSchema, string>>
  >({});

  const handleChange = (name: string, value: string) => {
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = usuarioSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof UsuarioSchema, string>> = {};
      result.error.issues.forEach((err) => {
        const fieldName = err.path[0] as keyof UsuarioSchema;
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
                mask={information.mask}
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
