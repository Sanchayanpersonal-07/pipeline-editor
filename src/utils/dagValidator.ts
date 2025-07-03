// FIX: Use 'import type' for type-only imports
import type { Node, Edge } from 'reactflow';
import type { ValidationResult } from './types';

// ... (rest of the file is unchanged)
const hasCycle = (nodes: Node[], edges: Edge[]): boolean => {
  if (nodes.length === 0) return false;

  const adj = new Map<string, string[]>();
  nodes.forEach(node => adj.set(node.id, []));
  edges.forEach(edge => {
    if (adj.has(edge.source)) {
      adj.get(edge.source)!.push(edge.target);
    }
  });

  const visited = new Set<string>();
  const recursionStack = new Set<string>();

  const detectCycleUtil = (nodeId: string): boolean => {
    visited.add(nodeId);
    recursionStack.add(nodeId);

    const neighbors = adj.get(nodeId) || [];
    for (const neighborId of neighbors) {
      if (!visited.has(neighborId)) {
        if (detectCycleUtil(neighborId)) return true;
      } else if (recursionStack.has(neighborId)) {
        return true;
      }
    }

    recursionStack.delete(nodeId);
    return false;
  };

  for (const node of nodes) {
    if (!visited.has(node.id)) {
      if (detectCycleUtil(node.id)) return true;
    }
  }

  return false;
};

export const validateDag = (nodes: Node[], edges: Edge[]): ValidationResult => {
  const messages: string[] = [];

  if (nodes.length < 2) {
    messages.push("A valid pipeline requires at least 2 nodes.");
  }
  
  if (hasCycle(nodes, edges)) {
    messages.push("The pipeline contains a cycle.");
  }

  if (nodes.length > 0) {
    const connectedNodeIds = new Set<string>();
    edges.forEach(edge => {
      connectedNodeIds.add(edge.source);
      connectedNodeIds.add(edge.target);
    });
    
    const unconnectedNodes = nodes.filter(node => !connectedNodeIds.has(node.id));
    if (unconnectedNodes.length > 0) {
      messages.push(`Node(s) ${unconnectedNodes.map(n => `"${n.data.label}"`).join(', ')} are not connected.`);
    }
  }

  return {
    isValid: messages.length === 0,
    messages,
  };
};