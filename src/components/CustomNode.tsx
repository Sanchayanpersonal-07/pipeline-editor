import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
// import { Tooltip } from 'react-tooltip'; // <- REMOVE THIS LINE
import type { NodeData } from '../utils/types';
import './CustomNode.css';

// Define the color map here as well or import it
const NODE_TYPE_COLORS: Record<string, string> = {
  Input: '#28a745',
  Processing: '#5c6bc0',
  Output: '#ff7043',
};

const CustomNode = ({ data }: NodeProps<NodeData>) => {
  const nodeStyle = {
    borderColor: NODE_TYPE_COLORS[data.type] || '#555',
  };

  return (
    <>
      <div className="custom-node" style={nodeStyle}>
        <div className="node-badge" style={{ backgroundColor: nodeStyle.borderColor }}>
          {data.type}
        </div>
        <div className="node-label">{data.label}</div>
        
        <Handle 
          type="target" 
          position={Position.Left} 
          data-tooltip-id="main-tooltip"
          data-tooltip-content="Connect Input"
        />
        <Handle 
          type="source" 
          position={Position.Right} 
          data-tooltip-id="main-tooltip"
          data-tooltip-content="Connect Output"
        />
      </div>
    </>
  );
};

export default memo(CustomNode);