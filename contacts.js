const path = require("path");
const fs = require("fs");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// TODO: documentare fiecare funcție
function listContacts() {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.err("Can not read file!", err);
      return;
    }
    const contacts = JSON.parse(data);
    console.table(contacts);
  });
}

function getContactById(contactId) {
  if (!contactId) {
    console.err("Enter a valid Id!");
    return;
  }
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.log("Can not read file!");
      return;
    }
    const contacts = JSON.parse(data);
    if (contacts[contactId]) {
      console.table(contacts[contactId]);
    } else {
      console.log(`Not a valid Id!`);
    }
  });
}

function addContact(name, email, phone) {
  if (!name) {
    console.err("Enter a name!");
    return;
  }
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.err("Can not read file!", err);
      return;
    }
    const contacts = JSON.parse(data);
    const newContact = {
      id: String(Date.now()),
      name: name,
      email: email,
      phone: phone,
    };
    contacts.push(newContact);
    console.table(contacts);
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
      if (err) {
        console.err("Can not add contact!");
        return;
      }
      console.log("Contact added!");
    });
  });
}

function removeContact(contactId) {
  if (contactId === undefined) {
    console.err("Enter a index number!");
    return;
  }
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.log("Can not read file!");
      return;
    }
    const contacts = JSON.parse(data);
    if (!contacts[contactId]) {
      console.log(`Can not find index!`);
      return;
    }
    contacts.splice(contactId, 1);
    console.log(`Contact was deleted!`);
    console.table(contacts);
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
      if (err) {
        console.err("Can not delete contact!");
        return;
      }
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
