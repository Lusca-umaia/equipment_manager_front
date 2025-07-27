# Equip Manager Frontend

## Descrição

O **Equip Manager Frontend** é uma aplicação web desenvolvida em **Next.js** com **TypeScript** e **React**. Esta aplicação permite o gerenciamento de usuários, equipamentos e empréstimos, oferecendo uma interface amigável para administradores e usuários. Os administradores podem realizar login, cadastrar e gerenciar equipamentos e usuários, além de controlar/realizar empréstimos. Usuários podem visualizar seus empréstimos por meio de tokem privado (que é direcionado ao email quando há a realização de um empréstimo). A aplicação utiliza componentes reutilizáveis, validação de formulários, e uma interface responsiva.

## Tecnologias Utilizadas

- **Next.js**: Framework React para renderização server-side e geração de sites estáticos.
- **TypeScript**: Tipagem estática para maior robustez do código.
- **React**: Biblioteca para construção de interfaces de usuário.
- **Tailwind CSS**: Framework CSS para estilização.
- **Zod**: Validação de dados de formulários.
- **Axios**: Para chamadas HTTP à API.
- **Headless UI**: Componentes de interface acessíveis e sem estilo pré-definido.
- **IMask e React-IMask**: Máscaras para inputs (ex.: CPF, telefone).
- **JS-Cookie**: Gerenciamento de cookies no navegador.
- **React Icons**: Ícones para a interface.
- **SweetAlert2**: Modais e alertas personalizados.
- **ESLint**: Ferramenta para linting e padronização de código.
- **Prettier**: Formatador de código para consistência.

## Pré-requisitos

- **Node.js** (v18 ou superior)
- **NPM** (v8 ou superior)
- Backend **Equip Manager Backend** rodando em `http://localhost:8080` (depende da definição do .env)
- Um navegador web moderno
- Um editor de código (como VS Code)

## Instalação

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/Lusca-umaia/equipment_manager_front
   cd equipment_manager_front
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:

   Crie um arquivo `.env` na raiz do projeto com as variáveis necessárias, como a URL do backend. Exemplo:

   ```env
   NEXT_PUBLIC_API_BASE_URL='http://localhost:8080'
   ```

   - `NEXT_PUBLIC_API_URL`: URL base da API do backend.

4. **Certifique-se de que o backend está rodando**:

   Inicie o backend (`equipmentmanager`) antes de rodar o frontend para garantir que as chamadas à API funcionem corretamente.

## Executando o Projeto

1. **Modo de desenvolvimento**:

   ```bash
   npm run dev
   ```

   O servidor será iniciado em `http://localhost:3000` (ou outra porta configurada no `next.config.ts`).

## Estrutura do Projeto

A estrutura do projeto está organizada da seguinte forma:

