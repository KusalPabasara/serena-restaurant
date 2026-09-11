import { useState, type FormEvent } from 'react'
import { Reveal } from '../components/Reveal'
import { restaurant } from '../data/menu'

interface FormState {
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: string
  notes: string
}

const initial: FormState = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  guests: '2',
  notes: '',
}

export function Contact() {
  const [form, setForm] = useState<FormState>(initial)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitted, setSubmitted] = useState(false)

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {}
    if (!form.name.trim()) next.name = 'Please share your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email.'
    if (form.phone.trim().length < 9) next.phone = 'Enter a valid phone number.'
    if (!form.date) next.date = 'Choose a date.'
    if (!form.time) next.time = 'Choose a time.'
    const guests = Number(form.guests)
    if (!guests || guests < 1 || guests > 12) next.guests = 'Guests must be between 1 and 12.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitted(true)
  }

  const fieldClass =
    'w-full rounded-xl border border-linen bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-gold'

  return (
    <div className="bg-cream">
      <section className="px-5 pb-8 pt-32 md:px-8 md:pt-36">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="section-label mb-3">Contact</p>
            <h1 className="font-serif text-5xl text-forest md:text-6xl">
              Reserve your table
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/70 md:text-lg">
              Tell us when you would like to dine. We will confirm by phone or email
              within a few hours during service days.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <div className="space-y-8 rounded-[1.5rem] border border-linen bg-white p-7 shadow-[0_18px_50px_rgba(28,36,30,0.05)] md:p-9">
              <div>
                <p className="section-label mb-2">Address</p>
                <p className="text-forest">{restaurant.address}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{restaurant.arrival}</p>
              </div>
              <div className="gold-rule" />
              <div>
                <p className="section-label mb-2">Reach us</p>
                <a
                  href={`tel:${restaurant.phone.replace(/\s/g, '')}`}
                  className="block text-forest transition hover:text-leaf"
                >
                  {restaurant.phone}
                </a>
                <a
                  href={`mailto:${restaurant.email}`}
                  className="mt-1 block text-forest transition hover:text-leaf"
                >
                  {restaurant.email}
                </a>
              </div>
              <div>
                <p className="section-label mb-2">Hours</p>
                <ul className="space-y-2 text-sm text-ink/75">
                  {restaurant.hours.map((row) => (
                    <li key={row.day} className="flex flex-col sm:flex-row sm:justify-between sm:gap-4">
                      <span className="text-forest">{row.day}</span>
                      <span>{row.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="section-label mb-2">Dress code</p>
                <p className="text-sm text-ink/70">{restaurant.dressCode}</p>
              </div>
              <div className="overflow-hidden rounded-2xl border border-linen">
                <iframe
                  title="Serenā location map"
                  src={restaurant.mapEmbed}
                  className="h-56 w-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-[1.5rem] border border-linen bg-white p-7 shadow-[0_18px_50px_rgba(28,36,30,0.05)] md:p-9">
              {submitted ? (
                <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
                  <p className="section-label mb-3">Received</p>
                  <h2 className="font-serif text-4xl text-forest">Thank you, {form.name}</h2>
                  <p className="mt-4 max-w-md text-ink/70">
                    Your request for {form.guests} on {form.date} at {form.time} is noted.
                    Our reservations team will confirm shortly.
                  </p>
                  <button
                    type="button"
                    className="btn-secondary mt-8"
                    onClick={() => {
                      setSubmitted(false)
                      setForm(initial)
                    }}
                  >
                    Make another request
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-5">
                  <div>
                    <p className="section-label mb-2">Reservation</p>
                    <h2 className="font-serif text-3xl text-forest">Request a table</h2>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block space-y-1.5 sm:col-span-2">
                      <span className="text-xs tracking-[0.12em] text-leaf uppercase">Name</span>
                      <input
                        className={fieldClass}
                        value={form.name}
                        onChange={(e) => update('name', e.target.value)}
                        autoComplete="name"
                      />
                      {errors.name && <span className="text-xs text-red-700">{errors.name}</span>}
                    </label>
                    <label className="block space-y-1.5">
                      <span className="text-xs tracking-[0.12em] text-leaf uppercase">Email</span>
                      <input
                        type="email"
                        className={fieldClass}
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        autoComplete="email"
                      />
                      {errors.email && <span className="text-xs text-red-700">{errors.email}</span>}
                    </label>
                    <label className="block space-y-1.5">
                      <span className="text-xs tracking-[0.12em] text-leaf uppercase">Phone</span>
                      <input
                        type="tel"
                        className={fieldClass}
                        value={form.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        autoComplete="tel"
                      />
                      {errors.phone && <span className="text-xs text-red-700">{errors.phone}</span>}
                    </label>
                    <label className="block space-y-1.5">
                      <span className="text-xs tracking-[0.12em] text-leaf uppercase">Date</span>
                      <input
                        type="date"
                        className={fieldClass}
                        value={form.date}
                        onChange={(e) => update('date', e.target.value)}
                      />
                      {errors.date && <span className="text-xs text-red-700">{errors.date}</span>}
                    </label>
                    <label className="block space-y-1.5">
                      <span className="text-xs tracking-[0.12em] text-leaf uppercase">Time</span>
                      <select
                        className={fieldClass}
                        value={form.time}
                        onChange={(e) => update('time', e.target.value)}
                      >
                        <option value="">Select</option>
                        <option>12:00</option>
                        <option>12:30</option>
                        <option>13:00</option>
                        <option>13:30</option>
                        <option>18:30</option>
                        <option>19:00</option>
                        <option>19:30</option>
                        <option>20:00</option>
                        <option>20:30</option>
                        <option>21:00</option>
                      </select>
                      {errors.time && <span className="text-xs text-red-700">{errors.time}</span>}
                    </label>
                    <label className="block space-y-1.5 sm:col-span-2">
                      <span className="text-xs tracking-[0.12em] text-leaf uppercase">Guests</span>
                      <input
                        type="number"
                        min={1}
                        max={12}
                        className={fieldClass}
                        value={form.guests}
                        onChange={(e) => update('guests', e.target.value)}
                      />
                      {errors.guests && (
                        <span className="text-xs text-red-700">{errors.guests}</span>
                      )}
                    </label>
                    <label className="block space-y-1.5 sm:col-span-2">
                      <span className="text-xs tracking-[0.12em] text-leaf uppercase">
                        Notes / allergies
                      </span>
                      <textarea
                        rows={4}
                        className={fieldClass}
                        value={form.notes}
                        onChange={(e) => update('notes', e.target.value)}
                        placeholder="Celebrations, dietary needs, preferred seating…"
                      />
                    </label>
                  </div>

                  <button type="submit" className="btn-primary w-full sm:w-auto">
                    Send request
                  </button>
                  <p className="text-xs text-ink/50">
                    Frontend demo — submissions stay in your browser and are not sent to a
                    server.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
