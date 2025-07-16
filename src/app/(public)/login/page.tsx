"use client";

import Link from "next/link";
import Image from "next/image";
import { z } from "zod";
import FormInput from "@/components/UI/FormInput/FormInput";
import { useState } from "react";

export const loginSchema = z.object({
  email: z.email("Email inválido"),
  senha: z.string().min(1, "Senha é obrigatória"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

const fieldInformation = [
  {
    type: "text",
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
];

const initalFormData = {
  email: "",
  senha: "",
};

export default function Login() {
  const [formData, setFormData] = useState(initalFormData);
  const [errors, setErrors] = useState<
    Partial<Record<keyof LoginSchema, string>>
  >({});

  const handleChange = (name: string, value: string) => {
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof LoginSchema, string>> = {};
      result.error.issues.forEach((err) => {
        const fieldName = err.path[0] as keyof LoginSchema;
        fieldErrors[fieldName] = err.message;
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
      console.log("Formulário válido:", result.data);
    }
  };

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
            Faça login na sua conta
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
                  required
                  placeholder={field.placeholder}
                  handleChange={(value) => handleChange(field.name, value)}
                  value={formData[field.name as keyof typeof formData]}
                  error={errors[field.name as keyof LoginSchema]}
                />
              ))}
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </form>
          <p className="mt-6 text-center text-sm text-gray-500">
            Não tem conta?{" "}
            <Link
              href="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Registrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
