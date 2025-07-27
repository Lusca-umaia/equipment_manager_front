"use client";
import { useEffect, useState } from "react";
import FormInput from "@/components/UI/FormInput/FormInput";

import { useParams, useRouter } from "next/navigation";
import InformationBox from "@/components/UI/InformationBox/InformationBox";
import { UsuarioSchema, inputInformation, usuarioSchema } from "../../utils";
import Actions from "@/components/UI/Actions/Actions";
import { deleteUsuario } from "@/services/usuarios/deleteUsuario";
import Swal from "sweetalert2";
import { editUsuario } from "@/services/usuarios/editUsuario";
import Loading from "@/components/UI/Loading/Loading";
import { getUsuario } from "@/services/usuarios/getUsuarios";
import { useFormSubmit } from "@/hooks/useFormSubmit";

export default function Usuario() {
  const [deletionIsLoading, setButtonIsLoading] = useState(false);
  const [usuario, setUsuario] = useState<UsuarioSchema | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id: usuarioId } = useParams();

  const router = useRouter();

  const {
    formData,
    errors,
    isLoading: editionIsLoading,
    handleChange,
    handleSubmit,
    setFormData,
    populateFormData,
  } = useFormSubmit<UsuarioSchema | Record<string, any>>({
    schema: usuarioSchema,
    initialData: {},
    onSubmit: async (data) =>
      await editUsuario(usuarioId as string, data as UsuarioSchema),
    redirectUrl: "/list-usuarios",
  });

  const isLoading = deletionIsLoading || editionIsLoading;

  const { id } = useParams();

  const toggleLoading = () => {
    setButtonIsLoading((prevLoading) => !prevLoading);
  };

  const handleDelete = async () => {
    toggleLoading();

    const response = await deleteUsuario(id as string);

    Swal.fire({
      icon: response.success ? "success" : "error",
      title: response.success ? "Usuário deletado" : "Erro inesperado",
      text: response.message,
    });

    toggleLoading();

    if (response.success) {
      router.push("/list-usuarios");
    }
  };

  const handleResetData = () => {
    setFormData(usuario as UsuarioSchema);
  };

  const handleChangeMode = () => {
    setIsEditMode((isEditMode) => !isEditMode);
  };

  useEffect(() => {
    const fetchUsuario = async () => {
      const response = await getUsuario(usuarioId! as string);

      if (response.success) {
        setUsuario(response.data);
      } else {
        setError("Erro ao carregar usuário");
      }

      setLoadingData(false);
    };

    fetchUsuario();
  }, [usuarioId]);

  useEffect(() => {
    if (usuario) {
      populateFormData(usuario);
    }
  }, [usuario]);

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
            {inputInformation.map((information, index) => (
              <InformationBox
                index={index}
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
                      mask={information.mask}
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
