"use client";

import UsuarioTable from "./components/UsuarioTable";

interface Usuario {
  id: number;
  nome: string;
  telefone: string;
  logradouro?: string;
  cidade: string;
  estado: string;
  numero: number;
  endereco: string;
  email: string;
  cep: string;
}

const mockData: Usuario[] = [
  {
    id: 1,
    nome: "Lucas Maia",
    telefone: "(99)9999-9999",
    logradouro: "Boa Vista-Castelão",
    cidade: "Fortaleza",
    estado: "CE",
    numero: 50,
    endereco: "Fortaleza - CE",
    email: "lucas@example.com",
    cep: "60743-540",
  },
  {
    id: 2,
    nome: "Levy Santos",
    telefone: "(99)9999-9992",
    logradouro: "Boa Vista-Castelão",
    cidade: "Fortaleza",
    estado: "CE",
    numero: 25,
    endereco: "Fortaleza - CE",
    email: "levy@example.com",
    cep: "60743-540",
  },
  {
    id: 3,
    nome: "Marta Silva",
    telefone: "(99)9999-9991",
    logradouro: "Boa Vista-Castelão",
    cidade: "Fortaleza",
    estado: "CE",
    numero: 30,
    endereco: "Fortaleza - CE",
    email: "marta@example.com",
    cep: "60743-540",
  },
  {
    id: 4,
    nome: "Carlos Souza",
    telefone: "(88)9888-8888",
    logradouro: "Rua dos Expedicionários",
    cidade: "Juazeiro do Norte",
    estado: "CE",
    numero: 120,
    endereco: "Juazeiro do Norte - CE",
    email: "carlos@example.com",
    cep: "63010-400",
  },
  {
    id: 5,
    nome: "Ana Beatriz",
    telefone: "(85)9811-2233",
    logradouro: "Av. Santos Dumont",
    cidade: "Fortaleza",
    estado: "CE",
    numero: 999,
    endereco: "Fortaleza - CE",
    email: "ana@example.com",
    cep: "60150-161",
  },
  {
    id: 6,
    nome: "Rafael Oliveira",
    telefone: "(85)9911-2244",
    logradouro: "Rua das Flores",
    cidade: "Maracanaú",
    estado: "CE",
    numero: 303,
    endereco: "Maracanaú - CE",
    email: "rafael@example.com",
    cep: "61900-200",
  },
  {
    id: 7,
    nome: "Juliana Lima",
    telefone: "(88)9987-5642",
    logradouro: "Rua Central",
    cidade: "Sobral",
    estado: "CE",
    numero: 85,
    endereco: "Sobral - CE",
    email: "juliana@example.com",
    cep: "62010-000",
  },
  {
    id: 8,
    nome: "Felipe Costa",
    telefone: "(85)9822-4466",
    logradouro: "Rua do Comércio",
    cidade: "Fortaleza",
    estado: "CE",
    numero: 452,
    endereco: "Fortaleza - CE",
    email: "felipe@example.com",
    cep: "60810-345",
  },
  {
    id: 9,
    nome: "Tatiane Mendes",
    telefone: "(85)9833-7788",
    logradouro: "Av. Perimetral",
    cidade: "Caucaia",
    estado: "CE",
    numero: 10,
    endereco: "Caucaia - CE",
    email: "tatiane@example.com",
    cep: "61600-200",
  },
  {
    id: 10,
    nome: "Vinícius Almeida",
    telefone: "(85)9877-6655",
    logradouro: "Rua Domingos Olímpio",
    cidade: "Fortaleza",
    estado: "CE",
    numero: 567,
    endereco: "Fortaleza - CE",
    email: "vinicius@example.com",
    cep: "60040-030",
  },
];

export default function Usuarios() {
  return (
    <div>
      <div
        className={
          "animate-appearance shadow-lg mt-4 flow-root bg-white px-4 py-4 rounded-lg"
        }
      >
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle">
            <UsuarioTable data={mockData} />
          </div>
        </div>
      </div>
    </div>
  );
}
