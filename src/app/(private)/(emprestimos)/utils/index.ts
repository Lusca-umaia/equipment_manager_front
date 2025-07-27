import z from "zod";

const optionSchema = z.object({
  id: z.number(),
  nome: z.string(),
});

export const emprestimoSchema = z.object({
  usuario: optionSchema.nullable().refine((val) => val !== null, {
    message: "Usuário é obrigatório",
  }),
  equipamento: optionSchema.nullable().refine((val) => val !== null, {
    message: "Equipamento é obrigatório",
  }),
});

export type EmprestimoSchema = z.infer<typeof emprestimoSchema>;

export const inputInformation = [
  {
    label: "Usuário",
    name: "usuario",
    type: "text",
    customClass: "col-span-full md:col-span-2",
  },
  {
    label: "Equipamento",
    name: "equipamento",
    type: "text",
    customClass: "col-span-full md:col-span-2",
  },
] as const;
