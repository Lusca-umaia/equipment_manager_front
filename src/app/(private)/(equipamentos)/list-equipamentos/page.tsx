"use client";

import Table from "./components/EquipamentosTable";

const equipamentosMock: {
  nome: string;
  marca: string;
  modelo: string;
  categoria: string;
}[] = [
  {
    nome: "Notebook Administrativo",
    marca: "Dell",
    modelo: "Latitude 5420",
    categoria: "Informática",
  },
  {
    nome: "Impressora Financeiro",
    marca: "HP",
    modelo: "LaserJet Pro M404dn",
    categoria: "Impressora",
  },
  {
    nome: "Servidor Principal",
    marca: "Lenovo",
    modelo: "ThinkSystem SR650",
    categoria: "Servidor",
  },
  {
    nome: "Projetor Sala de Reunião",
    marca: "Epson",
    modelo: "PowerLite X49",
    categoria: "Audiovisual",
  },
  {
    nome: "Switch Rack 01",
    marca: "Cisco",
    modelo: "Catalyst 2960-X",
    categoria: "Rede",
  },
  {
    nome: "Tablet RH",
    marca: "Samsung",
    modelo: "Galaxy Tab A8",
    categoria: "Mobilidade",
  },
  {
    nome: "Leitor de Código Estoque",
    marca: "Zebra",
    modelo: "DS2208",
    categoria: "Periférico",
  },
  {
    nome: "Monitor Financeiro",
    marca: "LG",
    modelo: "24MP400",
    categoria: "Informática",
  },
  {
    nome: "Nobreak Backup 01",
    marca: "APC",
    modelo: "Back-UPS 1200VA",
    categoria: "Energia",
  },
  {
    nome: "Scanner Arquivo Morto",
    marca: "Brother",
    modelo: "ADS-2200",
    categoria: "Digitalização",
  },
];

export default function Equipamentos() {
  return (
    <div>
      <div
        className={
          "animate-appearance shadow-lg mt-4 flow-root bg-white px-4 py-4 rounded-lg"
        }
      >
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle">
            <Table data={equipamentosMock} />
          </div>
        </div>
      </div>
    </div>
  );
}
