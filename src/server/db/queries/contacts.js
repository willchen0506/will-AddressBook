const knex = require('../connection');

function getAllContacts(user) {
  return knex('contacts')
  .select('name', 'phone')
  .whereRaw('LOWER("user") = ?', user);
}

function getSingleContact(user, name) {
  return knex('contacts')
  .select('phone')
  .whereRaw('LOWER("user") = ? AND LOWER("name") = ? ', [user, name]);
}

function addContact(user, contact) {
  contact.user = user;
  return knex('contacts')
  .insert(contact)
  .returning(['name', 'phone']);
}

function updateContact(user, name, contact) {
  contact.user = user;
  return knex('contacts')
  .update(contact)
  .whereRaw('LOWER("name") = ?', name)
  .returning(['name', 'phone']);
}

function deleteContact(user, name) {

  return knex('contacts')
  .del()
  .whereRaw('LOWER("user") = ? AND LOWER("name") = ? ', [user, name])
  .returning(['name', 'phone']);
}

module.exports = {
  getAllContacts,
  getSingleContact,
  addContact,
  updateContact,
  deleteContact
};
