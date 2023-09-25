import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './customDropdown.css';

const CustomSelectDropdown = ({ options, onSelect, selected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    const filtered = options.filter((option) => option.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredOptions(filtered);
  }, [options, searchTerm]);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div style={{ zIndex: '99999' }} className={`custom-select-dropdown ${isOpen ? 'open' : ''}`}>
      <div className="selected-option" onClick={() => setIsOpen(!isOpen)}>
        {selected ? selected : 'Select an option'}
      </div>
      {isOpen && (
        <div className="options">
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {filteredOptions.map((option) => (
            <div key={option.id} className="option" onClick={() => handleSelect(option)}>
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

CustomSelectDropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default CustomSelectDropdown;
