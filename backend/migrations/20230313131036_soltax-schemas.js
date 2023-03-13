exports.up = function(knex) {
    return Promise.all([
      knex.schema.createTable('brands', function(table) {
        table.increments('id').primary();
        table.string('brand_name');
      }),
      knex.schema.createTable('years', function(table) {
        table.increments('id').primary();
        table.integer('year');
      }),
      knex.schema.createTable('models', function(table) {
        table.increments('id').primary();
        table.integer('brand_id').unsigned().references('id').inTable('brands');
        table.string('model_name');
        table.integer('year_id').unsigned().references('id').inTable('years');
      }),
      knex.schema.createTable('versions', function(table) {
        table.increments('id').primary();
        table.integer('model_id').unsigned().references('id').inTable('models');
        table.string('version_name');
      }),
      knex.schema.createTable('tax_import', function(table) {
        table.increments('id').primary();
        table.string('country');
        table.boolean('acuerdo');
        table.decimal('invoice_amount', 10, 2);
        table.decimal('flete_amount', 10, 2);
        table.decimal('insurance_amount', 10, 2);
      }),
      knex.schema.createTable('cars', function(table) {
        table.increments('id').primary();
        table.integer('brand_id').unsigned().references('id').inTable('brands');
        table.integer('model_id').unsigned().references('id').inTable('models');
        table.integer('version_id').unsigned().references('id').inTable('versions');
        table.integer('year_id').unsigned().references('id').inTable('years');
        table.decimal('tax_import', 10, 2);
        table.integer('tax_import_id').unsigned().references('id').inTable('tax_import');
      })
    ]);
  };
  
  exports.down = function(knex) {
    return Promise.all([
      knex.schema.dropTable('cars'),
      knex.schema.dropTable('versions'),
      knex.schema.dropTable('models'),
      knex.schema.dropTable('years'),
      knex.schema.dropTable('brands'),
      knex.schema.dropTable('tax_import')
    ]);
  };
  