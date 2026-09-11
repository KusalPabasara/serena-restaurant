import { Link } from 'react-router-dom'
import { restaurant } from '../data/menu'

export function Footer() {
  return (
    <footer className="bg-forest text-cream">
      <div className="gold-rule opacity-70" />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.2fr_1fr_1fr] md:px-8">
        <div>
          <img
            src="/logo.jpg"
            alt="Serenā"
            className="mb-5 h-16 w-auto rounded-sm bg-cream/95 object-contain p-1"
          />
          <p className="max-w-sm font-serif text-xl leading-relaxed text-cream/90">
            {restaurant.tagline}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-cream/65">
            Contemporary Sri Lankan farm-to-table fine dining in Colombo 07.
          </p>
        </div>

        <div>
          <p className="section-label mb-4 text-gold">Visit</p>
          <p className="text-sm leading-relaxed text-cream/80">{restaurant.address}</p>
          <a
            href={`tel:${restaurant.phone.replace(/\s/g, '')}`}
            className="mt-3 block text-sm text-cream/80 transition hover:text-gold"
          >
            {restaurant.phone}
          </a>
          <a
            href={`mailto:${restaurant.email}`}
            className="mt-1 block text-sm text-cream/80 transition hover:text-gold"
          >
            {restaurant.email}
          </a>
        </div>

        <div>
          <p className="section-label mb-4 text-gold">Hours</p>
          <ul className="space-y-2 text-sm text-cream/80">
            {restaurant.hours.map((row) => (
              <li key={row.day} className="flex flex-col gap-0.5">
                <span className="text-cream">{row.day}</span>
                <span>{row.time}</span>
              </li>
            ))}
          </ul>
          <Link to="/contact" className="btn-secondary mt-6 border-gold/60 text-cream">
            Reserve
          </Link>
        </div>
      </div>
      <div className="border-t border-cream/10 px-5 py-5 text-center text-xs tracking-[0.14em] text-cream/45 uppercase md:px-8">
        © {new Date().getFullYear()} Serenā Restaurant · Colombo
      </div>
    </footer>
  )
}
