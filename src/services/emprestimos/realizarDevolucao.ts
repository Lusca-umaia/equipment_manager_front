import api from "../api";

export async function realizarDevolucao(emprestimoId: string) {
  try {
    await api.put(`/loans/${emprestimoId}`);

    return {
      success: true,
      data: null,
      message: "Devolução realizada com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Falha ao realizar devolução!",
    };
  }
}
