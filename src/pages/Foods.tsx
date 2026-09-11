import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { DishCard } from '../components/DishCard'
import { Reveal } from '../components/Reveal'
import { CATEGORIES, menu, type MenuCategory } from '../data/menu'

type Filter = 'All' | MenuCategory

export function Foods() {
  const [filter, setFilter] = useState<Filter>('All')

  const dishes = useMemo(
    () => (filter === 'All' ? menu : menu.filter((d) => d.category === filter)),
    [filter],
  )

  const chips: Filter[] = ['All', ...CATEGORIES]

  return (
    <div className="bg-cream">
      <section className="relative overflow-hidden px-5 pb-12 pt-32 md:px-8 md:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(196,165,116,0.18),transparent_45%)]" />
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <p className="section-label mb-3">The menu</p>
            <h1 className="font-serif text-5xl text-forest md:text-6xl">Foods</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/70 md:text-lg">
              A seasonal Sri Lankan table — starters, garden plates, sea and land,
              then desserts that finish soft. Prices in LKR. Dietary notes on every
              dish.
            </p>
          </Reveal>
          <div className="gold-rule my-8 max-w-md" />
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
                  className={`min-h-11 rounded-full px-4 py-2 text-xs tracking-[0.14em] uppercase transition ${
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
