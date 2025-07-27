"use client";

import { useFormSubmit } from "@/hooks/useFormSubmit";
import { createUsuario } from "@/services/usuarios/createUsuario";
import Button from "@/components/UI/Button/Button";
import FormInput from "@/components/UI/FormInput/FormInput";
import {
  usuarioSchema,
  UsuarioSchema,
  inputInformation,
} from "@/app/(private)/(usuarios)/utils";

const initialFormData = {
  nome: "",
  email: "",
  telefone: "",
  endereco: "",
  cep: "",
  cpf: "",
  logradouro: "",
  cidade: "",
  estado: "",
  numero: "",
};

export default function CadastrarUsuario() {
  const { formData, errors, isLoading, handleChange, handleSubmit } =
    useFormSubmit<UsuarioSchema>({
      schema: usuarioSchema,
      initialData: initialFormData,
      onSubmit: createUsuario,
      redirectUrl: "/list-usuarios",
    });

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="bg-white shadow-lg w-full col-span-2 p-4 rounded-lg grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          {inputInformation.map((info) => (
            <div className={info.customClass} key={info.name}>
              <FormInput
                name={info.name}
                label={info.label}
                handleChange={(value) => handleChange(info.name, value)}
                required
                type={info.type}
                placeholder={info.placeholder}
                mask={info.mask}
                value={formData[info.name as keyof typeof formData]}
                error={errors[info.name as keyof typeof errors]}
              />
            </div>
          ))}
          <div className="col-span-full pt-6 flex items-center justify-end border-t border-gray-900/10">
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
