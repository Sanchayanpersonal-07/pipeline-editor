import React from 'react';
import { FiPlus, FiGitPullRequest } from 'react-icons/fi'; // Import icons
import './Controls.css';

interface ControlsProps {
  onAddNode: () => void;
  onLayout: () => void;
}

const Controls: React.FC<ControlsProps> = ({ onAddNode, onLayout }) => {
  return (
    <div className="controls-panel">
      <button 
        onClick={onAddNode} 
        data-tooltip-id="main-tooltip" 
        data-tooltip-content="Add New Node"
      >
        <FiPlus />
      </button>
      <button 
        onClick={onLayout} 
        data-tooltip-id="main-tooltip" 
        data-tooltip-content="Auto-Layout"
      >
        <FiGitPullRequest />
      </button>
    </div>
  );
};

export default Controls;