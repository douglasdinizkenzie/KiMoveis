import { MigrationInterface, QueryRunner } from "typeorm";

export class alterUserAdminType1677783635074 implements MigrationInterface {
    name = 'alterUserAdminType1677783635074'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "admin" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "admin" SET DEFAULT false`);
    }

}
