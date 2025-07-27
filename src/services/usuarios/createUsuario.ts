import api from "../api";
import { UsuarioSchema } from "@/app/(private)/(usuarios)/utils";

export async function createUsuario(formData: UsuarioSchema) {
  try {
    await api.post(`/users`, formData);

    return {
      success: true,
      data: null,
      message: "Usuário criado com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Falha ao criar usuário!",
    };
  }
}
