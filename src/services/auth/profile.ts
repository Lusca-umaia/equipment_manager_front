import { Profile } from "@/@types/profile";
import api from "../api";

export async function getProfile() {
  try {
    const response = await api.get(`/adm/me`);

    return {
      success: true,
      data: response.data as Profile,
      message: "Informações do usuário obtidas com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Erro ao obeter informações do usuário!",
    };
  }
}
