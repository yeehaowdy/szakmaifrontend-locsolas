import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

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

function Locsoltak() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [meetings, setMeetings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [locsolt, setLocsolt] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE}/api/talalkozasok/by-locsolt/${id}`)
      .then(r => r.json())
      .then(data => {
        setMeetings(data)
        // We need locsolt info – fetch from main endpoint
        return fetch(`${API_BASE}/api/talalkozasok`)
      })
      .then(r => r.json())
      .then(allData => {
        const found = allData.find(t => String(t.locsolt_id) === String(id))
        if (found) {
          setLocsolt({
            id: found.locsolt_id,
            name: found.locsolt_name,
            gender: found.locsolt_gender,
            image: found.locsolt_image,
          })
        }
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  const genderLabel = (g) => g === 'girl' ? '🌸 Lány' : '💧 Fiú'

  if (loading) return (
    <div className="content-panel" style={{ marginTop: 32 }}>
      <div className="loading-state">
        <div style={{ fontSize: '2rem', marginBottom: 12 }}>🌷</div>
        Locsolások betöltése<span className="loading-dots"></span>
      </div>
    </div>
  )

  if (error) return (
    <div className="content-panel" style={{ marginTop: 32 }}>
      <div className="error-state">⚠️ Hiba: {error}</div>
    </div>
  )

  return (
    <div className="content-panel">
      <button className="back-btn" onClick={() => navigate('/')}>
        ← Vissza
      </button>

      {locsolt && (
        <div className="locsolt-header">
          <img
            src={locsolt.image}
            alt={locsolt.name}
            className="locsolt-header-img"
            onError={e => { e.target.src = '/images/ver-beno.png' }}
          />
          <div>
            <div className="locsolt-header-name">{locsolt.name}</div>
            <div className="locsolt-header-sub">
              <span>{genderLabel(locsolt.gender)}</span>
              <span>·</span>
              <span>💦 {meetings.length} locsolás</span>
            </div>
          </div>
        </div>
      )}

      <div style={{ textAlign: 'center', marginBottom: 20, fontSize: '1.4rem', letterSpacing: 6 }}>
        🌷 🥚 🌷 🥚 🌷
      </div>

      <div className="cards-grid">
        {meetings.map((m, i) => (
          <div key={i} className="meeting-card">
            <div className="meeting-person-row">
              <img
                src={m.locsolo_image}
                alt={m.locsolo_name}
                className="meeting-avatar"
                onError={e => { e.target.src = '/images/ver-beno.png' }}
              />
              <div className="meeting-person-info">
                <div className="meeting-person-name">{m.locsolo_name}</div>
                <div className="meeting-person-gender">{genderLabel(m.locsolo_gender)}</div>
              </div>
            </div>

            <div className="meeting-kolni-row">
              <img
                src={m.kolni_image}
                alt={m.kolni_name}
                className="kolni-img"
                onError={e => { e.target.style.display = 'none' }}
              />
              <span className="kolni-name">🧴 {m.kolni_name}</span>
            </div>

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

      {meetings.length === 0 && (
        <div className="no-results">Nincsenek locsolások ehhez a személyhez.</div>
      )}
    </div>
  )
}

export default Locsoltak