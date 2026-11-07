import { useState } from 'react'

const initialForm = { name: '', date: '', location: '', description: '' }

export default function EventForm({ onAdd, onUpdate, onCancel, editingEvent }) {
  const isEditing = Boolean(editingEvent)
  const [form, setForm] = useState(editingEvent ?? initialForm)
  const [error, setError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setForm((previous) => ({ ...previous, [name]: value }))
    if (error) setError('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (form.name.trim().length < 3) {
      setError('Nama acara minimal 3 karakter.')
      return
    }
    if (!form.date) {
      setError('Tanggal acara wajib dipilih.')
      return
    }

    const data = {
      name: form.name.trim(),
      date: form.date,
      location: form.location.trim(),
      description: form.description.trim(),
    }

    if (isEditing) {
      onUpdate(data)
    } else {
      onAdd(data)
      setForm(initialForm)
    }
    setError('')
  }

  return (
    <form className="panel" onSubmit={handleSubmit} noValidate>
      <h2>{isEditing ? 'Edit Acara' : 'Tambah Acara Baru'}</h2>

      <label htmlFor="event-name">Nama acara *</label>
      <input
        id="event-name"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Misalnya Seminar Teknologi"
      />

      <label htmlFor="event-date">Tanggal *</label>
      <input
        id="event-date"
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
      />

      <label htmlFor="event-location">Lokasi</label>
      <input
        id="event-location"
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="Aula fakultas"
      />

      <label htmlFor="event-description">Deskripsi</label>
      <textarea
        id="event-description"
        name="description"
        rows="3"
        value={form.description}
        onChange={handleChange}
        placeholder="Deskripsi singkat kegiatan"
      />

      {error && <p role="alert" className="error">{error}</p>}

      <div className="button-row">
        <button type="submit">
          {isEditing ? 'Simpan Perubahan' : 'Tambah Acara'}
        </button>
        {isEditing && (
          <button type="button" className="secondary" onClick={onCancel}>
            Batal
          </button>
        )}
      </div>
    </form>
  )
}