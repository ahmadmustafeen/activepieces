import { MigrationInterface, QueryRunner } from 'typeorm'

export class Goal1700826433823 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'CREATE TABLE "valuehub_goal" ( "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ' +
            '"title" VARCHAR(255) NOT NULL, ' +
            '"createdBy" VARCHAR(255) NOT NULL, ' +
            '"description" JSON, ' +
            '"category" JSON,' +
            '"createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,' +
            '"updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP)',
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "valuehub_goal"')
    }
}
