import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Profile.css'; // Import the CSS file for styling

export default function Profile() {
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch notes for the current user
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const token = localStorage.getItem('cairocodersToken');
                const response = await axios.get('http://localhost:8000/notes', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setNotes(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        };
        fetchNotes();
    }, []);

    const signOut = () => {
        localStorage.removeItem('cairocodersToken');
        localStorage.removeItem('cairocodersUsername');
        navigate("/");
    };

    const deleteNote = async (id) => {
        try {
            const token = localStorage.getItem('cairocodersToken');
            await axios.delete(`http://localhost:8000/notes/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Remove the deleted note from the notes state
            setNotes(notes.filter(note => note._id !== id));
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    return (
        <div className="container">
            <div className="profile-header">
                <h1>Profile Page</h1>
                <p>Hi, {localStorage.getItem('cairocodersUsername') || 'User'}. This is your profile.</p>
            </div>
            <hr />
            <div className="notes-list">
                <h3>Your Notes:</h3>
                {loading ? (
                    <p>Loading notes...</p>
                ) : (
                    <ul>
                        {notes.map((note, index) => (
                            <li key={index}>
                                <strong>{note.title}</strong>: {note.content}
                                <button type='button' className="btn btn-secondary btn-sm" onClick={() => navigate(`/update/${note._id}`)}>Update</button>
                                <button type='button' className="btn btn-danger btn-sm" onClick={() => deleteNote(note._id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="footer-actions">
                <button type='button' className="btn btn-success btn-lg" onClick={signOut}>Sign Out</button>
                <button type='button' className="btn btn-primary btn-lg" onClick={() => navigate("/create")}>New</button>
            </div>
        </div>
    );
}
