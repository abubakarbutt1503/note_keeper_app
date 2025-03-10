import React from 'react';
import InputText from '../components/inputText';
import Note from '../components/Note';

function Notes({ notes, onAdd, editingNote, onEditingNoteChange, onDelete, onEdit, onFavorite, onArchive }) {
  return (
    <div className="notes-page">
      <InputText 
        onAdd={onAdd} 
        editNote={editingNote}
        onCancel={() => onEditingNoteChange(null)}
      />
      <div className="notes-container">
        {notes.length === 0 ? (
          <div className="empty-state">
            <p>No notes yet. Create one by typing above!</p>
          </div>
        ) : (
          notes.map((noteItem, index) => (
            <Note 
              key={index}
              id={index} 
              title={noteItem.title} 
              content={noteItem.content}
              favorite={noteItem.favorite}
              archived={noteItem.archived}
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

export default Notes; 