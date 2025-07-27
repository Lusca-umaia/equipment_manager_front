import z from "zod";

export const inputInformation = [
  {
    label: "Nome",
    name: "nome",
    type: "text",
    placeholder: "Digite o nome do equipamento",
    customClass: "col-span-full md:col-span-2",
  },
  {
    label: "Marca",
    name: "marca",
    type: "text",
    placeholder: "Digite a marca",
    customClass: "col-span-full md:col-span-2",
  },
  {
    label: "Modelo",
    name: "modelo",
    type: "text",
    placeholder: "Digite o modelo",
    customClass: "col-span-full md:col-span-2",
  },
  {
    label: "Categoria",
    name: "categoria",
    type: "text",
    placeholder: "Digite a categoria",
    customClass: "col-span-full md:col-span-2",
  },
];

export const equipamentoSchema = z.object({
  nome: z.string().min(1, "Este campo não pode ser vazio"),
  marca: z.string().min(1, "Este campo não pode ser vazio"),
  modelo: z.string().min(1, "Este campo não pode ser vazio"),
  categoria: z.string().min(1, "Este campo não pode ser vazio"),
  imagem: z
    .instanceof(File, { error: "Foto do equipamento é necessária" })
    .refine((file) => file.size > 0, "Envie uma imagem")
    .refine(
      (file) => ["image/jpeg", "image/png"].includes(file.type),
      "A imagem deve ser PNG ou JPG",
    ),
});

export const equipamentoUpdateSchema = equipamentoSchema.omit({
  imagem: true,
});

export type EquipamentoSchema = z.infer<typeof equipamentoSchema>;

export type EquipamentoUpdateSchema = z.infer<typeof equipamentoUpdateSchema>;

export interface EditEquipamentoFormData extends EquipamentoUpdateSchema {
  imagem?: File;
}
