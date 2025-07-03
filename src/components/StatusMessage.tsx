import React from 'react';
import type { ValidationResult } from '../utils/types';
import './StatusMessage.css';

interface StatusMessageProps {
  result: ValidationResult;
}

const StatusMessage: React.FC<StatusMessageProps> = ({ result }) => {
  const { isValid, messages } = result;

  if (isValid) {
    return <div className="status-message valid">✓ Valid DAG</div>;
  }

  return (
    <div className="status-message invalid">
      <p>✗ Invalid DAG</p>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default StatusMessage;