import React from "react";
import Link from "next/link";
import Table from "@/components/UI/Table";
import { Equipamento } from "@/@types/equipamento";
import EmptyState from "@/components/UI/EmptyState/EmptyState";

const headItems = [
  {
    name: "Nome",
    field: "nome",
    order: 1,
  },
  {
    name: "Marca",
    field: "marca",
    order: 2,
  },
  {
    name: "Modelo",
    field: "modelo",
    order: 3,
  },
  {
    name: "Categoria",
    field: "categoria",
    order: 4,
  },
];

export default function EquipamentoTable({ data }: { data: Equipamento[] }) {
  return (
    <React.Fragment>
      {data.length > 0 && (
        <Table.Root>
          <Table.Head headItems={[{ name: "Foto", order: 0 }, ...headItems]} />
          {data.map((equipamento: Equipamento) => (
            <Table.Body key={equipamento.id}>
              <Table.Row>
                <Table.Item>
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/imagens/${equipamento.imagem}`}
                    alt="Foto do equipamento"
                    className="w-14 p-2 border object-contain h-auto rounded-md aspect-square"
                  />
                </Table.Item>

                {headItems.map((item) => (
                  <Table.Item key={item.name}>
                    {equipamento[item.field as keyof typeof equipamento]}
                  </Table.Item>
                ))}
                <Table.Item>
                  <span className="flex items-center justify-end gap-2">
                    <Link
                      className="underline text-gray-500"
                      href={`/equipamento/${equipamento.id}`}
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
      {data.length === 0 && <EmptyState>Sem equipamentos : (</EmptyState>}
    </React.Fragment>
  );
}
