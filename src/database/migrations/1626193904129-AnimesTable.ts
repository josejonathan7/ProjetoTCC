import { MigrationInterface, QueryRunner, Table} from "typeorm";
// await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

export class AnimesTable1626193904129 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "tb_animes",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "link",
                        type: "varchar"
                    },
                    {
                        name: "image",
                        type: "varchar"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tb_animes")
        //await queryRunner.query('DROP EXTENSION "uuid-ossp"')
    }

}
