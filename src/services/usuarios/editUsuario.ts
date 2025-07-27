import api from "../api";
import { UsuarioSchema } from "@/app/(private)/(usuarios)/utils";

export async function editUsuario(id: string, formData: UsuarioSchema) {
  try {
    await api.put(`/users/${id}`, formData);

    return {
      success: true,
      data: null,
      message: "Usuário editado com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Falha ao editar usuário!",
    };
  }
}
