import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./footer";
import SideDrawer from "./Drawer";
import Notes from "../pages/Notes";
import Favorites from "../pages/Favorites";
import Labels from "../pages/Labels";
import Archive from "../pages/Archive";
import Trash from "../pages/Trash";

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
          archived: prevNotes[editingNote].archived || false,
          trashed: prevNotes[editingNote].trashed || false,
          timestamp: new Date().toISOString()
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
          archived: false,
          trashed: false,
          timestamp: new Date().toISOString()
        }];
      });
    }
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      const updatedNotes = [...prevNotes];
      const note = updatedNotes[id];
      
      if (note.trashed) {
        // Permanently delete if already in trash
        return prevNotes.filter((_, index) => index !== id);
      } else {
        // Move to trash
        updatedNotes[id] = { ...note, trashed: true };
        return updatedNotes;
      }
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

  function toggleArchive(id) {
    setNotes(prevNotes => {
      const updatedNotes = [...prevNotes];
      const note = updatedNotes[id];
      updatedNotes[id] = { 
        ...note, 
        archived: !note.archived,
        trashed: false // Remove from trash if being archived
      };
      return updatedNotes;
    });
  }

  function restoreFromTrash(id) {
    setNotes(prevNotes => {
      const updatedNotes = [...prevNotes];
      updatedNotes[id] = { ...updatedNotes[id], trashed: false };
      return updatedNotes;
    });
  }

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  // Filter notes for different views
  const activeNotes = notes.filter(note => !note.archived && !note.trashed);
  const favoriteNotes = notes.filter(note => note.favorite && !note.archived && !note.trashed);
  const archivedNotes = notes.filter(note => note.archived && !note.trashed);
  const trashedNotes = notes.filter(note => note.trashed);

  // Count of favorite notes for badge
  const favoriteCount = favoriteNotes.length;

  return (
    <Router>
      <div className="app">
        <SideDrawer 
          open={drawerOpen}
          onClose={handleDrawerClose}
          onOpen={handleDrawerOpen}
          favoriteCount={favoriteCount}
        />
        <div className="main-content">
          <Header onMenuClick={handleDrawerOpen} />
          
          <Routes>
            <Route 
              path="/" 
              element={
                <Notes 
                  notes={activeNotes}
                  onAdd={addNote}
                  editingNote={editingNote !== null ? notes[editingNote] : null}
                  onEditingNoteChange={setEditingNote}
                  onDelete={deleteNote}
                  onEdit={editNote}
                  onFavorite={toggleFavorite}
                  onArchive={toggleArchive}
                />
              } 
            />
            <Route 
              path="/favorites" 
              element={
                <Favorites 
                  notes={favoriteNotes}
                  onDelete={deleteNote}
                  onEdit={editNote}
                  onFavorite={toggleFavorite}
                  onArchive={toggleArchive}
                />
              } 
            />
            <Route 
              path="/labels" 
              element={<Labels />} 
            />
            <Route 
              path="/archive" 
              element={
                <Archive 
                  notes={archivedNotes}
                  onDelete={deleteNote}
                  onEdit={editNote}
                  onFavorite={toggleFavorite}
                  onArchive={toggleArchive}
                />
              } 
            />
            <Route 
              path="/trash" 
              element={
                <Trash 
                  notes={trashedNotes}
                  onDelete={deleteNote}
                  onRestore={restoreFromTrash}
                />
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
