import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

import { CssBaseline, ThemeProvider } from '@mui/material';

import App from './App';
import theme from './theme';

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
  const [value, setValue] = useState<string>(defaultValue || '');

  useEffect(() => {
    // Simulating editor setup
    setEditor({ type: 'dummy-editor', active: true });
  }, [setEditor]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    handleChange(newValue);
  };

  const handleVariableSelect = () => {
    // Simulate variable selection with a dummy variable
    const dummyVariable = '{{dummy_variable}}';
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

export default VariableInput;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App components={{ VariableInput: VariableInput }} />
    </ThemeProvider>
  </React.StrictMode>
);
