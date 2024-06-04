import { PrismaClient } from '@prisma/client';
import { resolveSoa } from 'dns';
import { throwError } from 'rxjs';
const prisma = new PrismaClient();
async function main() {
  const newRoles = await prisma.role.createManyAndReturn({
    data: [
      { title: 'admin', description: 'Admin' },
      { title: 'customer', description: 'Customer' },
    ],
  });

  const roles = {
    admin: (newRoles.find(({ title }) => title === 'admin') || {}).cuid || null,
    customer:
      (newRoles.find(({ title }) => title === 'customer') || {}).cuid || null,
  };

  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      name: 'Alice',
      roleId: roles.admin,
    },
  });
  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      name: 'Bob',
      roleId: roles.customer,
    },
  });
  const jane = await prisma.user.upsert({
    where: { email: 'jane@prisma.io' },
    update: {},
    create: {
      email: 'jane@prisma.io',
      name: 'Jane',
      roleId: roles.customer,
    },
  });
  console.log({ alice, bob, jane });
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
