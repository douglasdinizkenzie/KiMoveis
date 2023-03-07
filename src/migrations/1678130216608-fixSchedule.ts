import { MigrationInterface, QueryRunner } from "typeorm";

export class fixSchedule1678130216608 implements MigrationInterface {
    name = 'fixSchedule1678130216608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shedules_users_properties" DROP CONSTRAINT "FK_31ef844a087e38213605137b6d6"`);
        await queryRunner.query(`ALTER TABLE "shedules_users_properties" RENAME COLUMN "realEstatedId" TO "realEstateId"`);
        await queryRunner.query(`ALTER TABLE "shedules_users_properties" ADD CONSTRAINT "FK_3ffdf969781b335000d487caec1" FOREIGN KEY ("realEstateId") REFERENCES "real_estate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shedules_users_properties" DROP CONSTRAINT "FK_3ffdf969781b335000d487caec1"`);
        await queryRunner.query(`ALTER TABLE "shedules_users_properties" RENAME COLUMN "realEstateId" TO "realEstatedId"`);
        await queryRunner.query(`ALTER TABLE "shedules_users_properties" ADD CONSTRAINT "FK_31ef844a087e38213605137b6d6" FOREIGN KEY ("realEstatedId") REFERENCES "real_estate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
