// FIX: Remove 'useCallback' from the import list
import React, { useEffect, useRef } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import './ContextMenu.css';

interface ContextMenuProps {
  top: number;
  left: number;
  onClose: () => void;
  onDelete: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ top, left, onClose, onDelete }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <div ref={menuRef} className="context-menu" style={{ top, left }}>
      <ul>
        <li onClick={handleDelete}>
          <FiTrash2 /> Delete
        </li>
      </ul>
    </div>
  );
};

export default ContextMenu;