// import React, { PureComponent } from 'react';
import { useState, useEffect } from 'react';
import Context from './components/Context';
import ContactFormik from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';
import Modal from './components/Modal';
import IconButton from './components/IconButton';
import { ReactComponent as CloseIcon } from './icon/close.svg';
import s from './App.module.css';

function App () {
    // static defaultProps = {
    //   contacts: [
    //     {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56', experience: 'junior', skills: ['HTML', 'CSS']},
    //     {id: 'id-2', name: 'Hermione Kline', number: '443-89-12', experience: 'middle', skills: ['HTML', 'CSS', 'JS']},
    //     {id: 'id-3', name: 'Eden Clements', number: '645-17-79', experience: 'junior', skills: ['HTML', 'SCSS']},
    //     {id: 'id-4', name: 'Annie Copeland', number: '227-91-26', experience: 'senior', skills: ['HTML', 'CSS', 'JS', 'React']},
    //     {id: 'id-5', name: 'Ann Hits', number: '227-91-46', experience: 'junior', skills: ['JS']},
    //     {id: 'id-6', name: 'Ed Clirence', number: '217-01-46', experience: 'middle', skills: ['HTML', 'CSS', 'JS']},
    //   ],
    // }

    // state = {
    //   contacts: [],
    //   filter: '',
    //   showModal: false,
    // }

    // const defaultContacts = [
    //     {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56', experience: 'junior', skills: ['HTML', 'CSS']},
    //     {id: 'id-2', name: 'Hermione Kline', number: '443-89-12', experience: 'middle', skills: ['HTML', 'CSS', 'JS']},
    //     {id: 'id-3', name: 'Eden Clements', number: '645-17-79', experience: 'junior', skills: ['HTML', 'SCSS']},
    //     {id: 'id-4', name: 'Annie Copeland', number: '227-91-26', experience: 'senior', skills: ['HTML', 'CSS', 'JS', 'React']},
    //     {id: 'id-5', name: 'Ann Hits', number: '227-91-46', experience: 'junior', skills: ['JS']},
    //     {id: 'id-6', name: 'Ed Clirence', number: '217-01-46', experience: 'middle', skills: ['HTML', 'CSS', 'JS']},
    //   ]

    const [contacts, setContacts] = useState(()=>JSON.parse(localStorage.getItem('contacts')) ?? []);
    const [filter, setFilter] = useState('');
    const [showModal, setShowModal] = useState(false);

  // useEffect(() => {
  //   const localStorageContacts = localStorage.getItem('contacts');
  //     const parsedContacts = JSON.parse(localStorageContacts);
  //     parsedContacts && setContacts(parsedContacts);
  // },[])

    useEffect(() => {
      console.log(contacts);
      // contacts!==0 && toggleModal();
      localStorage.setItem('contacts', JSON.stringify(contacts));
    },[contacts])

  // useEffect(() => {
  //   setShowModal(!showModal);
  // },[showModal])

    // componentDidMount() {
    //   const localStorageContacts = localStorage.getItem('contacts');
    //   const parsedContacts = JSON.parse(localStorageContacts);
    //   parsedContacts && this.setState({ contacts: parsedContacts });
    // }

    // componentDidUpdate(prevProps, prevState){
    //   prevState !== this.state && localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    //   prevState.contacts.length !== 0 && this.state.contacts.length > prevState.contacts.length && this.toggleModal();
    // }

  const changeFilter = ({ target: { value } }) => setFilter(value.toLowerCase());
    // changeFilter = ({ target: {name, value} }) => {
    //   this.setState({
    //     [name]: value.toLowerCase(),
    //   });
    // }

    const formSubmitHandler = (newContact) => {
      setContacts(prevState => [...prevState, newContact])
      //   this.setState((prevState) => {
      //   return {
      //     contacts: [...prevState.contacts, newContact]
      //   }
      // })
    }

    const deleteContact = (id) => {
      setContacts(prevState => prevState.filter(contact => contact.id !== id))
      // this.setState((prevState) => {
      //   const withoutDelContactArray = prevState.contacts.filter(contact => contact.id !==id)
      //   return {
      //     contacts: [...withoutDelContactArray]
      //   }
      // })
    }

    const toggleModal = () => {
      setShowModal(!showModal);
      // this.setState(({ showModal }) => ({
      //   showModal: !showModal,
      // }))
    }

    // render() {
      // const { contacts, filter, showModal } = this.state;

      return (
        <Context.Provider value={{deleteContact: deleteContact}}>
        <h1 className={s.title}>Phonebook</h1>
        <IconButton onClick={toggleModal} aria-label="Open Modal" classNames={s.iconButtonOpenModal}> Add Contact </IconButton>
        {showModal && (
        <Modal onClose={toggleModal}>
          <ContactFormik formSubmitHandler={formSubmitHandler} contacts={contacts}/>
          <IconButton onClick={toggleModal} aria-label="Close Modal" classNames={s.iconButtonCloseModal}>
              <CloseIcon width="20" height="20" />
          </IconButton>
        </Modal>)}
        <h2 className={s.title}>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList contacts={contacts} filter={filter} />
        </Context.Provider>
        )
    // }
}

export default App;
