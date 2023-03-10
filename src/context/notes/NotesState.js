import { useState } from "react";
import NotesContext from "./NotesContext";

const NotesState = (props)=>{
  const host = "https://notesgrabberbackend.onrender.com";
  const notesInitial = []
  
  const [notes, setNotes] = useState(notesInitial)

  
     //Get all note
     const getNote =async ()=>{
      const response = await fetch(`${host}/api/notes/getallnotes`, {
        method:'GET',
        headers:{
          'Content-type':'application/json',
          "auth-token":localStorage.getItem('token')
        },
      });
      const json = await response.json();
      console.log(json);
      setNotes(json);
    }
        //Add a note
        const addNote =async (title, description, tag)=>{
          const response = await fetch(`${host}/api/notes/addnote`, {
            method:'POST',
            headers:{
              'Content-type':'application/json',
              "auth-token":localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
          });
          const note = await response.json();
          setNotes(notes.concat(note));
        }
          
      

        //Delete a note
        const deleteNote =async (id)=>{
          const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method:'DELETE',
            headers:{
              'Content-type':'application/json',
              "auth-token":localStorage.getItem('token')
            },
          });
          const json = await response.json();
          console.log(json);
          const newNote =notes.filter((note)=>{return note._id!==id})
          setNotes(newNote);
        }

        //Edit a note
        const editNote =async ({id, title, description, tag})=>{
          const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method:'PUT',
            headers:{
              'Content-type':'application/json',
              "auth-token":localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
          });
          const json = await response.json();
          console.log(json);
          let newNotes = JSON.parse(JSON.stringify(notes));
          for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
           
            if(element._id === id)
            {
              newNotes[index].title = title;
              newNotes[index].description = description;
              newNotes[index].tag = tag;
              console.log("FOUND",element);
              break;
            } 
          }
          setNotes(newNotes);
        }


    return(
        <NotesContext.Provider value={{notes, addNote, deleteNote, editNote, getNote}}>
            {props.children}
        </NotesContext.Provider>
    )
}

export default NotesState