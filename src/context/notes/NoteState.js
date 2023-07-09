import React, { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
    const notesIntial = [
        {
          "_id": "64a96cb290187b4e7cc95b45",
          "user": "64a6cfe9341cf49ecb3cce90",
          "title": "My Title",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2023-07-08T14:03:30.051Z",
          "__v": 0
        },
        {
          "_id": "64aac59e3616393f722264e9",
          "user": "64a6cfe9341cf49ecb3cce90",
          "title": "My Title1",
          "description": "Please wake up early1",
          "tag": "personal1",
          "date": "2023-07-09T14:35:10.155Z",
          "__v": 0
        },
        {
          "_id": "64aac5ae3616393f722264ec",
          "user": "64a6cfe9341cf49ecb3cce90",
          "title": "My Title2",
          "description": "Please wake up early2",
          "tag": "personal2",
          "date": "2023-07-09T14:35:26.163Z",
          "__v": 0
        }
      ]
    
      const [notes, setNotes] = useState(notesIntial)

    return(
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;