import { Link } from 'react-router-dom'
import { formatLkr, type Dish } from '../data/menu'

interface DishCardProps {
  dish: Dish
  compact?: boolean
}

export function DishCard({ dish, compact = false }: DishCardProps) {
  return (
    <article className="dish-tilt group overflow-hidden rounded-[1.25rem] bg-white shadow-[0_18px_50px_rgba(28,36,30,0.08)]">
      <div className={`overflow-hidden ${compact ? 'aspect-[4/3]' : 'aspect-square'}`}>
        <img
          src={dish.image}
          alt={dish.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />
      </div>
      <div className="space-y-3 p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[0.7rem] tracking-[0.18em] text-gold uppercase">
              {dish.category}
            </p>
            <h3 className="mt-1 font-serif text-2xl text-forest">{dish.name}</h3>
          </div>
          <p className="shrink-0 text-sm font-medium text-leaf">{formatLkr(dish.price)}</p>
        </div>
        {!compact && (
          <p className="text-sm leading-relaxed text-ink/70">{dish.description}</p>
        )}
        <p className="text-xs tracking-wide text-leaf/80 italic">{dish.provenance}</p>
        <div className="flex flex-wrap gap-2 pt-1">
          {dish.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-linen bg-cream px-2.5 py-1 text-[0.65rem] tracking-[0.08em] text-leaf uppercase"
            >
              {tag}
            </span>
          ))}
        </div>
        {compact && (
          <Link
            to="/foods"
            className="inline-flex text-xs tracking-[0.14em] text-forest uppercase underline-offset-4 hover:underline"
          >
            View menu
          </Link>
        )}
      </div>
    </article>
  )
}
