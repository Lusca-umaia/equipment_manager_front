import Table from "@/components/UI/Table";
import Link from "next/link";

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

export default function UsuarioTable({ data }: { data: any }) {
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
