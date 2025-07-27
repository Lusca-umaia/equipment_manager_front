import { jsonToFormData } from "@/app/utils/functions";
import api from "../api";
import { EditEquipamentoFormData } from "@/app/(private)/(equipamentos)/utils";

export async function editEquipamento(
  id: string,
  formData: EditEquipamentoFormData,
) {
  try {
    await api.put(`/equipments/${id}`, jsonToFormData(formData), {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      success: true,
      data: null,
      message: "Equipamento editado com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Falha ao editar Equipamento!",
    };
  }
}
