import React, {useContext} from 'react';
import IconButton from '../IconButton';
import { ReactComponent as DeleteIcon } from '../../icon/delete.svg';
import Context from '../Context';
import s from './ContactItem.module.css';

function ContactItem({ id, name, number, experience, skills }) {
    const {deleteContact} = useContext(Context);
    return (
        <>
          <span className={s.point}>{name}:</span>
          <span className={s.point}>{number},</span>
          <span className={s.point}>{experience},</span>
          <span className={s.point}>skills: {skills.join(', ')}</span>
          <IconButton onClick={()=> deleteContact(id)} aria-label="Delete Contact" classNames={s.positionButton}>
              <DeleteIcon width="20" height="20" />
          </IconButton>
        </>
    )
}

export default ContactItem;