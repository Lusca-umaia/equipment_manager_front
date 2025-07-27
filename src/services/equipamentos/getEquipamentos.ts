import api from "../api";

export async function getEquipamentos() {
  try {
    const response = await api.get(`/equipments`);

    return {
      success: true,
      data: response.data,
      message: "Listagem obtida com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: "Falha ao buscar listagem!",
    };
  }
}

export async function getEquipamento(id: string) {
  try {
    const response = await api.get(`/equipments/${id}`);

    return {
      success: true,
      data: response.data,
      message: "Equipamento obtido com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      data: {},
      message: "Falha ao buscar Equipamento!",
    };
  }
}
