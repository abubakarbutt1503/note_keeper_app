import React, {useState} from "react";
import Header from "./Header";
import Footer from "./footer";
import InputText from "./inputText";
import Note from "./Note";
import SideDrawer from "./Drawer";

function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  function addNote(newNote) {
    if (editingNote !== null) {
      // Update existing note
      setNotes(prevNotes => {
        const updatedNotes = [...prevNotes];
        updatedNotes[editingNote] = { 
          ...newNote, 
          favorite: prevNotes[editingNote].favorite || false,
          timestamp: new Date().toISOString() // Update timestamp on edit
        };
        return updatedNotes;
      });
      setEditingNote(null);
    } else {
      // Add new note
      setNotes(prevNotes => {
        return [...prevNotes, { 
          ...newNote, 
          favorite: false,
          timestamp: new Date().toISOString() // Add timestamp for new note
        }];
      });
    }
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((note, index) => {
        return index !== id;
      });
    });
  }

  function editNote(id, title, content) {
    setEditingNote(id);
    // Scroll to the input form
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  function toggleFavorite(id, favoriteStatus) {
    setNotes(prevNotes => {
      const updatedNotes = [...prevNotes];
      updatedNotes[id] = { ...updatedNotes[id], favorite: favoriteStatus };
      return updatedNotes;
    });
  }

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <div className="app">
      <SideDrawer 
        open={drawerOpen}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
      />
      <div className="main-content">
        <Header onMenuClick={handleDrawerOpen} />
        <InputText 
          onAdd={addNote} 
          editNote={editingNote !== null ? notes[editingNote] : null}
          onCancel={() => setEditingNote(null)}
        />
        <div className="notes-container">
          {notes.map((noteItem, index) => {
            return (
              <Note 
                key={index}
                id={index} 
                title={noteItem.title} 
                content={noteItem.content}
                favorite={noteItem.favorite}
                timestamp={noteItem.timestamp} // Pass timestamp to Note component
                onDelete={deleteNote}
                onEdit={editNote}
                onFavorite={toggleFavorite}
              />
            );
          })}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
