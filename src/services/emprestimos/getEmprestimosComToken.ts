import api from "../api";

export async function getEmprestimosComToken(privateToken: string) {
  try {
    const response = await api.get(`/loans/user/${privateToken}`);

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

export async function getEmprestimoComToken(
  emprestimoId: string,
  privateToken: string,
) {
  try {
    const response = await api.get(
      `/loans/user/${emprestimoId}/${privateToken}`,
    );

    return {
      success: true,
      data: response.data,
      message: "Empréstimo obtido com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      data: {},
      message: "Falha ao buscar Empréstimo!",
    };
  }
}
