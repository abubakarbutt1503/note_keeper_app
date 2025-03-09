import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function Note(props) {
  const [isFavorite, setIsFavorite] = useState(props.favorite || false);

  const handleFavoriteClick = () => {
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);
    if (props.onFavorite) {
      props.onFavorite(props.id, newFavoriteStatus);
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
    <div className={`note ${isFavorite ? 'favorite' : ''}`}>
      <div className="note-content">
        <h2>{props.title}</h2>
        <p>{props.content}</p>
        {props.timestamp && (
          <div className="note-timestamp">
            <AccessTimeIcon style={{ fontSize: '14px', marginRight: '4px' }} />
            {formatDate(props.timestamp)}
          </div>
        )}
      </div>
      <div className="note-buttons">
        <button 
          className={`favorite-button ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? <StarIcon /> : <StarBorderIcon />}
        </button>
        <div className="note-buttons-right">
          <button 
            className="edit-button" 
            onClick={() => {
              props.onEdit(props.id, props.title, props.content);
            }}
          >
            <EditIcon style={{ fontSize: '16px' }} />
            Edit
          </button>
          <button 
            className="deleteButton" 
            onClick={() => {
              props.onDelete(props.id);
            }}
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Note;
