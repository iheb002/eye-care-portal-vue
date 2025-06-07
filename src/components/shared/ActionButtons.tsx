
import React from 'react';
import { Eye, Edit, Trash } from 'lucide-react';

interface ActionButtonsProps {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onView,
  onEdit,
  onDelete
}) => {
  return (
    <div className="flex items-center gap-1">
      <button 
        onClick={onView}
        className="p-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200"
        title="Voir"
      >
        <Eye className="h-4 w-4" />
      </button>
      <button 
        onClick={onEdit}
        className="p-1 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
        title="Modifier"
      >
        <Edit className="h-4 w-4" />
      </button>
      <button 
        onClick={onDelete}
        className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
        title="Supprimer"
      >
        <Trash className="h-4 w-4" />
      </button>
    </div>
  );
};

export default ActionButtons;
