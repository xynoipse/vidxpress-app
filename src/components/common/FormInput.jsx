import React from 'react';

const FormInput = ({ name, label, errors, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        {...rest}
        className={`form-control ${errors[name] ? 'is-invalid' : ''}`}
      />
      {errors[name] && (
        <span className="invalid-feedback">
          <strong>{errors[name]}</strong>
        </span>
      )}
    </div>
  );
}

export default FormInput;
