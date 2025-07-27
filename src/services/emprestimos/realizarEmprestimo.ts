import { EmprestimoSchema } from "@/app/(private)/(emprestimos)/utils";
import api from "../api";

export async function realizarEmprestimo(formData: EmprestimoSchema) {
  try {
    await api.post(`/loans`, {
      equipmentId: formData.equipamento!.id,
      userId: formData.usuario!.id,
    });

    return {
      success: true,
      data: null,
      message: "Empréstimo realizado com sucesso!",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Falha ao realizar empréstimo!",
    };
  }
}
