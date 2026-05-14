import { useMemo, useState } from 'react'
import './App.css'

const categories = ['All', 'Politics', 'Economy', 'Culture', 'Daily life']

/** Picsum with per-article seeds — reliable hotlinking; onError shows CSS fallback. */
const news = [
  {
    id: 1,
    category: 'Politics',
    title: 'Austrian coalition talks focus on climate and migration',
    excerpt:
      'Party leaders met in Vienna to outline priorities before the next parliamentary session, with energy policy high on the agenda.',
    date: '2026-05-12',
    readTime: '4 min read',
    image: 'https://picsum.photos/seed/skymessage-politics-1/1200/750',
    body: [
      'Negotiations continued this week as coalition partners sought common ground on renewable targets and border procedures.',
      'Analysts expect a draft programme by month’s end, though regional governors have asked for more say on infrastructure spending.',
    ],
  },
  {
    id: 2,
    category: 'Economy',
    title: 'Inflation eases as services prices stabilise',
    excerpt:
      'Latest figures suggest core inflation has cooled, while the labour market remains tight in urban centres.',
    date: '2026-05-10',
    readTime: '3 min read',
    image: 'https://picsum.photos/seed/skymessage-economy-1/1200/750',
    body: [
      'Economists noted a slower pace of price growth in hospitality and transport, partly offset by housing costs.',
      'The central bank signalled a cautious approach to rates, citing uncertainty in global trade.',
    ],
  },
  {
    id: 3,
    category: 'Culture',
    title: 'Vienna festival season opens with new commissions',
    excerpt:
      'Contemporary works share the bill with classics; several premieres sold out within hours.',
    date: '2026-05-08',
    readTime: '5 min read',
    image: 'https://picsum.photos/seed/skymessage-culture-1/1200/750',
    body: [
      'Organisers highlighted collaborations with regional ensembles and a stronger focus on accessibility.',
      'Critics praised the opening night’s staging, calling it a confident start to the summer programme.',
    ],
  },
  {
    id: 4,
    category: 'Daily life',
    title: 'Night trains expand links to neighbouring capitals',
    excerpt:
      'New timetables add sleeper options on popular routes, with upgraded couchette cars.',
    date: '2026-05-06',
    readTime: '2 min read',
    image: 'https://picsum.photos/seed/skymessage-daily-1/1200/750',
    body: [
      'Rail operators reported strong advance bookings after the expanded schedule was announced.',
      'Environmental groups welcomed the move as a practical alternative to short-haul flights.',
    ],
  },
  {
    id: 5,
    category: 'Politics',
    title: 'Regional vote sets tone for autumn policy debates',
    excerpt:
      'Turnout was steady; local issues dominated campaigns more than national party brands.',
    date: '2026-05-04',
    readTime: '3 min read',
    image: 'https://picsum.photos/seed/skymessage-politics-2/1200/750',
    body: [
      'Incumbents held most seats, but smaller lists gained ground in two districts.',
      'Observers said the results could influence coalition bargaining on education funding.',
    ],
  },
  {
    id: 6,
    category: 'Economy',
    title: 'SMEs test digital tools for cross-border sales',
    excerpt:
      'A pilot programme helps exporters navigate compliance and logistics in a single portal.',
    date: '2026-05-02',
    readTime: '4 min read',
    image: 'https://picsum.photos/seed/skymessage-economy-2/1200/750',
    body: [
      'Participating firms reported faster onboarding for customs paperwork and clearer VAT guidance.',
      'Officials plan to widen access if satisfaction scores stay above target through the summer.',
    ],
  },
]

