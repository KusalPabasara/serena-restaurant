import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { restaurant } from '../data/menu'
import './footer-video.css'

const POSTER =
  'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4f690bd1-881a-4192-82f2-d714d34c8fb9.png'
const VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260901_122529_931c22c8-8d2d-47c0-ad51-b97f56a91e42.mp4'

const COLUMNS = [
  {
    title: 'Explore',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Foods', href: '/foods' },
      { label: 'Contact', href: '/contact' },
      { label: 'Reserve', href: '/contact' },
    ],
  },
  {
    title: 'The Table',
    links: [
      { label: 'Starters', href: '/foods' },
      { label: 'Garden', href: '/foods' },
      { label: 'Sea', href: '/foods' },
      { label: 'Land', href: '/foods' },
      { label: 'Desserts', href: '/foods' },
    ],
  },
  {
    title: 'Visit',
    links: [
      { label: 'Hours', href: '/contact' },
      { label: 'Dress Code', href: '/contact' },
      { label: 'Arrival', href: '/contact' },
      { label: 'Map', href: '/contact' },
    ],
  },
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="site-footer-video" id="site-footer">
      <div className="footer-media" aria-hidden="true">
        <video
          className="footer-bg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={POSTER}
        >
          <source src={VIDEO} type="video/mp4" />
        </video>
      </div>

      <div className="footer-inner">
        <div className="footer-grid">
          <div className="brand">
            <div className="brand-lockup">
              <img src="/logo.jpg" alt="" />
              <p className="brand-name">{restaurant.name}</p>
            </div>
            <p className="brand-blurb">
              {restaurant.tagline} Contemporary Sri Lankan farm-to-table fine dining
              in Colombo 07.
            </p>
            <ul className="contact-list">
              <li>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5v-13Zm2.7-.5L12 10.7 19.3 5H4.7ZM20 6.9l-7.4 5.8a1 1 0 0 1-1.2 0L4 6.9v11.6c0 .3.2.5.5.5h15c.3 0 .5-.2.5-.5V6.9Z" />
                </svg>
                <a href={`mailto:${restaurant.email}`}>{restaurant.email}</a>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M7.6 1.4a1.6 1.6 0 0 0-2.1-.3L3.9 2.2A3.2 3.2 0 0 0 2.6 5.6c1 4 3.2 7.5 6.1 10.4 2.9 2.9 6.4 5.1 10.4 6.1a3.2 3.2 0 0 0 3.4-1.3l1.1-1.6a1.6 1.6 0 0 0-.3-2.1l-3.2-2.6a1.6 1.6 0 0 0-2 0l-1.4 1.1a17 17 0 0 1-5.3-5.3l1.1-1.4a1.6 1.6 0 0 0 0-2L7.6 1.4Z" />
                </svg>
                <a href={`tel:${restaurant.phone.replace(/\s/g, '')}`}>{restaurant.phone}</a>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a7.5 7.5 0 0 0-7.5 7.5c0 5.4 6.5 11.7 6.8 12a1 1 0 0 0 1.4 0c.3-.3 6.8-6.6 6.8-12A7.5 7.5 0 0 0 12 2Zm0 10.2a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Z" />
                </svg>
                <span>{restaurant.address}</span>
              </li>
            </ul>
          </div>

          {COLUMNS.map((col) => (
            <nav className="col" aria-label={col.title} key={col.title}>
              <h2 className="col-title">{col.title}</h2>
              <ul className="link-list">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="newsletter">
            <h2 className="col-title">The Letter</h2>
            <p>
              Early notice on seasonal menus, chef&rsquo;s evenings &amp; members-only
              tastings.
            </p>
            <form className="subscribe" onSubmit={onSubmit}>
              <label className="footer-sr-only" htmlFor="nl-email">
                Email address
              </label>
              <input
                id="nl-email"
                type="email"
                name="email"
                placeholder="Leave your email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" aria-label="Subscribe">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="22"
                  height="22"
                  aria-hidden="true"
                >
                  <path d="M4 12h15M13 6l6 6-6 6" />
                </svg>
              </button>
            </form>
            <p className="subscribe-note" role="status">
              {subscribed ? 'You’re on the list — watch your inbox.' : '\u00a0'}
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.3 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .3-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.3-1-.4-2.2-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.3 2.2-.4 1.3-.1 1.7-.1 4.9-.1Zm0 3.9a5.9 5.9 0 1 0 0 11.8 5.9 5.9 0 0 0 0-11.8Zm0 9.7a3.8 3.8 0 1 1 0-7.6 3.8 3.8 0 0 1 0 7.6Zm7.5-9.9a1.4 1.4 0 1 1-2.8 0 1.4 1.4 0 0 1 2.8 0Z" />
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" />
              </svg>
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.5 3h3.1l-6.8 7.8L21.8 21h-6.3l-4.9-6.4L4.9 21H1.8l7.3-8.3L1.5 3h6.4l4.4 5.9L17.5 3Zm-1.1 16.1h1.7L7.7 4.8H5.9l10.5 14.3Z" />
              </svg>
            </a>
            <Link to="/contact" aria-label="Email reservations">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5v-13Zm2.7-.5L12 10.7 19.3 5H4.7ZM20 6.9l-7.4 5.8a1 1 0 0 1-1.2 0L4 6.9v11.6c0 .3.2.5.5.5h15c.3 0 .5-.2.5-.5V6.9Z" />
              </svg>
            </Link>
          </div>
          <nav className="legal" aria-label="Legal">
            <Link to="/contact">Privacy Notice</Link>
            <Link to="/contact">Terms &amp; Policies</Link>
            <span className="text-ink/55">
              © {new Date().getFullYear()} Serenā
            </span>
          </nav>
        </div>
      </div>
    </footer>
  )
}
