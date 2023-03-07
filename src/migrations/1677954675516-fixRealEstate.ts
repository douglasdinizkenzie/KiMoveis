import { MigrationInterface, QueryRunner } from "typeorm";

export class fixRealEstate1677954675516 implements MigrationInterface {
    name = 'fixRealEstate1677954675516'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_estate" ALTER COLUMN "sold" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_estate" ALTER COLUMN "sold" DROP NOT NULL`);
    }

}
