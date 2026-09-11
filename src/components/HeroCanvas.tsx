import { usePrefersReducedMotion } from '../hooks/useMedia'

/**
 * Hero visual — photoreal plate media with restrained 3D CSS motion.
 * (Replaces the previous abstract WebGL fork/plate.)
 */
export function HeroCanvas() {
  const reduce = usePrefersReducedMotion()

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div
        className={`relative w-full max-w-[22rem] md:max-w-none ${
          reduce ? '' : 'hero-plate-float'
        }`}
        style={{
          transform: 'perspective(1200px) rotateY(-8deg) rotateX(4deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="absolute -inset-3 rounded-[1.75rem] border border-gold/35" />
        <div className="absolute -inset-6 -z-10 rounded-full bg-gold/10 blur-2xl" />

        <figure className="overflow-hidden rounded-[1.5rem] bg-white shadow-[0_28px_70px_rgba(28,36,30,0.18)] ring-1 ring-forest/10">
          <img
            src="/images/hero-plate.webp"
            alt="Serenā signature plate — lagoon prawns with coconut foam"
            className={`aspect-square w-full object-cover ${reduce ? '' : 'hero-plate- ken'}`}
          />
          <figcaption className="border-t border-linen bg-cream/95 px-5 py-4">
            <p className="text-[0.65rem] tracking-[0.2em] text-gold uppercase">Signature</p>
            <p className="mt-1 font-serif text-xl text-forest">Lagoon Prawns</p>
            <p className="mt-0.5 text-xs text-leaf/80 italic">Same-day coastal catch · coconut foam</p>
          </figcaption>
        </figure>

        <div
          aria-hidden
          className="pointer-events-none absolute -top-3 -right-3 h-14 w-14 rounded-full border border-gold/50 bg-cream/80 backdrop-blur-sm"
          style={{ transform: 'translateZ(36px)' }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-4 -left-2 h-10 w-10 rounded-full bg-forest/90"
          style={{ transform: 'translateZ(24px)' }}
        />
      </div>

      <style>{`
        @keyframes hero-plate-float {
          0%, 100% { transform: perspective(1200px) rotateY(-8deg) rotateX(4deg) translateY(0); }
          50% { transform: perspective(1200px) rotateY(-4deg) rotateX(2deg) translateY(-12px); }
        }
        @keyframes hero-plate-ken {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.045); }
        }
        .hero-plate-float {
          animation: hero-plate-float 7s ease-in-out infinite;
        }
        .hero-plate-ken {
          animation: hero-plate-ken 14s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-plate-float,
          .hero-plate-ken {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}
