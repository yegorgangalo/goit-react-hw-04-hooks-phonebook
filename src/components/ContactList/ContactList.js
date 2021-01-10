import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import s from './ContactList.module.css';
import ContactItem from '../ContactItem';

class ContactList extends PureComponent {
    static propTypes = {
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

    filterContacts = () => {
        const {contacts, filter} = this.props;
        return contacts.filter(contact =>
           Object.values(contact)
            .some(val => val.toString().toLowerCase().includes(filter))
        );
    }

    render() {
        const filteredContacts = this.filterContacts();

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
}

export default ContactList;