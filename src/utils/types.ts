export type NodeType = 'Input' | 'Processing' | 'Output';

export interface NodeData {
  label: string;
  type: NodeType;
}

export interface ValidationResult {
  isValid: boolean;
  messages: string[];
}