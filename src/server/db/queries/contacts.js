const knex = require('../connection');

function getAllContacts() {
  return knex('contacts')
  .select('name', 'phone');
}

function getSingleContact(name) {
  return knex('contacts')
  .select('name', 'phone')
  .whereRaw('LOWER("name") = ?', name)
}

function addContact(contact) {
  return knex('contacts')
  .insert(contact)
  .returning('*');
}

function updateContact(name) {
  return knex('contacts')
  .update(contact)
  .whereRaw('LOWER("name") = ?', name)
  .returning('name', 'phone');
}

function deleteContact(id) {
  return knex('contacts')
  .del()
  .where({ id: parseInt(id) })
  .returning('*');
}

module.exports = {
  getAllContacts,
  getSingleContact,
  addContact,
  updateContact,
  deleteContact
};
