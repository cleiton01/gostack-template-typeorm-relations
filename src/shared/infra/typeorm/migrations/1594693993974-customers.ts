import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export default class customers1594693993974 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'orders',
          columns: [
            {
              name: 'id',
              type: 'varchar',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'customer_id',
              type: 'varchar',
            },
            {
              name: 'created_at',
              type: 'timestamp with time zone',
              default: 'now()',
            },
            {
              name: 'updated_at',
              type: 'timestamp with time zone',
              default: 'now()',
            },
          ],
        }),
      );

      await queryRunner.createForeignKey(
        'orders',
        new TableForeignKey({
          name: 'orders_customers',
          referencedTableName: 'customers',
          columnNames: ['customer_id'],
          referencedColumnNames: ['id'],
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.dropTable('orders');
    }

}
