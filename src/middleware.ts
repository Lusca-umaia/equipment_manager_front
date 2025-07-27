import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/create-emprestimo",
    "/emprestimo",
    "/list-emprestimos",
    "/create-equipamento",
    "/equipamento",
    "/list-equipamentos",
    "/create-usuario",
    "/list-usuarios",
    "/usuario",
  ],
};
