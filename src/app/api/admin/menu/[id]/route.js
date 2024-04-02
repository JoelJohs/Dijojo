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
