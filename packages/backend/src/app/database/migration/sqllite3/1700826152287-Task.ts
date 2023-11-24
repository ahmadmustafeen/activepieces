import { MigrationInterface, QueryRunner } from 'typeorm'

export class Task1700826152287 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'CREATE TABLE "task" ( ' +
            '"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ' +
            '"goalId" INTEGER, ' +
            '"title" VARCHAR(255) NOT NULL, ' +
            '"description" VARCHAR(255), ' +
            '"priority" VARCHAR(255), ' +
            '"complexity" INTEGER, ' +
            '"colourTag" VARCHAR(255), ' +
            '"dueDate" DATE, ' +
            '"status" VARCHAR(255), ' +
            '"type" VARCHAR(255), ' +
            '"createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,' +
            '"updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP)',
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "task"')
    }
}
