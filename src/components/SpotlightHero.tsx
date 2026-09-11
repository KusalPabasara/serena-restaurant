import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { restaurant } from '../data/menu'

const BG_IMAGE_1 = '/images/hero-dining.webp'
const BG_IMAGE_2 = '/images/open-kitchen.webp'
const SPOTLIGHT_R = 260

/**
 * Cursor/touch spotlight reveal. Mask painting runs in RAF with refs only —
 * no React setState per frame (that was freezing clicks on every device).
 */
export function SpotlightHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const revealRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: -999, y: -999 })
  const smooth = useRef({ x: -999, y: -999 })
  const rafRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const reveal = revealRef.current
    if (!canvas || !reveal) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches

    const sizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    sizeCanvas()

    const setPointer = (clientX: number, clientY: number) => {
      mouse.current.x = clientX
      mouse.current.y = clientY
    }

    const onMouseMove = (e: MouseEvent) => setPointer(e.clientX, e.clientY)
    const onTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return
      setPointer(e.touches[0].clientX, e.touches[0].clientY)
    }
    const onTouchStart = (e: TouchEvent) => {
      if (!e.touches[0]) return
      setPointer(e.touches[0].clientX, e.touches[0].clientY)
    }

    // On touch devices, seed spotlight mid-screen so the reveal is visible
    // without requiring a drag (CTA stays clickable either way).
    if (isTouch) {
      mouse.current.x = window.innerWidth * 0.55
      mouse.current.y = window.innerHeight * 0.42
      smooth.current.x = mouse.current.x
      smooth.current.y = mouse.current.y
    }

    const paint = () => {
      const ease = reduce ? 1 : 0.12
      smooth.current.x += (mouse.current.x - smooth.current.x) * ease
      smooth.current.y += (mouse.current.y - smooth.current.y) * ease

      const x = smooth.current.x
      const y = smooth.current.y

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, SPOTLIGHT_R)
      gradient.addColorStop(0, 'rgba(255,255,255,1)')
      gradient.addColorStop(0.4, 'rgba(255,255,255,1)')
      gradient.addColorStop(0.6, 'rgba(255,255,255,0.75)')
      gradient.addColorStop(0.75, 'rgba(255,255,255,0.4)')
      gradient.addColorStop(0.88, 'rgba(255,255,255,0.12)')
      gradient.addColorStop(1, 'rgba(255,255,255,0)')

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(x, y, SPOTLIGHT_R, 0, Math.PI * 2)
      ctx.fill()

      const maskUrl = `url(${canvas.toDataURL()})`
      reveal.style.setProperty('mask-image', maskUrl)
      reveal.style.setProperty('-webkit-mask-image', maskUrl)
      reveal.style.setProperty('mask-size', '100% 100%')
      reveal.style.setProperty('-webkit-mask-size', '100% 100%')

      rafRef.current = requestAnimationFrame(paint)
    }

    window.addEventListener('resize', sizeCanvas)
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    rafRef.current = requestAnimationFrame(paint)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', sizeCanvas)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-forest"
      style={{ height: '100dvh', minHeight: '100svh' }}
    >
      <div
        className="hero-zoom absolute inset-0 z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
        aria-hidden
      />

      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0"
        style={{ display: 'none' }}
        aria-hidden
      />
      <div
        ref={revealRef}
        className="pointer-events-none absolute inset-0 z-30 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BG_IMAGE_2})` }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0 z-40 bg-gradient-to-b from-forest/50 via-transparent to-forest/75"
        aria-hidden
      />

      <div className="pointer-events-none absolute top-[12%] left-0 right-0 z-[45] flex flex-col items-center px-5 text-center sm:top-[14%]">
        <p
          className="hero-anim hero-fade mb-3 text-[0.65rem] tracking-[0.28em] text-gold uppercase sm:mb-4 sm:text-xs"
          style={{ animationDelay: '0.1s' }}
        >
          Colombo 07 · Farm to table
        </p>
        <h1 className="leading-[0.95] text-cream">
          <span
            className="hero-anim hero-reveal block font-serif text-4xl font-normal italic sm:text-6xl md:text-8xl"
            style={{ letterSpacing: '-0.04em', animationDelay: '0.25s' }}
          >
            Taste holds
          </span>
          <span
            className="hero-anim hero-reveal -mt-1 block font-serif text-4xl font-normal sm:text-6xl md:text-8xl"
            style={{ letterSpacing: '-0.06em', animationDelay: '0.42s' }}
          >
            tales of place
          </span>
        </h1>
      </div>

      <div
        className="hero-anim hero-fade pointer-events-none absolute bottom-28 left-6 z-[45] hidden max-w-[240px] sm:bottom-14 sm:left-10 sm:block md:left-14 md:max-w-[260px]"
        style={{ animationDelay: '0.7s' }}
      >
        <p className="text-sm leading-relaxed text-cream/80">{restaurant.philosophy}</p>
      </div>

      {/* Interactive CTA stack — always above overlays, safe from home-indicator */}
      <div
        className="hero-anim hero-fade absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-5 right-5 z-[60] flex max-w-full flex-col items-stretch gap-3 sm:bottom-24 sm:left-auto sm:right-10 sm:max-w-[260px] sm:items-start sm:gap-5 md:right-14"
        style={{ animationDelay: '0.85s' }}
      >
        <p className="pointer-events-none text-xs leading-relaxed text-cream/80 sm:text-sm">
          <span className="hidden sm:inline">
            Move your cursor to peel back the dining room and glimpse the open kitchen —
            calm, hygiene, and island produce in plain sight.
          </span>
          <span className="sm:hidden">
            Drag to peel back the dining room and glimpse the open kitchen.
          </span>
        </p>
        <Link
          to="/contact"
          className="inline-flex min-h-11 touch-manipulation items-center justify-center rounded-full bg-gold px-7 py-3 text-center text-sm font-medium text-forest transition-transform active:scale-95 hover:bg-[#b8945f] sm:hover:scale-[1.03]"
        >
          Reserve a table
        </Link>
        <Link
          to="/foods"
          className="inline-flex min-h-11 touch-manipulation items-center justify-center rounded-full border border-cream/40 px-7 py-3 text-center text-sm font-medium text-cream transition hover:bg-cream/10 sm:hidden"
        >
          Explore the menu
        </Link>
      </div>
    </section>
  )
}
