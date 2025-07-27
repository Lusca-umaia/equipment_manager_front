import React from "react";
import Table from "@/components/UI/Table";
import Link from "next/link";
import { Usuario } from "@/@types/usuario";
import EmptyState from "@/components/UI/EmptyState/EmptyState";

const headItems = [
  {
    name: "Nome",
    field: "nome",
    order: 1,
  },
  {
    name: "Telefone",
    field: "telefone",
    order: 2,
  },
  {
    name: "Email",
    field: "email",
    order: 3,
  },
  {
    name: "Endereço",
    field: "endereco",
    order: 4,
  },
];

export default function UsuarioTable({ data }: { data: Usuario[] }) {
  return (
    <React.Fragment>
      {data.length > 0 && (
        <Table.Root>
          <Table.Head headItems={headItems} />
          {data.map((usuario: Usuario) => (
            <Table.Body key={usuario.id}>
              <Table.Row>
                {headItems.map((item) => (
                  <Table.Item key={item.name}>
                    {usuario[item.field as keyof typeof usuario]}
                  </Table.Item>
                ))}
                <Table.Item>
                  <span className="flex items-center justify-end gap-2">
                    <Link
                      className="underline text-gray-500"
                      href={`/usuario/${usuario.id}`}
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
      {data.length === 0 && <EmptyState>Sem usuários : (</EmptyState>}
    </React.Fragment>
  );
}
