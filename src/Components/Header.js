import { MdSearch } from 'react-icons/md'
import PropTypes from 'prop-types';
import React from 'react';

function Header({ searchText, onSearchChange, darkMode, onChangeToggle }) {
    return (
        <div className='header'>
            <section className='header-upper'>
                <h1 className={darkMode ? 'dark-mode-text' : ''}>Notes</h1>
                <button className='btn-header' onClick={() => onChangeToggle((prevState) => !prevState)}>Toggle</button>
            </section>
            <section className='search-bar'>
                <MdSearch size={'1.3em'} className='search-icon' />
                <input
                    name='search'
                    type='text'
                    placeholder='Type to Search...'
                    autoComplete='Off'
                    value={searchText}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </section>
        </div>
    )
}


Header.propTypes = {
    searchText: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    darkMode: PropTypes.bool.isRequired,
    onChangeToggle: PropTypes.func.isRequired,
}


export default React.memo(Header)