import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './MyMenu.css'

function MyMenu() {
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    const trimmed = searchValue.trim()
    if (trimmed.length < 3) return
    navigate(`/search/${encodeURIComponent(trimmed)}`)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch(e)
  }

  return (
    <nav className="top-nav">
      <button
        className="home-btn"
        onClick={() => navigate('/')}
        title="Főoldal"
        aria-label="Főoldal"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      </button>

      <div className="nav-brand">
        <span>🐣</span>
        <span className="brand-text">Húsvéti Locsolás</span>
        <span>🌸</span>
      </div>

      <form className="search-form" onSubmit={handleSearch}>
        <span className="search-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </span>
        <input
          type="text"
          className="search-input"
          placeholder="Keresés..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {searchValue.length > 0 && searchValue.length < 3 && (
          <span className="search-hint">min. 3 karakter</span>
        )}
      </form>
    </nav>
  )
}

export default MyMenu