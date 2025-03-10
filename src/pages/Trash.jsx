import React from 'react';
import Note from '../components/Note';

function Trash({ notes, onDelete, onRestore }) {
  const trashedNotes = notes.filter(note => note.trashed);

  return (
    <div className="trash-page">
      <h1>Trash</h1>
      <div className="notes-container">
        {trashedNotes.length === 0 ? (
          <div className="empty-state">
            <p>No notes in trash</p>
          </div>
        ) : (
          trashedNotes.map((noteItem, index) => (
            <Note 
              key={index}
              id={notes.indexOf(noteItem)}
              title={noteItem.title} 
              content={noteItem.content}
              timestamp={noteItem.timestamp}
              trashed={true}
              onDelete={onDelete}
              onRestore={onRestore}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Trash; 