import { Fragment, useCallback, useEffect, useState } from 'react';
import Header from './Components/Header';
import NewNote from './Components/NewNotes';
import Note from './Components/Note';
import * as Constant from './Constants';

function App() {

  const [notes, setNotes] = useState(Constant.notes);
  const [searchText, setSearchText] = useState('');
  const [darkMode, setDarkMode] = useState(false);


  useEffect(() => {
    let notesArray = JSON.parse(window.localStorage.getItem('notes') || '[]');
    if (notesArray.length > 0) {
      setNotes(notesArray);
    }
  }, []);


  useEffect(() =>
    window.localStorage.setItem('notes', JSON.stringify(notes))
    , [notes]);




  const addNote = useCallback((note) => {
    let notesArray = [...notes];
    notesArray.push(note);
    setNotes(notesArray);
  },[notes]);

  const deleteNote = (id) => {
    setNotes(
      (prevState) => (prevState || []).filter(each => each?.id !== id)
    );
  }

  return (
    <Fragment>
      <div className={`${darkMode ? 'dark-mode' : ''}`}>
        <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
          <Header searchText={searchText} onSearchChange={setSearchText} darkMode={darkMode} onChangeToggle={setDarkMode} />
          <div className='note-list'>
            {
              (notes || [])
                .filter(each => {
                  let included = true;
                  if (searchText.trim().length > 0) {
                    included = each.title.includes(searchText);
                  }
                  return included;
                })
                .map(each => <Note note={each} deleteNote={deleteNote} key={each?.id} />)
            }
            <NewNote addNote={addNote} id={notes.length + 1} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
