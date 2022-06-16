import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const NotePage = () => {
    let params = useParams();
    let noteId = params.id;
    let navigate = useNavigate();
    //let note = notes.find(note => note.id === Number(noteId));
    let [note, setNote] = useState("");

    useEffect(() => {
        getNote();
    }, [noteId])

    let getNote = async() => {
        if (noteId !== "new") {
            try {
                let response = await fetch(`http://localhost:8000/notes/${noteId}`);
                let data = await response.json();
                setNote(data.body);
            } catch {
            console.log("ERROR");
            }
        }
    }

    const handleNoteChange = event => {
        setNote(event.target.value);
    }

    let updateNote = async () => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'body': note, 'updated': new Date()})
        };
        //  Makes put request
        await fetch(`http://localhost:8000/notes/${noteId}`, requestOptions);
    }

    let handleSubmit = () => {
        // Deletes note if all content is deleted
        if (noteId !== "new" && note === "") {
            handleDelete();
        } 
        // Handles the creation of a new note
        else if (noteId === "new" && note !== "") {
            console.log("NEW NOTE REQUESTED");
            newNote();
        } 
        else if (noteId === "new" && note === "") {
            console.log("NEW NOTE BUT EMPTY");
            return;
        }
        else {
            updateNote();
            console.log("UPDATING NOTE NOT EMPTY")
            navigate("/");
        }
    }

    let deleteNote = async () => {
        await fetch(`http://localhost:8000/notes/${noteId}`, {method: 'DELETE'}); 
    }

    let handleDelete = () => {
        deleteNote();
        navigate("/");
    }

    let newNote = async () => {
        console.log("IN NEW NOTE FUNCTION");
        console.log();

        const data = {
            'body': note,
            'updated': new Date(),
        };

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify(data) 
        };
        console.log("REQUEST OPTIONS", requestOptions);

        await fetch(`http://localhost:8000/notes/`, requestOptions)
        .then(response => response.json())
        .then(tst => {
            console.log("SUCCESS", tst);
        })
        .catch((error) => {
            console.error("ERROR: ", error);
        });
    }
    
    return(
        <div className="note">
            <div className="note-header">
                <h3>
                    <Link to='/' onClick={handleSubmit}>{"<"}</Link>
                </h3>
                <button onClick={handleDelete}>Delete</button>
            </div>

            <textarea onChange={handleNoteChange} value={note} />
        </div>
    );
}

export default NotePage;