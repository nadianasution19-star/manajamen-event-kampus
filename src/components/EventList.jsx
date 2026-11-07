export default function EventList({ events, onDelete, onEdit }) {
  if (events.length === 0) {
    return (
      <section className="panel">
        <h2>Daftar Acara</h2>
        <p>Belum ada acara. Tambahkan melalui form di samping.</p>
      </section>
    )
  }

  return (
    <section className="panel">
      <h2>Daftar Acara</h2>
      <div className="event-list">
        {events.map((event) => (
          <article className="event-card" key={event.id}>
            <h3>{event.name}</h3>
            <p>📅 {event.date}</p>
            {event.location && <p>📍 {event.location}</p>}
            {event.description && <p>{event.description}</p>}
            <div className="button-row">
            <button type="button" onClick={() => onEdit(event)}>
              Edit
            </button>
            <button type="button" className="danger" onClick={() => onDelete(event.id)}>
              Hapus
            </button>
          </div>
          </article>
        ))}
      </div>
    </section>
  )
}