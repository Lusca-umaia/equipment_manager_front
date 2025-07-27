import api from "../api";
import Cookies from "js-cookie";

interface Login {
  email: string;
  senha: string;
}

export async function login(formData: Login) {
  try {
    const response = await api.post(`/auth/login`, formData);

    const token = response.data?.token;

    if (token) {
      Cookies.set("token", token, { expires: 7 });
    }

    return {
      success: true,
      data: null,
      message: "Usuário autenticado com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Credenciais inválidas!",
    };
  }
}
