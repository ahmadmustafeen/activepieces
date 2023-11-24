import { MigrationInterface, QueryRunner } from 'typeorm'

export class Category1700826437977 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'CREATE TABLE "valuehub_category" ( ' +
            '"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,' +
            '"title" VARCHAR(255) NOT NULL )',
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "valuehub_category"')
    }
}
