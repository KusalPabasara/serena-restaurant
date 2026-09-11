import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/foods', label: 'Foods' },
  { to: '/contact', label: 'Contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  // Home spotlight + Foods cinematic video are dark; keep cream nav text until scroll
  const onDarkHero =
    (location.pathname === '/' || location.pathname === '/foods') &&
    !scrolled &&
    !open

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${
        scrolled || open
          ? 'bg-cream/95 shadow-[0_8px_30px_rgba(28,36,30,0.08)] backdrop-blur-md'
          : onDarkHero
            ? 'bg-gradient-to-b from-forest/70 via-forest/25 to-transparent'
            : 'bg-transparent'
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-8">
        <Link
          to="/"
          className="relative z-[101] flex min-h-11 touch-manipulation items-center gap-3"
          aria-label="Serenā home"
        >
          <img
            src="/logo.jpg"
            alt="Serenā Restaurant"
            className={`h-12 w-auto rounded-sm object-contain md:h-14 ${
              onDarkHero ? 'ring-1 ring-cream/30' : ''
            }`}
          />
        </Link>

        <nav
          className={`hidden items-center gap-1 rounded-full px-2 py-2 backdrop-blur-md md:flex ${
            onDarkHero
              ? 'border border-cream/30 bg-forest/55 shadow-[0_8px_24px_rgba(0,0,0,0.25)]'
              : 'border border-forest/10 bg-cream/85 shadow-[0_4px_18px_rgba(28,36,30,0.06)]'
          }`}
          aria-label="Primary"
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `touch-manipulation rounded-full px-4 py-1.5 text-xs font-medium tracking-[0.16em] uppercase transition-colors ${
                  onDarkHero
                    ? isActive
                      ? 'bg-cream/20 text-cream'
                      : 'text-cream hover:bg-cream/10'
                    : isActive
                      ? 'bg-forest/10 font-semibold text-forest'
                      : 'font-medium text-forest/85 hover:bg-forest/5 hover:text-forest'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className={
              onDarkHero
                ? 'ml-1 inline-flex min-h-11 touch-manipulation items-center rounded-full bg-cream px-5 py-2 text-xs font-semibold tracking-[0.12em] text-forest uppercase transition hover:bg-white'
                : 'btn-primary ml-2 touch-manipulation'
            }
          >
            Reserve
          </Link>
        </nav>

        <button
          type="button"
          className={`relative z-[101] inline-flex h-11 w-11 touch-manipulation items-center justify-center rounded-full border md:hidden ${
            onDarkHero
              ? 'border-cream/40 text-cream'
              : 'border-gold/50 text-forest'
          }`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <div className="flex w-5 flex-col gap-1.5">
            <span
              className={`h-px w-full transition ${
                onDarkHero ? 'bg-cream' : 'bg-forest'
              } ${open ? 'translate-y-[7px] rotate-45' : ''}`}
            />
            <span
              className={`h-px w-full transition ${
                onDarkHero ? 'bg-cream' : 'bg-forest'
              } ${open ? 'opacity-0' : ''}`}
            />
            <span
              className={`h-px w-full transition ${
                onDarkHero ? 'bg-cream' : 'bg-forest'
              } ${open ? '-translate-y-[7px] -rotate-45' : ''}`}
            />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-linen bg-cream/98 md:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-1 px-5 py-6">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-sm font-medium tracking-[0.16em] uppercase ${
                      isActive ? 'bg-linen text-forest' : 'text-forest/80'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link to="/contact" className="btn-primary mt-3 w-full">
                Reserve a table
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
