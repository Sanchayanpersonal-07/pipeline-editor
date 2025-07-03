import { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Panel,
  // FIX: Import the MarkerType enum
  MarkerType,
} from 'reactflow';
import type {
  Node,
  Edge,
  Connection,
  OnSelectionChangeParams,
  NodeTypes,
} from 'reactflow';

import 'reactflow/dist/style.css';

import CustomNode from './components/CustomNode';
import Controls from './components/Controls';
import StatusMessage from './components/StatusMessage';
import { validateDag } from './utils/dagValidator';
import { getLayoutedElements } from './utils/layoutHelper';
import type { ValidationResult } from './utils/types';

const nodeTypes: NodeTypes = { custom: CustomNode };

let id = 1;
const getId = (): string => `node_${id++}`;

const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const [validationResult, setValidationResult] = useState<ValidationResult>({ isValid: true, messages: [] });
  const [selectedElements, setSelectedElements] = useState<(Node | Edge)[]>([]);
  const { fitView } = useReactFlow();

  const onAddNode = useCallback(() => {
    const nodeName = prompt("Enter a name for the new node:");
    if (nodeName) {
      const newNode: Node = {
        id: getId(),
        type: 'custom',
        position: { x: Math.random() * 400, y: Math.random() * 400 },
        data: { label: nodeName },
      };
      setNodes((nds) => nds.concat(newNode));
    }
  }, [setNodes]);

  const onConnect = useCallback(
    (params: Connection | Edge) => {
      if (params.source === params.target) {
        alert("Cannot connect a node to itself.");
        return;
      }
      // FIX: Use the MarkerType enum instead of a string
      setEdges((eds) => addEdge({ ...params, animated: true, markerEnd: { type: MarkerType.ArrowClosed } }, eds));
    },
    [setEdges]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Delete' && selectedElements.length > 0) {
        const selectedNodeIds = new Set(selectedElements.filter((el): el is Node => 'position' in el).map(el => el.id));
        const selectedEdgeIds = new Set(selectedElements.filter((el): el is Edge => !('position' in el)).map(el => el.id));

        setNodes((nds) => nds.filter((node) => !selectedNodeIds.has(node.id)));
        setEdges((eds) =>
          eds.filter(
            (edge) =>
              !selectedEdgeIds.has(edge.id) &&
              !selectedNodeIds.has(edge.source) &&
              !selectedNodeIds.has(edge.target)
          )
        );
        setSelectedElements([]);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedElements, setNodes, setEdges]);

  const onSelectionChange = useCallback(({ nodes, edges }: OnSelectionChangeParams) => {
    setSelectedElements([...nodes, ...edges]);
  }, []);

  useEffect(() => {
    const result = validateDag(nodes, edges);
    setValidationResult(result);
  }, [nodes, edges]);

  const onLayout = useCallback(() => {
    if (nodes.length === 0) return;
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges);
    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
    window.requestAnimationFrame(() => fitView());
  }, [nodes, edges, setNodes, setEdges, fitView]);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onSelectionChange={onSelectionChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <Panel position="top-left">
          <Controls onAddNode={onAddNode} onLayout={onLayout} />
        </Panel>
        <Panel position="top-right">
            <StatusMessage result={validationResult} />
        </Panel>
      </ReactFlow>
    </div>
  );
};

const AppWrapper = () => (
  <ReactFlowProvider>
    <App />
  </ReactFlowProvider>
);

export default AppWrapper;