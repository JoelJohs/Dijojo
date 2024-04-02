const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Crear roles
  const adminRole = await prisma.rol.create({
    data: {
      name: "admin",
    },
  });

  const waiterRole = await prisma.rol.create({
    data: {
      name: "waiter",
    },
  });

  const cookRole = await prisma.rol.create({
    data: {
      name: "cook",
    },
  });

  // Crear usuarios
  const adminUser = await prisma.user.create({
    data: {
      name: "admin",
      password: "admin1",
      rolId: adminRole.id,
    },
  });

  const waiterUser = await prisma.user.create({
    data: {
      name: "waiter",
      password: "waiter1",
      rolId: waiterRole.id,
    },
  });

  const cookUser = await prisma.user.create({
    data: {
      name: "cook",
      password: "cook1",
      rolId: cookRole.id,
    },
  });

  // Crear secciones
  const comidaSection = await prisma.section.create({
    data: {
      name: "Comida",
    },
  });

  const infantilSection = await prisma.section.create({
    data: {
      name: "Infantil",
    },
  });

  const bebidasSection = await prisma.section.create({
    data: {
      name: "Bebidas",
    },
  });

  // Crear menús
  const comidaMenu1 = await prisma.menu.create({
    data: {
      name: "Plato de carne",
      description: "Delicioso plato de carne",
      price: 15.99,
      sectionId: comidaSection.id,
    },
  });

  const comidaMenu2 = await prisma.menu.create({
    data: {
      name: "Ensalada César",
      description: "Clásica ensalada César",
      price: 9.99,
      sectionId: comidaSection.id,
    },
  });

  const infantilMenu1 = await prisma.menu.create({
    data: {
      name: "Hamburguesa para niños",
      description: "Pequeña hamburguesa para los más pequeños",
      price: 6.99,
      sectionId: infantilSection.id,
    },
  });

  const infantilMenu2 = await prisma.menu.create({
    data: {
      name: "Papas fritas",
      description: "Crujientes papas fritas",
      price: 4.99,
      sectionId: infantilSection.id,
    },
  });

  const bebidasMenu1 = await prisma.menu.create({
    data: {
      name: "Refresco",
      description: "Refresco de cola",
      price: 2.49,
      sectionId: bebidasSection.id,
    },
  });

  const bebidasMenu2 = await prisma.menu.create({
    data: {
      name: "Jugo de naranja",
      description: "Refrescante jugo de naranja natural",
      price: 3.49,
      sectionId: bebidasSection.id,
    },
  });

  console.log("Semilla creada con éxito");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
