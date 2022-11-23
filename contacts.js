const fs = require("fs/promises");
const path = require("path");

// import { nanoid } from 'nanoid'
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "./db/contacts.json");

async function getContacts() {
    const contacts = await fs.readFile(contactsPath);
    const parsedContacts = JSON.parse(contacts);
    return parsedContacts;
}

async function getContactById(contactId) {
    const contactsById = String(contactId);
    const contacts = await getContacts();
    const contact = contacts.find((contact) => contact.id === contactsById);

    if (!contact) {
        return null;
    }

    return contact;
}

async function removeContact(contactId) {
    const contactsById = String(contactId);
    const contacts = await getContacts();

    const index = contacts.findIndex((contact) => contact.id === contactsById);
    if (index === -1) {
        return null;
    }

    const [removedContact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removedContact;
}

async function addContact(name, email, phone) {
    if (!name) {
        return "\x1B[31m name is required";
    }
    if (!email) {
        return "\x1B[31m email is required";
    }
    if (!phone) {
        return "\x1B[31m phone is required";
    }
    const contacts = await getContacts();

    const newContact = { id: nanoid(), name, email, phone: String(phone) };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}


module.exports = { getContacts, getContactById, removeContact, addContact };