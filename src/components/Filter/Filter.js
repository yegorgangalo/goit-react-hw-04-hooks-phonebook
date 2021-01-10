import React from 'react';
import PropTypes from 'prop-types';
import s from './Filter.module.css';

function Filter ({value, onChange}) {
        return <div className={s.labelBlock} >
            <h4  className={s.title}>Find contacts by name, number or level</h4>
            <input className={s.input} type="text" name="filter" value={value} onChange={onChange} />
            </div>
}

Filter.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Filter;