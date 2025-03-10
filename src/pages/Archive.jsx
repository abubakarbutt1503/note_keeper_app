import React from 'react';
import Note from '../components/Note';

function Archive({ notes, onDelete, onEdit, onFavorite, onArchive }) {
  return (
    <div className="archive-page">
      <h1>Archive</h1>
      <div className="notes-container">
        {notes.length === 0 ? (
          <div className="empty-state">
            <p>No archived notes. Archive your notes to see them here!</p>
          </div>
        ) : (
          notes.map((noteItem, index) => (
            <Note 
              key={index}
              id={notes.indexOf(noteItem)}
              title={noteItem.title} 
              content={noteItem.content}
              favorite={noteItem.favorite}
              archived={true}
              timestamp={noteItem.timestamp}
              onDelete={onDelete}
              onEdit={onEdit}
              onFavorite={onFavorite}
              onArchive={onArchive}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Archive; 