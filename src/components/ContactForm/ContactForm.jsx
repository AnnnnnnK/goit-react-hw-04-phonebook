import css from 'components/ContactForm/ContactForm.module.css';
import { useState } from 'react';

const ContactForm = ({ addNewContact }) => {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    addNewContact({ name, number });

    setName('');
    setNumber('');
  };

  return (
    <>
      <h1 className={css.title}>Phonebook</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.label}>Name: </label>
        <input
          className={css.input}
          onChange={handleChange}
          type="text"
          name="name"
          value={name}
          required
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        />

        <label className={css.label}>Number: </label>
        <input
          className={css.input}
          onChange={handleChange}
          type="tel"
          name="number"
          value={number}
          required
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
        />
        <button className={css.btn} type="submit">
          Add contact
        </button>
      </form>
    </>
  );
};

export default ContactForm;
