import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { DishCard } from '../components/DishCard'
import { GoldRuleDraw, Reveal } from '../components/Reveal'
import { CATEGORIES, menu, type MenuCategory } from '../data/menu'

type Filter = 'All' | MenuCategory

const TRACKS_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_063509_7d167302-4fd4-480b-8260-18ab572333d4.mp4'

export function Foods() {
  const [filter, setFilter] = useState<Filter>('All')

  const dishes = useMemo(
    () => (filter === 'All' ? menu : menu.filter((d) => d.category === filter)),
    [filter],
  )

  const chips: Filter[] = ['All', ...CATEGORIES]

  return (
    <div className="bg-cream">
      {/* Cinematic tracks hero — securify layout, Serenā menu content */}
      <section className="relative h-[70svh] min-h-[380px] w-full overflow-hidden bg-forest md:h-[85svh]">
        <video
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster="/images/produce-still.webp"
          src={TRACKS_VIDEO}
        />
        <div className="pointer-events-none absolute inset-0 bg-forest/45" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-forest/80"
          aria-hidden
        />

        <div className="pointer-events-none relative h-full w-full pt-24">
          <h1 className="tracks-title absolute top-[20%] left-4 text-[13vw] font-medium text-cream md:left-10 md:top-[22%] md:text-[11vw]">
            taste
          </h1>
          <h1 className="tracks-title absolute top-[38%] right-4 text-[13vw] font-medium text-cream md:right-10 md:top-[40%] md:text-[11vw]">
            the
          </h1>
          <h1 className="tracks-title absolute top-[56%] left-[14%] text-[13vw] font-medium text-cream md:left-[26%] md:top-[58%] md:text-[11vw]">
            season
          </h1>

          <p className="absolute top-[46%] left-5 hidden max-w-[220px] text-[14px] leading-snug text-cream/90 sm:block md:left-10 md:max-w-[260px] md:text-[15px]">
            five courses from island soil — starters, garden, sea, land, and a soft finish
          </p>

          <div className="absolute top-[16%] right-5 md:right-20">
            <div className="flex items-center justify-end gap-3">
              <span className="hidden h-px w-20 rotate-[20deg] bg-cream/40 md:block" />
              <span className="text-3xl font-medium tracking-tight text-cream sm:text-4xl md:text-5xl">
                {menu.length}
              </span>
            </div>
            <p className="mt-1 text-right text-xs text-cream/70 md:text-sm">plates tonight</p>
          </div>

          <div className="absolute bottom-20 left-5 md:bottom-20 md:left-16">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-medium tracking-tight text-cream sm:text-4xl md:text-5xl">
                5
              </span>
              <span className="hidden h-px w-20 rotate-[-20deg] bg-cream/40 md:block" />
            </div>
            <p className="mt-1 text-xs text-cream/70 md:text-sm">menu tracks</p>
          </div>
        </div>

        <div className="pointer-events-auto absolute right-5 bottom-[max(1rem,env(safe-area-inset-bottom))] z-20 md:right-16 md:bottom-16">
          <Link
            to="/contact"
            className="inline-flex min-h-11 touch-manipulation items-center rounded-full bg-cream px-6 py-3 text-xs font-medium tracking-[0.12em] text-forest uppercase transition hover:bg-white"
          >
            reserve
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden px-5 py-14 md:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="section-label mb-3">The menu</p>
            <h2 className="font-serif text-4xl text-forest md:text-5xl">Choose a track</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/70 md:text-lg">
              A seasonal Sri Lankan table — starters, garden plates, sea and land,
              then desserts that finish soft. Prices in LKR. Dietary notes on every
              dish.
            </p>
          </Reveal>
          <GoldRuleDraw className="my-8 max-w-md" />
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Menu categories">
            {chips.map((chip) => {
              const active = filter === chip
              return (
                <button
                  key={chip}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(chip)}
                  className={`min-h-11 touch-manipulation rounded-full px-4 py-2 text-xs tracking-[0.14em] uppercase transition ${
                    active
                      ? 'bg-forest text-cream'
                      : 'border border-linen bg-white text-leaf hover:border-gold/60'
                  }`}
                >
                  {chip}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-8">
        <div className="mx-auto max-w-6xl">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {dishes.map((dish, i) => (
                <Reveal key={dish.id} delay={Math.min(i * 0.04, 0.24)}>
                  <DishCard dish={dish} />
                </Reveal>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
