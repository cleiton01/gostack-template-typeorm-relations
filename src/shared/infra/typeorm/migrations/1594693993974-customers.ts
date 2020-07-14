import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class customers1594693993974 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'customers',
          columns: [
            {
              name: 'id',
              type: 'varchar',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()'
            },
            {
              name: 'name',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'email',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'created_at',
              type: 'Date',
              isNullable: false,
              default: 'now()'
            },
            {
              name: 'updated_at',
              type: 'Date',
              isNullable: false,
              default: 'now()'
            },
          ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('customers');
    }

}
