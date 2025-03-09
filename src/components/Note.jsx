import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

function Note(props) {
  const [isFavorite, setIsFavorite] = useState(props.favorite || false);

  const handleFavoriteClick = () => {
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);
    if (props.onFavorite) {
      props.onFavorite(props.id, newFavoriteStatus);
    }
  };

  return (
    <div className={`note ${isFavorite ? 'favorite' : ''}`}>
      <div className="note-content">
        <h2>{props.title}</h2>
        <p>{props.content}</p>
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
