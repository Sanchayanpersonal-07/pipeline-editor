# React Pipeline Editor (DAG Builder)

This project is a React-based visual pipeline editor that allows users to create, connect, and manage nodes in a Directed Acyclic Graph (DAG). It includes real-time validation to ensure the graph remains a valid DAG and an auto-layout feature for visual clarity.

**Live Demo:** [Link to your deployed Vercel/Netlify site]

## Features

- [x] **Add Nodes**: Dynamically add new nodes to the canvas via a prompt.
- [x] **Connect Nodes**: Draw directed edges between nodes (from an output handle to an input handle).
- [x] **Connection Rules**: Prevents invalid connections like self-loops.
- [x] **Delete Elements**: Delete selected nodes or edges using the `Delete` key.
- [x] **Real-time DAG Validation**: A status panel indicates whether the current graph is a valid DAG based on the following rules:
    - Must have at least 2 nodes.
    - All nodes must be connected.
    - The graph must not contain any cycles.
- [x] **(Bonus) Auto-Layout**: Automatically arranges nodes into a clean, hierarchical layout using the Dagre library.

## Tech Stack

- **Framework**: React (with Vite)
- **Language**: TypeScript
- **Graph Visualization**: `reactflow`
- **Auto-Layout Algorithm**: `dagre`
- **Styling**: CSS

## Setup and Running Locally

**1. Clone the repository:**

```bash
git clone <your-repo-url>
cd pipeline-editor
```

**2. Install dependencies:**

```bash
npm install
```

**3. Run the development server:**

```bash
npm run dev
```

The application will be available at the local address shown in your terminal (e.g., `http://localhost:5173`).

## Architectural Decisions & Challenges

- **Technology Choices**:
    - **Vite**: Chosen for its fast development server and optimized build process.
    - **TypeScript**: Used as required to ensure type safety, improve code quality, and make the application more scalable and maintainable.
    - **React Flow**: Selected as a powerful, modern library for building node-based editors. Its managed state hooks (`useNodesState`, `useEdgesState`) and extensive API simplify development significantly.

- **Code Structure**:
    - The application is broken down into a modular structure with `components/` for UI elements and `utils/` for business logic (validation, layout). This separation of concerns makes the codebase clean and easy to navigate.

- **Challenges & Solutions**:
    - **DAG Cycle Detection**: The most complex logic was implementing cycle detection. A **Depth-First Search (DFS)** algorithm was chosen. The core idea is to traverse the graph while maintaining two sets of nodes: `visited` (nodes ever visited) and `recursionStack` (nodes in the current path of traversal). A cycle is detected if we encounter a node that is already in the `recursionStack`, indicating a back edge.
    - **Type-Safe Deletion**: Implementing the delete functionality in a type-safe way required using TypeScript type guards (`(el): el is Node => 'position' in el`) to differentiate between selected nodes and edges within a single array.
    - **Auto-Layout Integration**: Integrating `dagre` required a helper function (`layoutHelper.ts`) to translate React Flow's node/edge format into `dagre`'s graph format, run the layout algorithm, and then translate the new positions back to the format React Flow expects.

## Demo & Screenshots

*(Add your screen recordings and screenshots here)*

**Adding Nodes and Creating a Valid Pipeline:**
![Valid Pipeline](link-to-your-screenshot-1.png)

**Invalid DAG Status (Cycle Detected):**
![Invalid DAG](link-to-your-screenshot-2.png)

**Auto-Layout Feature in Action:**
![Auto Layout GIF](link-to-your-demo.gif)