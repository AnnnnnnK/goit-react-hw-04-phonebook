import { useEffect, useState } from 'react';
import ContactForm from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import data from '../components/contacts.json';

import React from 'react';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const localData = localStorage.getItem('contacts');

    if (localData && JSON.parse(localData).length >= 0) {
      setContacts(JSON.parse(localData));
    } else {
      setContacts(data);
    }
  }, []);

  useEffect(() => {
    setContacts(prevContacts => {
      localStorage.setItem('contacts', JSON.stringify(contacts));
      return prevContacts;
    });
  }, [contacts]);

  const addNewContact = newContact => {
    const nameIsAdded = contacts.some(
      ({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (nameIsAdded) {
      Notify.warning('Name is already added.');
    } else {
      // setContacts(prevContacts => [...prevContacts, newContact]);
      setContacts(prev => [...prev, { ...newContact, id: nanoid() }]);
    }
  };

  // const filteredContacts = () => {
  //   const normalizedFilter = filter.toLowerCase();

  //   return contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(normalizedFilter)
  //   );
  // };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const onRemoveContact = contactId => {
    setContacts(prevContacts => {
      const updatedContacts = prevContacts.filter(
        contact => contact.id !== contactId
      );
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
      return updatedContacts;
    });
  };

  const shownContacts = filter
    ? contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      )
    : contacts;

  return (
    <>
      <ContactForm addNewContact={addNewContact} />
      {contacts.length > 0 && <Filter value={filter} onChange={changeFilter} />}
      {contacts.length > 0 && (
        <ContactsList contacts={shownContacts} handleDelete={onRemoveContact} />
      )}
    </>
  );
};

export default App;
