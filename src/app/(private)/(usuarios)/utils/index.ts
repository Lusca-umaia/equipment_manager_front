import z from "zod";

export const inputInformation = [
  {
    label: "Nome",
    name: "nome",
    type: "text",
    placeholder: "Digite o nome completo",
    customClass: "col-span-full md:col-span-2",
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "exemplo@dominio.com",
    customClass: "col-span-full md:col-span-2",
  },
  {
    label: "CPF",
    name: "cpf",
    type: "text",
    mask: "000.000.000-00",
    placeholder: "000.000.000-00",
    customClass: "col-span-full md:col-span-2",
  },
  {
    label: "Telefone",
    name: "telefone",
    type: "telefone",
    mask: "(00)0000-0000",
    placeholder: "(99)9999-9999",
    customClass: "col-span-full md:col-span-2",
  },
  {
    label: "Endereço",
    name: "endereco",
    type: "text",
    placeholder: "Rua, avenida, etc.",
    customClass: "col-span-full md:col-span-4",
  },
  {
    label: "CEP",
    name: "cep",
    type: "text",
    mask: "00000-000",
    placeholder: "00000-000",
    customClass: "col-span-full md:col-span-2",
  },
  {
    label: "Logradouro",
    name: "logradouro",
    type: "text",
    placeholder: "Bairro ou zona",
    customClass: "col-span-full md:col-span-2",
  },
  {
    label: "Cidade",
    name: "cidade",
    type: "text",
    placeholder: "Digite a cidade",
    customClass: "col-span-full md:col-span-2",
  },
  {
    label: "Estado",
    name: "estado",
    type: "text",
    placeholder: "Digite o estado",
    customClass: "col-span-full md:col-span-2",
  },
  {
    label: "Número",
    name: "numero",
    type: "number",
    placeholder: "Nº da residência",
    customClass: "col-span-full md:col-span-2",
  },
];

export const usuarioSchema = z.object({
  nome: z.string().min(1, "Este campo não pode ser vazio"),
  email: z
    .email("Formato inválido de E-mail")
    .min(1, "Este campo não pode ser vazio"),
  telefone: z.string().refine((telephone) => !telephone.includes("_"), {
    message: "Preencha todos os caracteres necessários",
  }),
  endereco: z.string().min(1, "Este campo não pode ser vazio"),
  cep: z.string().refine((cep) => !cep.includes("_"), {
    message: "Preencha todos os caracteres necessários",
  }),
  cpf: z
    .string()
    .min(14, "CPF incompleto")
    .refine((cpf) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf), {
      message: "Formato de CPF inválido",
    }),
  logradouro: z.string(),
  cidade: z
    .string()
    .min(1, "Preencha um CEP válido para que este valor seja preenchido"),
  estado: z
    .string()
    .min(1, "Preencha um CEP válido para que este valor seja preenchido"),
  numero: z
    .string()
    .min(1, "Número obrigatório")
    .regex(/^\d+$/, "Número inválido"),
});

export type UsuarioSchema = z.infer<typeof usuarioSchema>;
