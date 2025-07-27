import { EquipamentoSchema } from "@/app/(private)/(equipamentos)/utils";
import api from "../api";
import { jsonToFormData } from "@/app/utils/functions";

export async function createEquipamento(formData: EquipamentoSchema) {
  try {
    await api.post(`/equipments`, jsonToFormData(formData), {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      success: true,
      data: null,
      message: "Equipamento criado com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Falha ao criar Equipamento!",
    };
  }
}
