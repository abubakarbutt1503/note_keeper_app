import React, { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Tooltip from '@mui/material/Tooltip';

function Note({ 
  id, 
  title, 
  content, 
  favorite, 
  archived, 
  timestamp, 
  trashed,
  onDelete, 
  onEdit, 
  onFavorite,
  onArchive,
  onRestore
}) {
  const [isFavorite, setIsFavorite] = useState(favorite || false);
  
  useEffect(() => {
    setIsFavorite(favorite || false);
  }, [favorite]);

  const handleFavoriteClick = () => {
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);
    if (onFavorite) {
      onFavorite(id, newFavoriteStatus);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Format time
    const timeString = date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });

    // Check if it's today or yesterday
    if (date.toDateString() === today.toDateString()) {
      return `Today at ${timeString}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${timeString}`;
    } else {
      // Format date for older notes
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      }) + ` at ${timeString}`;
    }
  };

  return (
    <div className={`note ${isFavorite ? 'favorite' : ''} ${archived ? 'archived' : ''}`}>
      <div className="note-content">
        <h2>{title}</h2>
        <p>{content}</p>
        {timestamp && (
          <div className="note-timestamp">
            <AccessTimeIcon style={{ fontSize: '14px', marginRight: '4px' }} />
            {formatDate(timestamp)}
          </div>
        )}
      </div>
      <div className="note-buttons">
        {!trashed && (
          <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
            <button 
              className={`favorite-button ${isFavorite ? 'active' : ''}`}
              onClick={handleFavoriteClick}
            >
              {isFavorite ? <StarIcon /> : <StarBorderIcon />}
            </button>
          </Tooltip>
        )}
        <div className="note-buttons-right">
          {trashed ? (
            <Tooltip title="Restore from trash">
              <button 
                className="restore-button" 
                onClick={() => onRestore(id)}
              >
                <RestoreFromTrashIcon />
                Restore
              </button>
            </Tooltip>
          ) : (
            <>
              {!archived && (
                <Tooltip title="Edit note">
                  <button 
                    className="edit-button" 
                    onClick={() => onEdit(id, title, content)}
                  >
                    <EditIcon style={{ fontSize: '16px' }} />
                    Edit
                  </button>
                </Tooltip>
              )}
              
              <Tooltip title={archived ? "Unarchive note" : "Archive note"}>
                <button 
                  className="archive-button" 
                  onClick={() => onArchive(id)}
                >
                  {archived ? <UnarchiveIcon /> : <ArchiveIcon />}
                  {archived ? 'Unarchive' : 'Archive'}
                </button>
              </Tooltip>
            </>
          )}
          
          <Tooltip title={trashed ? "Delete forever" : "Move to trash"}>
            <button 
              className="deleteButton" 
              onClick={() => onDelete(id)}
            >
              <DeleteIcon />
              {trashed ? 'Delete Forever' : ''}
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default Note;
