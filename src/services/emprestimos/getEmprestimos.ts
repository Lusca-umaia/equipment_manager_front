import api from "../api";

export async function getEmprestimos() {
  try {
    const response = await api.get(`/loans`);

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

export async function getEmprestimo(id: string) {
  try {
    const response = await api.get(`/loans/${id}`);

    return {
      success: true,
      data: response.data,
      message: "Empréstimo obtido com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      data: {},
      message: "Falha ao buscar Equipamento!",
    };
  }
}
