import React, { useState } from 'react';


const CustomSelect = ({ name, id, options, onChange}) => {
  const [database, setDatabase] = useState('');
  const [frontendFramework, setFrontendFramework] = useState('');
  const [frontendLanguage, setFrontendLanguage] = useState('');
  const [backendFramework, setBackendFramework] = useState('');
  const [backendLanguage, setBackendLanguage] = useState('');
  const [hostType, setHostType] = useState('');
  const [cicdType, setCicdType] = useState('');

  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    onChange(value);
  };

  const [isOpen, setIsOpen] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (event) => {
    const selected = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedOptions(selected);

    onChange(event);

    
  };

  const handleSelectClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
    <div>
      <label htmlFor={name}>{name}:</label>
      <div
        className={`dropdown-select ${isOpen ? 'open' : ''}`}
        onClick={handleSelectClick}
      >
        <div 
        //   className="selected-options"
          className={`selected-options ${isOpen ? 'optionOpen' : 'optionHide'}`}
          >
          {selectedOptions.length > 0 ? (
            selectedOptions.map((option) => (
              <div key={option} className="selected-option">
                {option}
              </div>
            ))
          ) : (
            <div className="placeholder">Select an option</div>
          )}
        </div>
        <select
          id={id}
          className="options-list"
          multiple
          value={selectedOptions}
          onChange={handleSelectChange}
        >
          <option value="" disabled hidden>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
        </select>
      </div>

    </div>
    </div>
  );
};

export default CustomSelect;
