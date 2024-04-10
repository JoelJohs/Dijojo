import { NextResponse } from "next/server";

import { prisma } from "@/libs/prisma";

export async function GET(request, { params }) {
  const food = await prisma.menu.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  return NextResponse.json(food);
}

export async function PUT(request, { params }) {
  const data = await request.json();

  await prisma.menu.update({
    where: {
      id: Number(params.id),
    },
    data: data,
  });

  return NextResponse.json(data);
}

export async function DELETE(request, { params }) {
  try {
    const foodRemoved = await prisma.menu.delete({
      where: {
        id: Number(params.id),
      },
    });

    return NextResponse.json(foodRemoved);
  } catch (error) {
    return NextResponse.json({
      message: "Platillo no encontrado",
      error: error.message,
    });
  }
}
