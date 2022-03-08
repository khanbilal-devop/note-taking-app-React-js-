import { AiOutlineDelete } from "react-icons/ai";
import PropTypes from 'prop-types';
import { memo } from "react";



const Note = ({ note, deleteNote }) => {
    return (<div className="note">
        <div className="note-body">
            <p className="title-text">{note?.title}</p>
            <p className="note-text">{note?.note}</p>
        </div>

        <div className="note-footer">
            <span>{note?.date}</span>
            <AiOutlineDelete className="delete-icon" size={'1.3em'} onClick={() => deleteNote(note?.id)} />
        </div>
    </div>)
}




const isPropsEqual = (prevProps, nextProps) => {
    let prevObject = Object.entries(prevProps?.note).toString();
    let nextObject = Object.entries(nextProps?.note).toString();
    return prevObject === nextObject
}

Note.propTypes = {
    deleteNote: PropTypes.func.isRequired,
    note: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        note: PropTypes.string.isRequired
    })
}

export default memo(Note, isPropsEqual);