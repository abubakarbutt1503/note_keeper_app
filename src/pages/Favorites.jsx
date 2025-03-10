import React from 'react';
import Note from '../components/Note';

function Favorites({ notes, onDelete, onEdit, onFavorite }) {
  const favoriteNotes = notes.filter(note => note.favorite && !note.archived && !note.trashed);

  return (
    <div className="favorites-page">
      <h1>Favorite Notes</h1>
      <div className="notes-container">
        {favoriteNotes.length === 0 ? (
          <div className="empty-state">
            <p>No favorite notes yet. Star ⭐ any note to see it here!</p>
          </div>
        ) : (
          favoriteNotes.map((noteItem, index) => (
            <Note 
              key={index}
              id={notes.indexOf(noteItem)}
              title={noteItem.title} 
              content={noteItem.content}
              favorite={noteItem.favorite}
              timestamp={noteItem.timestamp}
              onDelete={onDelete}
              onEdit={onEdit}
              onFavorite={onFavorite}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Favorites; 