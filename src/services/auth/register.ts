import { RegisterSchema } from "@/app/(public)/register/page";
import api from "../api";

export async function register(formData: RegisterSchema) {
  try {
    await api.post(`/auth/register`, formData);

    return {
      success: true,
      data: null,
      message: "Usuário cadastrado com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Erro ao cadastrar usuário!",
    };
  }
}
