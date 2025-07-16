import Table from "@/components/UI/Table";
import Link from "next/link";

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
    field: "equipamento",
    order: 3,
  },
];

export default function EmprestimosTable({ data }: { data: any }) {
  return (
    <Table.Root>
      <Table.Head headItems={headItems} />
      {data.map((supplier: any, index: number) => (
        <Table.Body key={index}>
          <Table.Row>
            {headItems.map((item) => (
              <Table.Item key={item.name}>
                {supplier[item.field as keyof typeof supplier]}
              </Table.Item>
            ))}
            <Table.Item>
              <span className="flex items-center justify-end gap-2">
                <Link
                  className="underline text-gray-500"
                  href={`/supplier/${supplier.id}`}
                >
                  Visualizar
                </Link>
              </span>
            </Table.Item>
          </Table.Row>
        </Table.Body>
      ))}
    </Table.Root>
  );
}
