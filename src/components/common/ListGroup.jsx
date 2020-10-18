import React from 'react';
import PropTypes from 'prop-types';

const ListGroup = ({ items, textProperty, valueProperty, selectedItem, onItemSelect }) => {
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          key={item[valueProperty]}
          onClick={() => onItemSelect(item)}
          className={`list-group-item ${item === selectedItem ? 'active' : ''}`}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
}

ListGroup.propTypes = {
  items: PropTypes.array.isRequired,
  textProperty: PropTypes.string.isRequired,
  valueProperty: PropTypes.string.isRequired
};

ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id'
};

export default ListGroup
