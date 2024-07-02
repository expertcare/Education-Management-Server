import Contact from "../models/contactModel.js";

// Controller for handling CRUD operations on contact information

// Get all contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new contact
const addContact = async (req, res) => {
  const contact = new Contact(req.body);
  try {
    const newContact = await contact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mark a contact as responded

const markContactAsResponded = async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    contact.responded = true;
    await contact.save();

    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { getAllContacts, addContact, markContactAsResponded };
