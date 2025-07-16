"use client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import RedirectionBack from "../RedirectionBack/RedirectionBack";
import Button from "../Button/Button";

interface HeaderOption {
  title: string;
  description?: string;
  action?: {
    onAction: () => void;
    content: string;
    type: "primary" | "secondary";
  };
  hrefBack?: string;
}

export default function Header() {
  const router = useRouter();
  const path = usePathname();

  const headerOptions = useMemo<Record<string, HeaderOption>>(() => {
    return {
      ["list-usuarios"]: {
        title: "Usuários",
        action: {
          onAction: () => router.push("create-usuario"),
          content: "Adicionar Usuário",
          type: "primary",
        },
      },
      ["create-usuario"]: {
        hrefBack: "/list-usuarios",
        title: "Registrar Usuário",
        description: `Ao finalizar o preenchimento do formulário, vá até a parte inferior e clique em "Salvar".`,
      },
      ["create-equipamento"]: {
        title: "Registrar Equipamento",
        hrefBack: "/list-equipamentos",
        description: `Ao finalizar o preenchimento do formulário, vá até a parte inferior e clique em "Salvar".`,
      },
      ["list-equipamentos"]: {
        title: "Equipamentos",
        action: {
          onAction: () => router.push("create-equipamento"),
          content: "Adicionar Equipamento",
          description: `Ao finalizar o preenchimento do formulário, vá até a parte inferior e clique em "Salvar".`,
          type: "primary",
        },
      },
      supplier: {
        hrefBack: "/usuarios",
        title: "Informações do Usuário",
        description: `Edite e/ou delete o usuário clicando nos botões localizados na parte inferior.`,
      },
      equipamento: {
        hrefBack: "/equipamentos",
        title: "Informações do Equipamento",
        description: `Edite e/ou delete o equipamento clicando nos botões localizados na parte inferior.`,
      },
      emprestimo: {
        hrefBack: "/equipamentos",
        title: "Informações do Empréstimo",
        description: `Marque como devolvido clicando no botão localizado na parte inferior.`,
      },
      ["list-emprestimos"]: {
        title: "Empréstimos",
        action: {
          onAction: () => router.push("create-emprestimo"),
          content: "Realizar Empréstimo",
          type: "primary",
        },
      },
      ["create-emprestimo"]: {
        hrefBack: "/list-emprestimos",
        title: "Realizar empréstimo",
        description: `Ao finalizar o preenchimento do formulário, vá até a parte inferior e clique em "Salvar".`,
      },
    };
  }, [router]);

  const getCurrentOption = useMemo(() => {
    const firstPathWithoutSlash = path.split("/")[1];
    return headerOptions[firstPathWithoutSlash as keyof typeof headerOptions];
  }, [path, headerOptions]);

  return (
    <>
      {getCurrentOption && (
        <div className="flex max-md:flex-wrap gap-2 items-center justify-between mt-8 mb-5">
          <div>
            {getCurrentOption.hrefBack && (
              <RedirectionBack hrefBack={getCurrentOption.hrefBack} />
            )}
            <h1 className="max-md:text-xl text-2xl font-bold text-gray-900">
              {getCurrentOption.title}
            </h1>
            {getCurrentOption.description && (
              <p className="text-sm leading-6 font-medium text-gray-600">
                {getCurrentOption.description}
              </p>
            )}
          </div>
          {getCurrentOption.action && (
            <span className="ml-auto">
              <Button
                handleClick={getCurrentOption.action.onAction}
                type="button"
                buttonStyle={getCurrentOption.action.type}
              >
                {getCurrentOption.action.content}
              </Button>
            </span>
          )}
        </div>
      )}
    </>
  );
}
