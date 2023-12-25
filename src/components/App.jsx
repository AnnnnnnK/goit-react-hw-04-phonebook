import { useEffect, useState } from 'react';
import ContactForm from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import data from '../components/contacts.json';

import React from 'react';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  console.log(contacts);

  useEffect(() => {
    const localData = localStorage.getItem('contacts');
    if (localData && JSON.parse(localData).length > 0) {
      setContacts(() => JSON.parse(localData));
    } else setContacts(() => data);
  }, []);

  // useEffect(() => {}, [contacts]);

  const addNewContact = newContact => {
    const nameIsAdded = contacts.some(
      ({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (nameIsAdded) {
      Notify.warning('Name is already added.');
    } else {
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
    setFilter(prev => {
      prev = e.currentTarget.value;
    });
  };

  // const filterName = findName => {
  //   setFilter(() => findName);
  // };

  const onRemoveContact = contactId => {
    setContacts(contacts =>
      contacts.filter(contact => contact.id !== contactId)
    );
  };
  const shownContacts = filter
    ? contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      )
    : contacts;

  return (
    <>
      <ContactForm addNewContact={addNewContact} />
      <Filter value={filter} onChange={changeFilter} />
      {contacts.length > 0 && (
        <ContactsList contacts={shownContacts} handleDelete={onRemoveContact} />
      )}
    </>
  );
};

export default App;