```plaintext
web-front/
├── public/                             # Arquivos estáticos
├── src/
│   ├── @types/                        # Definições de tipos TypeScript
│   │   ├── emprestimo/index.ts        # Tipos para empréstimos
│   │   ├── equipamento/index.ts       # Tipos para equipamentos
│   │   ├── profile/index.ts           # Tipos para perfil de administrador
│   │   └── usuario/index.ts           # Tipos para usuários
│   ├── app/                           # Estrutura de rotas do Next.js (App Router)
│   │   ├── (private)/                 # Rotas protegidas (requerem autenticação)
│   │   │   ├── (emprestimos)/         # Rotas relacionadas a empréstimos
│   │   │   │   ├── create-emprestimo/page.tsx # Página para criar empréstimo
│   │   │   │   ├── emprestimo/[id]/page.tsx   # Página de detalhes de um empréstimo (realizar devolução também)
│   │   │   │   ├── list-emprestimos/          # Página para listar empréstimos
│   │   │   │   │   ├── components/EmprestimosTable.tsx # Tabela de empréstimos
│   │   │   │   │   └── page.tsx               # Página de listagem
│   │   │   │   └── utils/index.ts             # Utilitários para empréstimos
│   │   │   ├── (equipamentos)/                # Rotas relacionadas a equipamentos
│   │   │   │   ├── create-equipamento/page.tsx # Página para criar equipamento
│   │   │   │   ├── equipamento/[id]/page.tsx  # Página de detalhes de um equipamento (editar e excluir também)
│   │   │   │   ├── list-equipamentos/         # Página para listar equipamentos
│   │   │   │   │   ├── components/EquipamentosTable.tsx # Tabela de equipamentos
│   │   │   │   │   └── page.tsx               # Página de listagem
│   │   │   │   └── utils/index.ts             # Utilitários para equipamentos
│   │   │   ├── (usuarios)/                    # Rotas relacionadas a usuários
│   │   │   │   ├── create-usuario/page.tsx    # Página para criar usuário
│   │   │   │   ├── list-usuarios/             # Página para listar usuários
│   │   │   │   │   ├── components/UsuarioTable.tsx # Tabela de usuários
│   │   │   │   │   └── page.tsx               # Página de listagem
│   │   │   │   ├── usuario/[id]/page.tsx      # Página de detalhes de um usuário (excluir e editar também)
│   │   │   │   └── utils/index.ts             # Utilitários para usuários
│   │   │   └── layout.tsx                     # Layout para rotas privadas
│   │   ├── (public)/                         # Rotas públicas (sem autenticação)
│   │   │   ├── login/page.tsx                 # Página de login
│   │   │   └── register/page.tsx              # Página de registro
│   │   ├── (token)/                          # Rotas para usuários com token
│   │   │   ├── usuario-emprestimo/[privateToken]/[idEmprestimo]/page.tsx # Detalhes de um empréstimo obtido a partir do token do usuário
│   │   │   ├── usuario-emprestimos/[privateToken]/                     # Lista de empréstimos obtidos a partir do token do usuário
│   │   │   │   ├── components/EmprestimosTable.tsx                     # Tabela de empréstimos
│   │   │   │   └── page.tsx                                           # Página de listagem
│   │   │   └── layout.tsx                                             # Layout para rotas com token
│   │   ├── utils/functions.ts                 # Funções utilitárias gerais
│   │   ├── favicon.ico                        # Ícone da aplicação
│   │   ├── globals.css                        # Estilos globais
│   │   ├── layout.tsx                         # Layout raiz da aplicação
│   │   └── page.tsx                           # Página inicial (landing page)
│   ├── components/                            # Componentes React reutilizáveis
│   │   ├── LandingPage/                      # Componentes da página inicial
│   │   │   ├── Footer.tsx                    # Rodapé
│   │   │   ├── Functionalities.tsx           # Seção de funcionalidades
│   │   │   ├── Navbar.tsx                    # Barra de navegação
│   │   │   ├── Product.tsx                   # Seção de descrição do produto
│   │   │   └── Technologies.tsx              # Seção de tecnologias usadas
│   │   └── UI/                               # Componentes de interface
│   │   │   ├── Actions/Actions.tsx           # Ações (botões)
│   │   │   ├── Button/Button.tsx             # Componente de botão
│   │   │   ├── EmptyState/EmptyState.tsx     # Componente para estado vazio
│   │   │   ├── FormInput/FormInput.tsx       # Componente de input de formulário
│   │   │   ├── Header/Header.tsx             # Cabeçalho - componente presente na maioria das rotas
│   │   │   ├── InformationBox/InformationBox.tsx # Caixa de informações
│   │   │   ├── Loading/Loading.tsx           # Componente de carregamento
│   │   │   ├── Navbar/                      # Componentes de navegação
│   │   │   │   ├── sidebar/                 # Sidebar
│   │   │   │   │   ├── Sidebar.tsx          # Sidebar genérica
│   │   │   │   │   ├── SidebarDesktop.tsx   # Sidebar para desktop
│   │   │   │   │   └── SidebarMobile.tsx    # Sidebar para mobile
│   │   │   │   ├── topbar/                 # Topbar
│   │   │   │   │   ├── Dropdown.tsx         # Menu dropdown
│   │   │   │   │   └── Topbar.tsx           # Barra superior
│   │   │   │   └── Navbar.tsx               # Componente de navegação principal
│   │   │   ├── RedirectionBack/RedirectionBack.tsx # Botão de voltar
│   │   │   ├── Select/Select.tsx            # Componente de seleção
│   │   │   ├── StatusLoan/StatusLoan.tsx    # Componente para status de empréstimo
│   │   │   └── Table/                      # Componentes de tabela
│   │   │   │   ├── index.tsx               # Exportação dos componentes de tabela
│   │   │   │   ├── TableBody.tsx           # Corpo da tabela
│   │   │   │   ├── TableHead.tsx           # Cabeçalho da tabela
│   │   │   │   ├── TableItem.tsx           # Item de tabela
│   │   │   │   ├── TableRoot.tsx           # Raiz da tabela
│   │   │   │   └── TableRow.tsx            # Linha da tabela
│   ├── hooks/                              # Hooks personalizados
│   │   └── useFormSubmit/index.ts          # Hook para centralizar a lógica dos formulários
│   ├── services/                           # Serviços para chamadas à API
│   │   ├── auth/                          # Serviços de autenticação
│   │   │   ├── login.ts                   # Login de administradores
│   │   │   ├── logout.ts                  # Logout
│   │   │   ├── profile.ts                 # Obter perfil do administrador
│   │   │   └── register.ts                # Registro de administradores
│   │   ├── emprestimos/                   # Serviços para empréstimos
│   │   │   ├── getEmprestimos.ts          # Listar empréstimos
│   │   │   ├── getEmprestimosComToken.ts  # Listar empréstimos por token
│   │   │   ├── realizarDevolucao.ts       # Realizar devolução
│   │   │   └── realizarEmprestimo.ts      # Criar empréstimo
│   │   ├── equipamentos/                  # Serviços para equipamentos
│   │   │   ├── createEquipamento.ts       # Criar equipamento
│   │   │   ├── deleteEquipamento.ts       # Excluir equipamento
│   │   │   ├── editEquipamento.ts         # Editar equipamento
│   │   │   └── getEquipamentos.ts         # Listar equipamentos
│   │   ├── usuarios/                      # Serviços para usuários
│   │   │   ├── createUsuario.ts           # Criar usuário
│   │   │   ├── deleteUsuario.ts           # Excluir usuário
│   │   │   ├── editUsuario.ts             # Editar usuário
│   │   │   └── getUsuarios.ts             # Listar usuários
│   │   └── api.ts                         # Configuração da API (ex.: Axios)
│   └── middleware.ts                      # Middleware do Next.js para autenticação
├── eslint.config.mjs                      # Configuração do ESLint
├── next.config.ts                         # Configuração do Next.js
├── package-lock.json                      # Lockfile das dependências
├── package.json                           # Dependências e scripts
├── postcss.config.mjs                     # Configuração do PostCSS (Tailwind CSS)
├── README.md                              # Documentação do projeto
├── tsconfig.json                          # Configuração do TypeScript
├── .gitignore                             # Arquivos e pastas ignorados pelo Git
└── .prettierrc                            # Configuração do Prettier
```

