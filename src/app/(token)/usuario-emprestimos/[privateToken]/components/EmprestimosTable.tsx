import React from "react";
import { Emprestimo } from "@/@types/emprestimo";
import Table from "@/components/UI/Table";
import Link from "next/link";
import EmptyState from "@/components/UI/EmptyState/EmptyState";
import { classNames } from "@/app/utils/functions";
import { useParams } from "next/navigation";

const headItems = [
  {
    name: "Nome do Usuário",
    field: "nomeUsuario",
    order: 1,
  },
  {
    name: "Email do Usuário",
    field: "emailUsuario",
    order: 2,
  },
  {
    name: "Equipamento",
    field: "nomeEquipamento",
    order: 3,
  },
];

export default function EmprestimosTable({ data }: { data: Emprestimo[] }) {
  const { privateToken } = useParams();
  return (
    <React.Fragment>
      {data.length > 0 && (
        <Table.Root>
          <Table.Head
            headItems={[...headItems, { name: "Status", order: 4 }]}
          />
          {data.map((emprestimo) => (
            <Table.Body key={emprestimo.id}>
              <Table.Row>
                {headItems.map((item) => (
                  <Table.Item key={item.name}>
                    {emprestimo[item.field as keyof Emprestimo] as string}
                  </Table.Item>
                ))}
                <Table.Item>
                  <span
                    className={classNames(
                      emprestimo.status === "Em andamento"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-700",
                      "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium",
                    )}
                  >
                    {emprestimo.status}
                  </span>
                </Table.Item>
                <Table.Item>
                  <span className="flex items-center justify-end gap-2">
                    <Link
                      className="underline text-gray-500"
                      href={`/usuario-emprestimo/${privateToken}/${emprestimo.id}`}
                    >
                      Visualizar
                    </Link>
                  </span>
                </Table.Item>
              </Table.Row>
            </Table.Body>
          ))}
        </Table.Root>
      )}
      {data.length === 0 && <EmptyState>Sem empréstimos : (</EmptyState>}
    </React.Fragment>
  );
}
