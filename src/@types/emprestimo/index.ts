export interface Emprestimo {
  id: number;
  status: "Em andamento" | "Finalizado";
  nomeUsuario: string;
  emailUsuario: string;
  equipamento: string;
}
