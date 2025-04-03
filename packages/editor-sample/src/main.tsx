import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

import { CssBaseline, ThemeProvider } from '@mui/material';

import theme from './theme';
import SuperLeapEmailBuilder from './App';

const VariableInput: React.FC<VariableInputProps> = ({
  defaultValue,
  placeholder,
  onSelect,
  handleChange,
  disabled = false,
  allowedTypes,
  setEditor,
  className = '',
}) => {
  const [value, setValue] = useState(defaultValue || '');

  // Update local state when props change
  useEffect(() => {
    setValue(defaultValue || '');
  }, [defaultValue]);

  useEffect(() => {
    // Simulating editor setup
    setEditor({ type: 'dummy-editor', active: true });
  }, [setEditor]);

  const handleInputChange = (e: any) => {
    const newValue = e.target.value;
    setValue(newValue);
    handleChange(newValue);
  };

  const handleVariableSelect = () => {
    // Simulate variable selection with a dummy variable
    const dummyVariable = '{dummy_variable}';

    // Update the local state with the new value
    const newValue = value + dummyVariable;
    setValue(newValue);

    // Call the onSelect to update the parent component
    onSelect(dummyVariable);
  };

  return (
    <div className={`variable-input-container ${className}`}>
      <div className="input-wrapper" style={{ position: 'relative' }}>
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px',
          }}
        />
        <button
          onClick={handleVariableSelect}
          disabled={disabled}
          style={{
            position: 'absolute',
            right: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '4px 8px',
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
        >
          Add Variable
        </button>
      </div>
      <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Allowed Type: {allowedTypes.type}</div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SuperLeapEmailBuilder components={{ VariableInput: VariableInput }} />
    </ThemeProvider>
  </React.StrictMode>
);
