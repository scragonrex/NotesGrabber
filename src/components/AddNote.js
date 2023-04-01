import React, { useContext, useState } from 'react'
import NotesContext from '../context/notes/NotesContext';

const AddNote = (props) => {
        const [note, setNote] = useState({title:"", description:"", tag:""})
        const context = useContext(NotesContext);
        const { addNote } = context;

    const add = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title:"", description:"", tag:""});
        props.showAlert("Added successfully", "success");
    }
    const handleChange = (e)=>{
        setNote({...note,[e.target.name]: e.target.value})
    }
    return (
        <div className="container my-5 p-4" style={{borderRadius:"1rem", boxShadow:"0px 3px 8px 0px grey"}}>
            <h2>Add Notes</h2>
            <form className='my-4'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" value={note.title} className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={handleChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea type="text" rows='4' className="form-control" id="description" name="description" value={note.description} onChange={handleChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={handleChange} minLength={5} required />
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={add}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote;
