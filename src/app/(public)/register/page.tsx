"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import FormInput from "@/components/UI/FormInput/FormInput";
import { z } from "zod";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { register } from "@/services/auth/register";

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const phoneRegex = /^\(\d{2}\)\d{4,5}-\d{4}$/;

export const registerSchema = z.object({
  nome: z.string().min(1, "O nome é obrigatório"),
  email: z.email("E-mail inválido"),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  cpf: z
    .string()
    .regex(cpfRegex, { message: "CPF inválido, use o formato 999.999.999-99" }),
  telefone: z.string().regex(phoneRegex, {
    message: "Número de contato inválido, use o formato (99)99999-9999",
  }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

const fieldInformation = [
  {
    type: "text",
    label: "Nome Completo",
    name: "nome",
    placeholder: "Lucas Maia",
  },
  {
    type: "email",
    label: "Email",
    name: "email",
    placeholder: "email@email.com",
  },
  {
    type: "password",
    label: "Senha",
    name: "senha",
    placeholder: "********",
  },
  {
    type: "text",
    label: "CPF",
    name: "cpf",
    mask: "000.000.000-00",
    placeholder: "000-000-000-00",
  },
  {
    type: "text",
    label: "Número de contato",
    name: "telefone",
    mask: "(00)00000-0000",
    placeholder: "(00)0000-0000",
  },
];

const initialFormData = {
  nome: "",
  email: "",
  senha: "",
  cpf: "",
  telefone: "",
};

export default function Register() {
  const { formData, errors, isLoading, handleChange, handleSubmit } =
    useFormSubmit<RegisterSchema>({
      schema: registerSchema,
      initialData: initialFormData,
      onSubmit: register,
      redirectUrl: "/login",
    });

  return (
    <div className="flex bg-gray-100 items-center justify-center min-w-full min-h-screen">
      <div className="flex h-fit flex-col w-fit justify-center flex-1 px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            width={400}
            height={400}
            src="/logo.png"
            alt="Logo"
            className="w-52 mb-2 mx-auto"
            quality={100}
            priority
          />
          <h2 className="mt-0 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Cadastro no sistema
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-2.5">
              {fieldInformation.map((field) => (
                <FormInput
                  key={field.name}
                  name={field.name}
                  type={field.type}
                  label={field.label}
                  mask={field.mask}
                  required
                  placeholder={field.placeholder}
                  handleChange={(value) => handleChange(field.name, value)}
                  value={formData[field.name as keyof typeof formData]}
                  error={errors[field.name as keyof RegisterSchema]}
                />
              ))}
            </div>
            <div>
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="cursor-pointer disabled:opacity-70 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {isLoading ? "Cadastrando..." : "Cadastrar"}
                </button>
              </div>
            </div>
          </form>
          <p className="mt-6 text-center text-sm text-gray-500">
            Possui conta?{" "}
            <Link
              href="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Logar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
