import { EquipamentoSchema } from "@/app/(private)/(equipamentos)/utils";

export interface Equipamento extends Omit<EquipamentoSchema, "imagem"> {
  id: number;
  imagem: string;
}
