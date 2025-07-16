"use client";

import Table from "./components/EmprestimosTable";

const emprestimosMock: {
  nomeUsuario: string;
  emailUsuario: string;
  equipamento: string;
}[] = [
  {
    nomeUsuario: "Lucas Maia",
    emailUsuario: "lucas.maia@example.com",
    equipamento: "Notebook Dell Latitude 5420",
  },
  {
    nomeUsuario: "Ana Beatriz",
    emailUsuario: "ana.beatriz@example.com",
    equipamento: "Projetor Epson PowerLite X49",
  },
  {
    nomeUsuario: "Carlos Souza",
    emailUsuario: "carlos.souza@example.com",
    equipamento: "Tablet Samsung Galaxy Tab A8",
  },
  {
    nomeUsuario: "Juliana Lima",
    emailUsuario: "juliana.lima@example.com",
    equipamento: "Impressora HP LaserJet Pro M404dn",
  },
  {
    nomeUsuario: "Rafael Oliveira",
    emailUsuario: "rafael.oliveira@example.com",
    equipamento: "Leitor de Código Zebra DS2208",
  },
];

export default function Emprestimos() {
  return (
    <div>
      <div
        className={
          "animate-appearance shadow-lg mt-4 flow-root bg-white px-4 py-4 rounded-lg"
        }
      >
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle">
            <Table data={emprestimosMock} />
          </div>
        </div>
      </div>
    </div>
  );
}
