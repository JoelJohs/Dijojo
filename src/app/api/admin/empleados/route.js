import { NextResponse } from "next/server";

import { prisma } from "@/libs/prisma";

export async function GET() {
  const users = await prisma.user.findMany();

  return NextResponse.json(users);
}

export async function POST(request) {
  const { name, email, password, rolId } = await request.json();
  const newUser = await prisma.user.create({
    data: {
      name,
      password,
      email,
      rolId,
    },
  });

  return NextResponse.json(newUser);
}
