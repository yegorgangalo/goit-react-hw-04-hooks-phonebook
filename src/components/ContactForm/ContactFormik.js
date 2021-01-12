import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import IconButton from '../IconButton';
import s from './ContactForm.module.css';

const skillsArray = ['HTML', 'CSS', 'JS', 'SCSS', 'Git', 'React'];
const expLevel = ['junior', 'middle', 'senior'];
const defaultFormikStateValues = {
  name: '',
  number: '',
  experience: '',
  licence: false,
  skills: [],
};

function ContactFormik ({ contacts, formSubmitHandler }) {
        return <Formik
          initialValues={defaultFormikStateValues}
          validationSchema={Yup.object().shape({
            name: Yup.string().min(2, 'Too Short!').max(30, 'Too Long!').required('Required'),
            number: Yup.number().max(1000000000000, 'Too Long!').positive().integer().required('Required'),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
              const { name, number } = values;
              if(contacts.some(contact => contact.name===name || contact.number===number) ){
                alert(`Contact with such ${name} or ${number} is already in Phonebook`);
                setSubmitting(false);
                return;
              }

              formSubmitHandler({...values, id: uuidv4()});
              setSubmitting(false);
              resetForm(defaultFormikStateValues);
          }}
        >
          {({ isSubmitting, values }) => {
            const { experience, licence, name, number, skills} = values;
            return (
              <Form className={s.contactForm}>
                <label className={s.title} htmlFor="name">Name </label>
                <Field className={s.labelBlock} type="text" name="name" />
                <ErrorMessage name="name" component="div" />
                <label className={s.title} htmlFor="number">Number </label>
                <Field className={s.labelBlock} type="text" name="number" />
                <ErrorMessage name="number" component="div" />
                <div role="group" aria-labelledby="radio-group" className={`${s.labelBlock} ${s.groupBlock}`}>
                  <h3 className={s.title}>Your Level</h3>
                  {expLevel.map(exp =>
                    <label key={exp}>
                      <Field type="radio" className={s.inputBox} name="experience" value={exp} />
                      {exp}
                    </label>
                  )}
                </div>
                <div role="group" aria-labelledby="checkbox-group" className={`${s.labelBlock} ${s.groupBlock}`}>
                  <h3 className={s.title}>Your Skills</h3>
                  {skillsArray.map(skill =>
                    <label key={skill}>
                      <Field type="checkbox" className={s.inputBox} name="skills" value={skill} />
                      {skill}
                    </label>
                  )}
                </div>
                <label className={s.labelBlock}>
                  <Field type="checkbox" className={s.inputBox} name="licence" id="licence" />
                All data is right
            </label>

                <IconButton
                  type="submit"
                  classNames={s.iconButtonAddContact}
                  aria-label="submit button"
                  disabled={isSubmitting || experience === '' || !licence || name === '' || number === '' || skills.length === 0}
                >
                  Add Contact
                </IconButton>
              </Form>
            )
          }}
     </Formik>
}

ContactFormik.propTypes = {
        formSubmitHandler: PropTypes.func.isRequired,
        contacts: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          number: PropTypes.string.isRequired,
        })),
    }

export default ContactFormik;