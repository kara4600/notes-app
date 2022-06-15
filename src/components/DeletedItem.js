import React from "react";
import { Link } from "react-router-dom";

const DeletedItem = ({deletedNote}) => {
    return (
        <Link to={`/deleted/${deletedNote.id}`}>
            <div className="notes-list-item">
                <h3>{deletedNote.body}</h3>
            </div>
        </Link>
    );
}

export default DeletedItem;