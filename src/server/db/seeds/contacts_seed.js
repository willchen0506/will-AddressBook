exports.seed = (knex, Promise) => {
  return knex('contacts').del()
  .then(() => {
    return knex('contacts').insert({
      name: 'Will',
      phone: '408.123.1234',
      user: 'myself'
    });
  })
 .then(() => {
    return knex('contacts').insert({
      name: 'Andy',
      phone: '432.123.1234',
      user: 'another'
    });
  });
};
