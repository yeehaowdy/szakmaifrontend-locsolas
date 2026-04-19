import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_BASE = 'http://localhost:3000'

function Home() {
  const [locsoltPersons, setLocsoltPersons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`${API_BASE}/api/talalkozasok`)
      .then(r => r.json())
      .then(data => {
        // Group by locsolt_id to get unique persons + count
        const map = {}
        data.forEach(t => {
          if (!map[t.locsolt_id]) {
            map[t.locsolt_id] = {
              id: t.locsolt_id,
              name: t.locsolt_name,
              gender: t.locsolt_gender,
              image: t.locsolt_image,
              count: 0
            }
          }
          map[t.locsolt_id].count++
        })
        setLocsoltPersons(Object.values(map))
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const genderLabel = (g) => g === 'girl' ? '🌸 Lány' : '💧 Fiú'

  if (loading) return (
    <div className="content-panel" style={{ marginTop: 32 }}>
      <div className="loading-state">
        <div style={{ fontSize: '2rem', marginBottom: 12 }}>🐰</div>
        Adatok betöltése<span className="loading-dots"></span>
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
      <div className="panel-header">
        <div className="easter-emoji-row">🥚 🌷 🐣 🌸 🥚 🐇 🌷 🥚</div>
        <h1 className="panel-title">Húsvéti Locsolás</h1>
        <p className="panel-subtitle">Válassz egy locsolt személyt a találkozások megtekintéséhez!</p>
      </div>

      <div className="cards-grid">
        {locsoltPersons.map(person => (
          <div
            key={person.id}
            className="person-card"
            onClick={() => navigate(`/locsoltak/${person.id}`)}
          >
            <img
              src={person.image}
              alt={person.name}
              className="person-card-img"
              onError={e => { e.target.src = '/images/ver-beno.png' }}
            />
            <div className="person-card-body">
              <div className="person-card-name">{person.name}</div>
              <div className="person-card-gender">{genderLabel(person.gender)}</div>
              <span className="count-badge">
                <span>💦</span>
                {person.count} locsolás
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home