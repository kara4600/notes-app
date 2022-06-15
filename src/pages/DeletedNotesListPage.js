import React, { useEffect, useState } from "react";
import DeletedItem from "../components/DeletedItem";

const DeletedNotesListPage = () => {
    // Initial value is empty dictionary
    let [deletedNotes, setDeletedNotes] = useState([]);

    useEffect(() => {
        getDeletedNotes();
    }, [])

    let getDeletedNotes = async () => {
        try {
            let response = await fetch(`http://localhost:8000/deleted`);
            let data = await response.json();
            console.log(data);
            setDeletedNotes(data);
        } catch (error) {
            console.log("ERROR: ", error);
        }
    }

    return (
        <div className="notes">
            <div className="notes-header">
                <h2 className="notes-title">Recently Deleted</h2>
                <p className="notes-count">{deletedNotes.length}</p>
            </div>

            <div className="notes-list">
                {deletedNotes.map((entry, index) => (
                    <DeletedItem key={index} deletedNote={entry} />
                ))}
            </div>
        </div>
    );

}

export default DeletedNotesListPage;