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
    // API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhNmNmZTkzNDFjZjQ5ZWNiM2NjZTkwIn0sImlhdCI6MTY4ODY2MjYwNX0.QEnoNYdj5oUMyREWQdFRILXf5O3znymLOX4MBeqj4Ac'
      },
      body: JSON.stringify({title, description, tag})
    });
    
    const json = await response.json();
    console.log(json)

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
  const deleteNote = async (id) => {
    // API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhNmNmZTkzNDFjZjQ5ZWNiM2NjZTkwIn0sImlhdCI6MTY4ODY2MjYwNX0.QEnoNYdj5oUMyREWQdFRILXf5O3znymLOX4MBeqj4Ac'
      }
    });
    const json = await response.json();
    console.log(json)

    console.log("Deleting the note with id " + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhNmNmZTkzNDFjZjQ5ZWNiM2NjZTkwIn0sImlhdCI6MTY4ODY2MjYwNX0.QEnoNYdj5oUMyREWQdFRILXf5O3znymLOX4MBeqj4Ac'
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;