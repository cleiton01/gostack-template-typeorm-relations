import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class ordersProducts1594694006320 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.createTable(
        new Table({
          name: 'orders_products',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'order_id',
              type: 'varchar',
            },
            {
              name: 'product_id',
              type: 'varchar',
            },
            {
              name: 'price',
              type: 'decimal(10,2)',
            },
            {
              name: 'quantity',
              type: 'int',
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
        'orders_products',
        new TableForeignKey({
          name: 'orders_products_products',
          referencedTableName: 'products',
          columnNames: ['product_id'],
          referencedColumnNames: ['id'],
        }),
      );

      await queryRunner.createForeignKey(
        'orders_products',
        new TableForeignKey({
          name: 'orders_products_orders',
          referencedTableName: 'orders',
          columnNames: ['order_id'],
          referencedColumnNames: ['id'],
        }),
      );

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.dropTable('orders_products');
    }

}
