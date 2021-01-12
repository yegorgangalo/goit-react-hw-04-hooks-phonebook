import React from 'react';
import PropTypes from 'prop-types';
import s from './ContactList.module.css';
import ContactItem from '../ContactItem';

function ContactList ({contacts, filter}) {

        const filteredContacts = contacts.filter(contact =>
           Object.values(contact)
            .some(val => val.toString().toLowerCase().includes(filter))
        );

        return (
          <ul>
          {filteredContacts.map(({ id, name, number, experience, skills }) =>
            <li className={s.item} key={id}>
              <ContactItem
                id={id}
                name={name}
                number={number}
                experience={experience}
                skills={skills}
              />
            </li>
            )}
          </ul>
        )
}

ContactList.propTypes = {
  filter: PropTypes.string.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      experience: PropTypes.string.isRequired,
      skills: PropTypes.arrayOf(PropTypes.string.isRequired),
  })),
}

export default ContactList;