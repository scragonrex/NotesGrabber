import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/NotesContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';
function Notes(props) {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNote, editNote} = context;
  const [note, setNote] = useState({id:"", etitle:"", edescription:"", etag:""});
  const [isAdd, setIsAdd] = useState(false);
  useEffect(() => {
    if(localStorage.getItem('token'))
    getNote();
    else
    navigate('/login');

    // eslint-disable-next-line
  }, [])

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
    
  }

  const add = (e) => {
    console.log("Updating the note", note)
    refClose.current.click();
    console.log("new note for updating", note);
    editNote({ title:note.etitle, id:note.id, description:note.edescription, tag:note.etag});
    props.showAlert("Updated successfully", "success");
  }

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      {/* <AddNote showAlert={props.showAlert}/> */}
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-4'>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" value={note.etitle} id="etitle" name="etitle" aria-describedby="emailHelp" onChange={handleChange}  minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea type="text" className="form-control" id="edescription" name="edescription" onChange={handleChange} value={note.edescription} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" onChange={handleChange}  value={note.etag}/>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5}type="button" className="btn btn-primary" onClick={add}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <h2>Your Notes</h2>
        <div className="container mx-1">
          {notes.length===0 && 'No notes available'}
        </div>
        <div className='d-flex flex-wrap gap-3'>
        {
          notes.map((note) => {
            return <NoteItem key={note._id} note={note} showAlert={props.showAlert} updateNote={updateNote} />
          })
        }
        </div>
      </div>
      <i className="fa-solid fa-circle-plus fa-3x mt-4" onClick={()=>setIsAdd(!isAdd)}></i>
      {isAdd && <AddNote showAlert={props.showAlert}/>}
    </>
  )
}

export default Notes
