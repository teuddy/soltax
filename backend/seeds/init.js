exports.seed = function(knex) {
  return knex('brands').insert([
    { brand_name: 'Brand 1' },
    { brand_name: 'Brand 2' },
    { brand_name: 'Brand 3' },
  ])
  .then(() => {
    return knex('models').insert([
      { brand_id: 1, model_name: 'Model 1' },
      { brand_id: 1, model_name: 'Model 2' },
      { brand_id: 2, model_name: 'Model 3' },
    ]);
  })
  .then(() => {
    return knex('model_years').insert([
      { model_id: 1, year: 2010 },
      { model_id: 1, year: 2011 },
      { model_id: 2, year: 2015 },
    ]);
  })
  .then(() => {
    return knex('versions').insert([
      { model_id: 1, version_name: 'Version 1' },
      { model_id: 1, version_name: 'Version 2' },
      { model_id: 2, version_name: 'Version 3' },
    ]);
  })
  .then(() => {
    return knex('tax_import').insert([
      { country: 'Country 1', acuerdo: true, invoice_amount: 1000.50, flete_amount: 500.25, insurance_amount: 200.75 },
      { country: 'Country 2', acuerdo: false, invoice_amount: 1500.75, flete_amount: 750.50, insurance_amount: 300.25 },
      { country: 'Country 3', acuerdo: true, invoice_amount: 2000.25, flete_amount: 1000.75, insurance_amount: 400.50 },
    ]);
  })
  .then(() => {
    return knex('cars').insert([
      { brand_id: 1, model_id: 1, version_id: 1, year_id: 1, tax_import_id: 1 },
      { brand_id: 1, model_id: 1, version_id: 1, year_id: 2, tax_import_id: 2 },
      { brand_id: 2, model_id: 2, version_id: 3, year_id: 3, tax_import_id: 3 },
    ]);
  });
};
