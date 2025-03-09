import React, { useState, useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

export default function InputText(props) {
    const [isExpanded, setExpanded] = useState(false)
    const [fullNote, setFullNote] = useState({
        title: "",
        content: ""
    })
    
    // Handle edit mode
    useEffect(() => {
        if (props.editNote) {
            setFullNote({
                title: props.editNote.title,
                content: props.editNote.content
            });
            setExpanded(true);
        }
    }, [props.editNote]);

    function handleChange(event) {
        const {name, value} = event.target;
        setFullNote(prevValue => ({
            ...prevValue,
            [name]: value
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        // Check if both title and content are not empty (after trimming whitespace)
        if (fullNote.title.trim() && fullNote.content.trim()) {
            props.onAdd(fullNote);
            setFullNote({
                title: "",
                content: ""
            });
            setExpanded(false);
        } else {
            // Focus on empty field
            if (!fullNote.title.trim()) {
                document.querySelector('.title')?.focus();
            } else if (!fullNote.content.trim()) {
                document.querySelector('.content')?.focus();
            }
        }
    }

    function handleCancel() {
        setFullNote({
            title: "",
            content: ""
        });
        setExpanded(false);
        if (props.onCancel) {
            props.onCancel();
        }
    }

    function expanded() {
        setExpanded(true);
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            {isExpanded && (
                <input 
                    className='title' 
                    onChange={handleChange} 
                    value={fullNote.title} 
                    name='title' 
                    type="text" 
                    placeholder='Title' 
                />
            )}
            <textarea 
                rows={isExpanded ? 3 : 1} 
                onClick={expanded} 
                className='content' 
                onChange={handleChange} 
                value={fullNote.content} 
                name='content' 
                placeholder='Take a note...' 
            />
            <div className="form-buttons">
                {isExpanded && props.editNote && (
                    <Zoom in={true}>
                        <Fab 
                            className='cancelButton' 
                            onClick={handleCancel}
                        >
                            <CloseIcon />
                        </Fab>
                    </Zoom>
                )}
                <Zoom in={isExpanded}>
                    <Fab 
                        className='addButton' 
                        type="submit"
                    >
                        {props.editNote ? <CheckIcon /> : <AddIcon />}
                    </Fab>
                </Zoom>
            </div>
        </form>
    );
}
