import api from "../api";

export async function deleteEquipamento(id: string) {
  try {
    await api.delete(`/equipments/${id}`);

    return {
      success: true,
      data: null,
      message: "Equipamento removido com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Falha ao remover Equipamento!",
    };
  }
}
