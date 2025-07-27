"use client";
import { useEffect, useState } from "react";
import FormInput from "@/components/UI/FormInput/FormInput";

import { useParams } from "next/navigation";
import InformationBox from "@/components/UI/InformationBox/InformationBox";
import {
  inputInformation,
  EquipamentoSchema,
  EquipamentoUpdateSchema,
  equipamentoUpdateSchema,
  EditEquipamentoFormData,
} from "../../utils";
import Actions from "@/components/UI/Actions/Actions";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { deleteEquipamento } from "@/services/equipamentos/deleteEquipamento";
import { editEquipamento } from "@/services/equipamentos/editEquipamento";
import Loading from "@/components/UI/Loading/Loading";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { getEquipamento } from "@/services/equipamentos/getEquipamentos";

export default function Usuario() {
  const [deletionIsLoading, setButtonIsLoading] = useState(false);
  const [equipamento, setEquipamento] = useState<EquipamentoSchema | null>(
    null,
  );
  const [newImage, setNewImage] = useState<null | File>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const { id: equipamentoId } = params;

  const router = useRouter();

  const {
    formData,
    errors,
    isLoading: editionIsLoading,
    handleChange,
    handleSubmit,
    setFormData,
    populateFormData,
  } = useFormSubmit<EquipamentoUpdateSchema | Record<string, any>>({
    schema: equipamentoUpdateSchema,
    initialData: {},
    onSubmit: async (data) =>
      await editEquipamento(
        equipamentoId as string,
        {
          ...data,
          imagem: newImage ? newImage : undefined,
        } as EditEquipamentoFormData,
      ),
    redirectUrl: "/list-equipamentos",
  });

  const toggleLoading = () => {
    setButtonIsLoading((prevLoading) => !prevLoading);
  };

  useEffect(() => {
    const fetchEquipamento = async () => {
      const response = await getEquipamento(equipamentoId! as string);

      if (response.success) {
        setEquipamento(response.data);
      } else {
        setError("Erro ao carregar equipamento");
      }

      setLoadingData(false);
    };

    fetchEquipamento();
  }, [equipamentoId]);

  useEffect(() => {
    if (equipamento) {
      populateFormData(equipamento);
    }
  }, [equipamento]);

  const handleDelete = async () => {
    toggleLoading();

    const response = await deleteEquipamento(equipamentoId as string);

    Swal.fire({
      icon: response.success ? "success" : "error",
      title: response.success ? "Equipamento deletado" : "Erro inesperado",
      text: response.message,
    });

    toggleLoading();

    if (response.success) {
      router.push("/list-equipamentos");
    }
  };

  const handleResetData = () => {
    setFormData(equipamento!);
    setNewImage(null);
  };

  const handleChangeMode = () => {
    setIsEditMode((isEditMode) => !isEditMode);
  };

  const isLoading = deletionIsLoading || editionIsLoading;

  if (loadingData) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-center font-semibold">{error}! : (</p>;
  }

  return (
    <div className="animate-appearance space-y-12 divide-y divide-gray-900/10">
      <form onSubmit={handleSubmit}>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <dl className="divide-y divide-gray-100">
            <div
              className={
                "relative pb-6 pt-2 flex items-center gap-4 justify-center sm:px-0"
              }
            >
              <img
                src={
                  newImage
                    ? URL.createObjectURL(newImage)
                    : `${process.env.NEXT_PUBLIC_API_BASE_URL}/imagens/${equipamento!.imagem}`
                }
                alt="Foto do equipamento"
                className="w-64 p-2 border object-contain h-auto rounded-md aspect-square"
              />
              {isEditMode && (
                <label
                  htmlFor="file-upload"
                  className="relative border p-2 border-dashed cursor-pointer rounded-md  bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                >
                  <span>Alterar imagem</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    onChange={(e) =>
                      e.target.files![0]
                        ? setNewImage(e.target.files![0])
                        : null
                    }
                    type="file"
                    accept="image/png, image/jpeg"
                    className="sr-only"
                  />
                </label>
              )}
            </div>
            {inputInformation.map((information, index) => (
              <InformationBox
                index={index + 1}
                key={information.name}
                length={inputInformation.length}
              >
                <dt className=" flex gap-1 items-center text-sm font-semibold leading-6 text-gray-900">
                  <span>
                    {information.label}
                    {!isEditMode && <span className="md:hidden">:</span>}
                  </span>
                </dt>
                <dd className="text-sm leading-6 font-medium text-gray-700 sm:col-span-1">
                  {isEditMode ? (
                    <FormInput
                      name={information.name}
                      handleChange={(value) =>
                        handleChange(information.name, value)
                      }
                      required
                      value={formData[
                        information.name as keyof typeof formData
                      ].toString()}
                      type={information.type}
                      key={information.name}
                      error={errors[information.name as keyof typeof errors]}
                    />
                  ) : (
                    formData[information.name as keyof typeof formData]
                  )}
                </dd>
              </InformationBox>
            ))}
            <Actions
              handleSupplierDelete={handleDelete}
              isEditMode={isEditMode}
              onResetData={handleResetData}
              loading={isLoading}
              onChangeMode={handleChangeMode}
            />
          </dl>
        </div>
      </form>
    </div>
  );
}
