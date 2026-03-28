import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";

// las nuevas versiones de prisma no permiten usar el datasource url directamente, toca usar https://www.prisma.io/docs/orm/reference/prisma-client-reference
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      // datasources: {
      //   db: {
      //     url: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/dane",
      //   },
      // },
      adapter: adapter,
    });
  }
  async onModuleInit() {
    await this.$connect();
  }
}