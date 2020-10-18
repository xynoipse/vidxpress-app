import React from 'react';

const FormSelect = ({ name, label, options, errors, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        {...rest}
        className={`custom-select ${errors[name] ? 'is-invalid' : ''}`}
      >
        <option value="" disabled>Choose...</option>
        {options.map(option => <option key={option._id} value={option._id}>{option.name}</option>)}
      </select>
      {errors[name] && (
        <span className="invalid-feedback">
          <strong>{errors[name]}</strong>
        </span>
      )}
    </div>
  );
}

export default FormSelect;
