import { NextResponse } from "next/server";

import { prisma } from "@/libs/prisma";

export async function GET() {
  const menu = await prisma.menu.findMany();

  return NextResponse.json(menu);
}

export async function POST(request) {
  const { name, description, price, sectionId } = await request.json();
  const newFood = await prisma.menu.create({
    data: {
      name,
      description,
      price,
      sectionId,
    },
  });

  return NextResponse.json(newFood);
}
