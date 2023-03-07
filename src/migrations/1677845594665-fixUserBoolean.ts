import { MigrationInterface, QueryRunner } from "typeorm";

export class fixUserBoolean1677845594665 implements MigrationInterface {
    name = 'fixUserBoolean1677845594665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "admin" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "admin" DROP DEFAULT`);
    }

}
