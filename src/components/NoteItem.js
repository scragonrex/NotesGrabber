import React, { useContext } from 'react'
import NotesContext from '../context/notes/NotesContext';

const NoteItem = (props) => {
  const context = useContext(NotesContext);
  const { deleteNote } = context;
  const { note, updateNote} = props;
  return (
    
      <div>
        <div className="card-body p-3" style={{borderRadius:"0.5rem" ,boxShadow:"0px 3px 8px 0px grey" }}>
          <div className="d-flex align-items-center" >
            <h5 className="card-title">{note.title}</h5>
            <i className="fa-solid fa-trash mx-2" onClick={()=>{
              deleteNote(note._id); props.showAlert("Item deleted successfully", "success");
            }}></i>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    
  )
}

export default NoteItem;
