import React, { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesIntial = []

  const [notes, setNotes] = useState(notesIntial)

  // Get all Notes
  const getNotes = async () => {
    // API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhNmNmZTkzNDFjZjQ5ZWNiM2NjZTkwIn0sImlhdCI6MTY4ODY2MjYwNX0.QEnoNYdj5oUMyREWQdFRILXf5O3znymLOX4MBeqj4Ac'
      }
    });

    const json = await response.json()
    console.log(json)
    setNotes(json)
  }

  //Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhNmNmZTkzNDFjZjQ5ZWNiM2NjZTkwIn0sImlhdCI6MTY4ODY2MjYwNX0.QEnoNYdj5oUMyREWQdFRILXf5O3znymLOX4MBeqj4Ac'
      },
      body: JSON.stringify({title, description, tag})
    });
    
    console.log("Adding a new note")
    const note = {
      "_id": "64aac5ae3616393f722264ec4",
      "user": "64a6cfe9341cf49ecb3cce90",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-07-09T14:35:26.163Z",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }

  //Delete a Note
  const deleteNote = (id) => {
    // TODO: API call
    console.log("Deleting the note with id " + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhNmNmZTkzNDFjZjQ5ZWNiM2NjZTkwIn0sImlhdCI6MTY4ODY2MjYwNX0.QEnoNYdj5oUMyREWQdFRILXf5O3znymLOX4MBeqj4Ac'
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = response.json();

    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;