function formatDate(iso) {
  try {
    return new Intl.DateTimeFormat('en-AT', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

function ArticleImage({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className={`news-image-fallback ${className}`.trim()}
        role="img"
        aria-label={alt || 'Image unavailable'}
      />
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  )
}

function App() {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(() => {
    if (filter === 'All') return news
    return news.filter((item) => item.category === filter)
  }, [filter])

  const [featured, ...rest] = filtered

  return (
    <div className="news-site">
      <header className="news-header">
        <nav className="news-nav" aria-label="Primary">
          <span className="news-brand">skyMessage</span>
          <div className="news-nav-links">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={filter === cat ? 'active' : ''}
                onClick={() => setFilter(cat)}
              >
                {cat === 'All' ? 'Today' : cat}
              </button>
            ))}
          </div>
        </nav>

        <div className="news-flag-ribbon" aria-hidden="true">
          <span className="news-flag-ribbon__band news-flag-ribbon__band--deep" />
          <span className="news-flag-ribbon__band news-flag-ribbon__band--sun" />
          <span className="news-flag-ribbon__band news-flag-ribbon__band--mist" />
        </div>

        <div className="news-hero">
          <div className="news-hero__glow" aria-hidden="true" />
          <div className="news-hero__inner">
            <h1>News from Austria</h1>
            <p>
              Politics, economy, culture, and daily life — short briefs. Open
              a story to read on.
            </p>
          </div>
        </div>
      </header>

      <main className="news-main">
        {!featured ? (
          <p className="empty-state">No stories in this category yet.</p>
        ) : (
          <>
            <p className="news-section-title">Featured</p>
            <div className="news-featured">
              <article className="news-card featured">
                <button type="button" onClick={() => setSelected(featured)}>
                  <div className="news-card-media">
                    <ArticleImage src={featured.image} alt="" />
                  </div>
                  <div className="news-card-body">
                    <div className="news-meta">
                      <span className="news-category">{featured.category}</span>
                      <span className="news-meta-sep" aria-hidden>
                        ·
                      </span>
                      <span>{formatDate(featured.date)}</span>
                      <span className="news-meta-sep" aria-hidden>
                        ·
                      </span>
                      <span>{featured.readTime}</span>
                    </div>
                    <h2>{featured.title}</h2>
                    <p className="excerpt">{featured.excerpt}</p>
                  </div>
                </button>
              </article>

              {rest[0] && (
                <article className="news-card">
                  <button type="button" onClick={() => setSelected(rest[0])}>
                    <div className="news-card-media">
                      <ArticleImage src={rest[0].image} alt="" />
                    </div>
                    <div className="news-card-body">
                      <div className="news-meta">
                        <span className="news-category">{rest[0].category}</span>
                        <span className="news-meta-sep" aria-hidden>
                          ·
                        </span>
                        <span>{formatDate(rest[0].date)}</span>
                      </div>
                      <h2>{rest[0].title}</h2>
                      <p className="excerpt">{rest[0].excerpt}</p>
                    </div>
                  </button>
                </article>
              )}
            </div>

            {rest.length > 1 && (
              <>
                <p className="news-section-title">More stories</p>
                <div className="news-grid">
                  {rest.slice(1).map((item) => (
                    <article key={item.id} className="news-card">
                      <button type="button" onClick={() => setSelected(item)}>
                        <div className="news-card-media">
                          <ArticleImage src={item.image} alt="" />
                        </div>
                        <div className="news-card-body">
                          <div className="news-meta">
                            <span className="news-category">{item.category}</span>
                            <span className="news-meta-sep" aria-hidden>
                              ·
                            </span>
                            <span>{formatDate(item.date)}</span>
                          </div>
                          <h2>{item.title}</h2>
                          <p className="excerpt">{item.excerpt}</p>
                        </div>
                      </button>
                    </article>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </main>

      <footer className="news-footer">
        skyMessage. hotos via Picsum (fallback if offline).
      </footer>

      {selected && (
        <div
          className="news-overlay"
          role="presentation"
          onClick={() => setSelected(null)}
        >
          <div
            className="news-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="article-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="news-modal-header">
              <ArticleImage src={selected.image} alt="" />
              <button
                type="button"
                className="news-modal-close"
                aria-label="Close article"
                onClick={() => setSelected(null)}
              >
                ×
              </button>
            </div>
            <div className="news-modal-body">
              <div className="news-meta">
                <span className="news-category">{selected.category}</span>
                <span className="news-meta-sep" aria-hidden>
                  ·
                </span>
                <span>{formatDate(selected.date)}</span>
                <span className="news-meta-sep" aria-hidden>
                  ·
                </span>
                <span>{selected.readTime}</span>
              </div>
              <h2 id="article-title">{selected.title}</h2>
              <div className="article-body">
                {selected.body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