## Páginas Principais

1. **Públicas**:

   - `/login`: Página de login para administradores.
   - `/register`: Página de registro de administradores.
   - `/`: Landing page com informações sobre o produto, funcionalidades e tecnologias.

2. **Privadas (requerem autenticação)**:

   - `/create-emprestimo`: Criar um novo empréstimo.
   - `/emprestimo/[id]`: Detalhes de um empréstimo específico, além de poder realizar a devolução do equipamento.
   - `/list-emprestimos`: Listagem de todos os empréstimos.
   - `/create-equipamento`: Criar um novo equipamento.
   - `/equipamento/[id]`: Detalhes de um equipamento específico, além de poder realizar a edição e a exclusão do equipamento.
   - `/list-equipamentos`: Listagem de todos os equipamentos.
   - `/create-usuario`: Criar um novo usuário.
   - `/usuario/[id]`: Detalhes de um usuário específico, além de poder realizar a edição e a exclusão do usuário.
   - `/list-usuarios`: Listagem de todos os usuários.

3. **Acessíveis por privateToken** - rotas que são acessíveis aos usuários que estão com algum equipamento emprestado:
   - `/usuario-emprestimos/[privateToken]`: Listagem de empréstimos de um usuário via token.
   - `/usuario-emprestimo/[privateToken]/[idEmprestimo]`: Detalhes de um empréstimo específico via token.
