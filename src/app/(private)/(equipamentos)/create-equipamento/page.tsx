"use client";

import Button from "@/components/UI/Button/Button";
import FormInput from "@/components/UI/FormInput/FormInput";
import { IoMdPhotos } from "react-icons/io";
import {
  inputInformation,
  EquipamentoSchema,
  equipamentoSchema,
} from "../utils";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { createEquipamento } from "@/services/equipamentos/createEquipamento";

const initialFormData: Partial<EquipamentoSchema> = {
  nome: "",
  marca: "",
  modelo: "",
  categoria: "",
  imagem: undefined,
};

export default function CadastrarEquipamento() {
  const { formData, errors, isLoading, handleChange, handleSubmit } =
    useFormSubmit<EquipamentoSchema>({
      schema: equipamentoSchema,
      initialData: initialFormData as EquipamentoSchema,
      onSubmit: createEquipamento,
      redirectUrl: "/list-equipamentos",
    });

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
                value={
                  formData[information.name as keyof typeof formData] as string
                }
                error={errors[information.name as keyof typeof errors]}
              />
            </div>
          ))}
          <div className="col-span-full">
            <label
              htmlFor="cover-photo"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Imagem do equipamento
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                {formData.imagem ? (
                  <img
                    src={URL.createObjectURL(formData.imagem)}
                    alt="Foto do equipamento"
                    className="w-48 object-contain h-auto mx-auto rounded-md aspect-square"
                  />
                ) : (
                  <IoMdPhotos
                    aria-hidden="true"
                    className="mx-auto size-12 text-gray-300"
                  />
                )}
                <div className="mt-4 flex text-sm/6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative mx-auto cursor-pointer flex justify-center rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                  >
                    <span>Enviar arquivo</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      onChange={(e) =>
                        handleChange("imagem", e.target.files![0])
                      }
                      type="file"
                      accept="image/png, image/jpeg"
                      className="sr-only"
                    />
                  </label>
                </div>
                <p className="text-xs/5 text-gray-600">PNG ou JPG</p>
              </div>
            </div>
            {errors["imagem"] && (
              <p className="text-sm font-medium mt-0.5 text-red-600">
                {errors["imagem"]}
              </p>
            )}
          </div>
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
