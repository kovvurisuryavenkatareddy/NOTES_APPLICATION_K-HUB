import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchToken } from './Auth.js';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const token = fetchToken();
    try {
      const response = await axios.get('http://localhost:8000/notes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes', error);
    }
  };

  const handleCreateOrUpdateNote = async () => {
    const token = fetchToken();
    try {
      if (editId) {
        await axios.put(`http://localhost:8000/notes/${editId}`, { title, content }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('http://localhost:8000/notes', { title, content }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setTitle('');
      setContent('');
      setEditId(null);
      fetchNotes();
    } catch (error) {
      console.error('Error creating or updating note', error);
    }
  };

  const handleEditNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note._id);
  };

  const handleDeleteNote = async (id) => {
    const token = fetchToken();
    try {
      await axios.delete(`http://localhost:8000/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note', error);
    }
  };

  return (
    <div>
      <h2>Notes</h2>
      <div>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
        <button onClick={handleCreateOrUpdateNote}>{editId ? 'Update Note' : 'Create Note'}</button>
      </div>
      <div>
        {notes.map(note => (
          <div key={note._id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => handleEditNote(note)}>Edit</button>
            <button onClick={() => handleDeleteNote(note._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
