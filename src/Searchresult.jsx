import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const API_BASE = 'http://localhost:3000'

function formatDate(dateStr) {
  const d = new Date(dateStr)
  const y = d.getFullYear()
  const mo = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const h = String(d.getHours()).padStart(2, '0')
  const min = String(d.getMinutes()).padStart(2, '0')
  return `${y}. ${mo}. ${day}. ${h}:${min}`
}

function SearchResult() {
  const { searchedWord } = useParams()
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!searchedWord || searchedWord.length < 3) {
      setResults([])
      setLoading(false)
      return
    }
    setLoading(true)
    fetch(`${API_BASE}/api/talalkozasok/by-search/${encodeURIComponent(searchedWord)}`)
      .then(r => r.json())
      .then(data => {
        setResults(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [searchedWord])

  if (loading) return (
    <div className="content-panel" style={{ marginTop: 32 }}>
      <div className="loading-state">
        <div style={{ fontSize: '2rem', marginBottom: 12 }}>🔍</div>
        Keresés<span className="loading-dots"></span>
      </div>
    </div>
  )

  if (error) return (
    <div className="content-panel" style={{ marginTop: 32 }}>
      <div className="error-state">⚠️ Hiba: {error}</div>
    </div>
  )

  if (!searchedWord || searchedWord.length < 3) return (
    <div className="content-panel" style={{ marginTop: 32 }}>
      <div className="no-results">Legalább 3 karaktert adj meg a kereséshez.</div>
    </div>
  )

  return (
    <div className="content-panel">
      <div className="panel-header">
        <div className="easter-emoji-row">🔍 🌷 🥚 🌸 🥚 🌷 🔍</div>
        <h1 className="panel-title">Keresési eredmények</h1>
        <p className="panel-subtitle">
          Keresett kifejezés: <strong>„{searchedWord}"</strong>
        </p>
      </div>

      {results.length === 0 ? (
        <div className="no-results">
          „{searchedWord}" részletre nincs találat...
        </div>
      ) : (
        <>
          <div className="search-count">{results.length} találat</div>
          <div className="cards-grid">
            {results.map((m, i) => (
              <div key={i} className="search-card">
                {/* Locsolo */}
                <div className="search-persons-row">
                  <div className="search-person-block">
                    <img
                      src={`/images/${m.locsolo_image}`}
                      alt={m.locsolo_name}
                      className="meeting-avatar"
                      onError={e => { e.target.src = '/images/ver-beno.png' }}
                    />
                    <div className="meeting-person-info">
                      <div className="meeting-person-name">{m.locsolo_name}</div>
                      <div className="meeting-person-gender">💧</div>
                    </div>
                  </div>
                  <span className="search-arrow">💦</span>
                </div>

                {/* Locsolt */}
                <div className="search-person-block">
                  <img
                    src={`/images/${m.locsolt_image}`}
                    alt={m.locsolt_name}
                    className="meeting-avatar"
                    onError={e => { e.target.src = '/images/ver-beno.png' }}
                  />
                  <div className="meeting-person-info">
                    <div className="meeting-person-name">{m.locsolt_name}</div>
                    <div className="meeting-person-gender">🌸</div>
                  </div>
                </div>

                {/* Kölni */}
                <div className="meeting-kolni-row">
                  <img
                    src={`/images/${m.kolni_image}`}
                    alt={m.kolni_name}
                    className="kolni-img"
                    onError={e => { e.target.style.display = 'none' }}
                  />
                  <span className="kolni-name">🧴 {m.kolni_name}</span>
                </div>

                {/* Vers + dátum */}
                <div className="meeting-bottom-row">
                  <span className="vers-title">
                    <span>📜</span> {m.vers_title}
                  </span>
                  <span className="meeting-date">
                    🕐 {formatDate(m.date)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default SearchResult