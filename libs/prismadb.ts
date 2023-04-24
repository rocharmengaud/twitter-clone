import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

// This sets the globalThis.prisma variable to the client instance if the NODE_ENV is not production.
// This allows the prisma client to be reused across requests during development and testing.
// Preventing next.js hot reload to create multiple instances of Prisma client with the globalThis variable
const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;

export default client;
