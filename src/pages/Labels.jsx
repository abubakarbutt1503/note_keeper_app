import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Labels() {
  const [labels, setLabels] = useState([]);
  const [newLabel, setNewLabel] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleAddLabel = () => {
    if (newLabel.trim() !== '') {
      if (editingIndex >= 0) {
        // Edit existing label
        const updatedLabels = [...labels];
        updatedLabels[editingIndex] = newLabel;
        setLabels(updatedLabels);
        setEditingIndex(-1);
      } else {
        // Add new label
        setLabels([...labels, newLabel]);
      }
      setNewLabel('');
    }
  };

  const handleEditLabel = (index) => {
    setNewLabel(labels[index]);
    setEditingIndex(index);
  };

  const handleDeleteLabel = (index) => {
    const updatedLabels = labels.filter((_, i) => i !== index);
    setLabels(updatedLabels);
  };

  return (
    <div className="labels-page">
      <h1>Edit Labels</h1>
      
      <div className="label-input">
        <TextField
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          placeholder="Create new label"
          variant="outlined"
          fullWidth
          size="small"
        />
        <Button 
          onClick={handleAddLabel}
          variant="contained"
          color="primary"
          className="add-label-button"
        >
          {editingIndex >= 0 ? 'Update' : 'Add'}
        </Button>
      </div>
      
      <List className="labels-list">
        {labels.length === 0 ? (
          <div className="empty-state">
            <p>No labels yet. Create one above!</p>
          </div>
        ) : (
          labels.map((label, index) => (
            <ListItem key={index} className="label-item">
              <ListItemText primary={label} />
              <IconButton onClick={() => handleEditLabel(index)} className="edit-label-button">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDeleteLabel(index)} className="delete-label-button">
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))
        )}
      </List>
    </div>
  );
}

export default Labels; 