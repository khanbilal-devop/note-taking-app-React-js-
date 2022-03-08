import React, { useState } from "react";
import * as Constant from '../Constants';
import PropTypes from 'prop-types';
import ErrorHandler from "../HOC/ErrorHandler";
import { CustomFeedback } from "../CommonComponents/CommonComponent";


const NewNote = ({ id, addNote, errors, errorHandler, errorHandlerInBulk }) => {
    const [note, setNote] = useState(Constant.NEW_NOTE);

    const onChangeNote = (name, value) => {
        try {
            let noteObj = { ...note };
            if (name === 'note' && value?.length > Constant.CHARACTERS_ALLOWED)
                return;
            noteObj = {
                ...noteObj,
                [name]: value
            }
            setNote(noteObj);
            errorHandler('', name);
        } catch (error) {
            console.error(`Error in Components.NewNotes.onChangeNote : ${error}`);
        }
    }

    const onSave = async () => {
        try {
            let noteObj = {
                ...note,
                id: id
            };
            let errorObjectList = [];
            if (!noteObj?.title) {
                errorObjectList.push({
                    key: 'title',
                    errorMessage: 'Title is mandatory'
                });
            }
            if (!noteObj?.note) {
                errorObjectList.push({
                    key: 'note',
                    errorMessage: 'Note is mandatory'
                });
            }
            await errorHandlerInBulk(errorObjectList)
            if (errorObjectList.length === 0) {
                addingDate(noteObj);
                addNote(noteObj)
                setNote(Constant.NEW_NOTE)
            }
        } catch (error) {
            console.error(`Error in Components.NewNotes.onSave : ${error}`);
        }
    }

    const addingDate = (noteObj) => {
        let today = new Date();
        let year = today.getFullYear();
        let month = (today.getMonth() + 1).toString().padStart(2, "0");
        let day = today.getDate().toString().padStart(2, "0");
        noteObj.date = `${day}/${month}/${year}`;
    }

    return (
        <div className="note new">
            <div className="note-body">
                <section>
                    <input
                        autoFocus
                        id="name"
                        value={note?.title}
                        name="title"
                        type="text"
                        placeholder="Title here"
                        onChange={(e) => onChangeNote(e.target.name, e.target.value)}
                        className={errors?.title ? "error" : ''}
                    />
                    <CustomFeedback className="invalid-feedback">
                        {errors?.title}
                    </CustomFeedback>
                </section>
                <section>
                    <textarea
                        value={note?.note}
                        rows={8}
                        cols={6}
                        placeholder='Note here...'
                        name="note"
                        onChange={(e) => onChangeNote(e.target.name, e.target.value)}
                        className={errors?.note ? "error" : ''}
                    />
                    <CustomFeedback className="invalid-feedback">
                        {errors?.note}
                    </CustomFeedback>
                </section>
            </div>
            <div className="note-footer" >
                <small>{Constant.CHARACTERS_ALLOWED - (note?.note).length} Characters Reamining</small>
                <button className="btn" onClick={onSave}> Save </button>
            </div>
        </div>
    )
}


NewNote.propTypes = {
    id: PropTypes.number.isRequired,
    addNote: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    errorHandler: PropTypes.func.isRequired,
    errorHandlerInBulk: PropTypes.func.isRequired
}

export default React.memo(ErrorHandler(NewNote));