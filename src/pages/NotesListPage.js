import React, { useState, useEffect } from 'react';
import ListItem from '../components/ListItem';
import AddButton from '../components/AddButton';

const NotesListPage = () => {

    let [notes, setNotes] = useState([]); // Initially empty (no notes)

    useEffect(() => {
        getNotes();
    }, [])

    let getNotes = async() => {
        try {
            let response = await fetch('http://localhost:8000/notes');
            let data = await response.json();
            setNotes(data); // Updates state
        }
        catch {
            console.log("Error");
        }
    }

    return(
        <div className="notes">
            <div className="notes-header">
                <h2 className="notes-title">&#9782; Notes</h2>
                <p className="notes-count">{notes.length}</p>
            </div>

            <div className="notes-list">
                {notes.map((entry, index) => (
                    <ListItem key={index} note={entry} />
                ))}
            </div>
            <AddButton />
        </div>
    );
}

export default NotesListPage;