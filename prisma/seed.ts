import { PrismaClient, Role, User } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const createRoles: Role[] = await prisma.role.createManyAndReturn({
    data: [
      { title: 'admin', description: 'Admin' },
      { title: 'customer', description: 'Customer' },
    ],
  });

  console.log('Seed Roles --->', createRoles);

  const createdRoles: Role[] = createRoles;
  const roles = {
    admin: (createdRoles.find(({ title }) => title === 'admin') || {}).id,
    customer: (createdRoles.find(({ title }) => title === 'customer') || {}).id,
  };

  const alice: User = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      name: 'Alice',
      roleId: roles.admin,
    },
  });
  const bob: User = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      name: 'Bob',
      roleId: roles.customer,
    },
  });
  const jane: User = await prisma.user.upsert({
    where: { email: 'jane@prisma.io' },
    update: {},
    create: {
      email: 'jane@prisma.io',
      name: 'Jane',
      roleId: roles.customer,
    },
  });
  console.log('Seed Users --->', { alice, bob, jane });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
