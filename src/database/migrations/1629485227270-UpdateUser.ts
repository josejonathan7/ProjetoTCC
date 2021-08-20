import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateUser1629485227270 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE tb_users ADD COLUMN admin boolean DEFAULT false`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE tb_users DROP COLUMN admin`)
    }

}
