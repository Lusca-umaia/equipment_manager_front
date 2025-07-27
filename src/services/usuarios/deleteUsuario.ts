import api from "../api";

export async function deleteUsuario(id: string) {
  try {
    await api.delete(`/users/${id}`);

    return {
      success: true,
      data: null,
      message: "Usuário removido com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Falha ao remover usuário!",
    };
  }
}
