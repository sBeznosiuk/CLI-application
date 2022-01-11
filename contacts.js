const path = require('path');
const fs = require('fs').promises;

function listContacts() {
  fs.readFile('./db/contacts.json', 'utf8')
    .then(data => console.table(JSON.parse(data)))
    .catch(err => console.error(err));
}

function getContactById(contactId) {
  fs.readFile('./db/contacts.json', 'utf-8')
    .then(data => {
      const contact = JSON.parse(data).find(
        i => i.id == contactId
      );
      console.table(contact);
    })
    .catch(err => console.error(err));
}

async function addContact(name, email, phone) {
  const data = await fs.readFile(
    './db/contacts.json',
    'utf8'
  );

  try {
    const newData = JSON.stringify([
      ...JSON.parse(data),
      {
        id: JSON.parse(data).length + 1,
        name,
        email,
        phone,
      },
    ]);

    fs.writeFile('./db/contacts.json', newData, 'utf8');
    console.log(newData);
  } catch (err) {
    console.log('err: ', err);
  }
}

async function removeContact(contactId) {
  const data = await fs.readFile(
    './db/contacts.json',
    'utf8'
  );

  try {
    const myData = JSON.parse(data);
    const newData = JSON.stringify(
      myData.filter(i => i.id != contactId)
    );

    fs.writeFile('./db/contacts.json', newData, 'utf8');

    console.log(newData);
  } catch (error) {
    console.log('Error: ', error);
  }
}
module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
