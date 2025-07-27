import api from "../api";

export async function getUsuarios() {
  try {
    const response = await api.get(`/users`);

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

export async function getUsuario(id: string) {
  try {
    const response = await api.get(`/users/${id}`);

    return {
      success: true,
      data: response.data,
      message: "Usuário obtido com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      data: {},
      message: "Falha ao buscar Usuário!",
    };
  }
}
