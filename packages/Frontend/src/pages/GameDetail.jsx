import React, { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { getGameById } from '@/lib/games.js'
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal'
import { IconArrowBackUp, IconShoppingBag, IconAlertCircle } from '@tabler/icons-react'

const featuredBackgrounds = [
  'https://media.giphy.com/media/l0HlQ7LRalQqdWfao/giphy.gif',
  'https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif',
  'https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif',
  'https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif'
]

const bannerStrip =
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWRjeTI4d2FncDI1ZnRiMnowdTB4M29hYzlwczR2dW94dXFqMG5leSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KG9y6LHirezDpPj6he/giphy.gif'

const detailImages = [
  'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1200&h=900&fit=crop',
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=900&fit=crop',
  'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=900&fit=crop',
  'https://images.unsplash.com/photo-1511882150382-421056c89033?w=1200&h=900&fit=crop'
]

const GameDetail = () => {
  const { id } = useParams()
  const location = useLocation()
  const [activeVideo, setActiveVideo] = useState(0)

  const gameFromState = location.state?.game
  const game =
    gameFromState && String(gameFromState.id) === String(id)
      ? gameFromState
      : getGameById(id)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  const gameplayVideos = useMemo(
    () => [
      'https://cdn.coverr.co/videos/coverr-gaming-setup-1579/1080p.mp4',
      'https://cdn.coverr.co/videos/coverr-young-man-playing-a-video-game-3776/1080p.mp4',
      'https://cdn.coverr.co/videos/coverr-young-man-playing-games-at-home-1560/1080p.mp4'
    ],
    []
  )

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveVideo((prev) => (prev + 1) % gameplayVideos.length)
    }, 5500)
    return () => window.clearInterval(timer)
  }, [gameplayVideos.length])

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100 px-6">
        <div className="max-w-xl text-center bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold">Game not found</h2>
          <p className="text-gray-600 mt-2">
            The game you are looking for does not exist or was moved.
          </p>
          <Link
            to="/games"
            className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            Back to Games
          </Link>
        </div>
      </div>
    )
  }

  const heroGif = featuredBackgrounds[game.id % featuredBackgrounds.length]
  const revealContent = [
    {
      title: `${game.title} Core Gameplay`,
      description:
        'Tight controls, clear game feel, and reactive environments are designed to keep each run fluid and rewarding.',
      content: (
        <img
          src={detailImages[0]}
          alt={`${game.title} gameplay`}
          className="h-full w-full object-cover"
        />
      )
    },
    {
      title: 'World and Visual Direction',
      description:
        'Distinct lighting, layered atmosphere, and stylized assets build a strong world identity while preserving readability.',
      content: (
        <img
          src={detailImages[1]}
          alt={`${game.title} world design`}
          className="h-full w-full object-cover"
        />
      )
    },
    {
      title: 'Progression and Rewards',
      description:
        'Players unlock upgrades, discover strategy variations, and build custom playstyles over each session.',
      content: (
        <img
          src={detailImages[2]}
          alt={`${game.title} progression`}
          className="h-full w-full object-cover"
        />
      )
    },
    {
      title: 'Platform Experience',
      description:
        'Performance tuning and controls are optimized for the listed platforms to keep gameplay responsive and stable.',
      content: (
        <img
          src={detailImages[3]}
          alt={`${game.title} platform performance`}
          className="h-full w-full object-cover"
        />
      )
    }
  ]

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className=" rounded-3xl p-6 sm:p-8 bg-transparent">
            <div className="max-w-3xl mx-auto">
              <img
                src={bannerStrip}
                alt="Game banner"
                className="w-full h-24 sm:h-28 rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <section className="relative max-w-7xl mx-auto px-6 pb-10">
        <div className="relative overflow-hidden rounded-[2rem] min-h-[420px] sm:min-h-[520px]">
          {gameplayVideos.map((videoSrc, index) => (
            <video
              key={videoSrc}
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                activeVideo === index ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          <img
            src={heroGif}
            alt={game.title}
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sky-900/85 via-cyan-900/60 to-black/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_32%,rgba(255,255,255,0.22),transparent_46%)]" />

          <div className="relative z-10 h-full flex items-end p-8 sm:p-10">
            <div className="max-w-xl text-white">
              <p className="text-sm uppercase tracking-[0.18em] text-cyan-200 mb-2 outfit-regular">
                {game.genre}
              </p>
              <h1 className="text-4xl sm:text-6xl font-black leading-[0.95] outfit-regular">
                {game.title}
              </h1>
              <p className="mt-4 text-white/85 text-sm sm:text-base leading-6 outfit-regular">
                {game.description}
              </p> 
              <div className="mt-6 flex flex-wrap gap-3">
            <button className="px-4 py-3 cursor-pointer bg-gradient-to-r from-primary-blue  to-primary-blue text-soft-cream text-sm rounded-full hover:shadow-xl transition-all flex items-center gap-2 group">
            <span><IconShoppingBag /></span>
              <span className=" text-sm outfit-regular">Buy Now</span>
            </button>
            <button className=" px-4 py-3 cursor-pointer bg-white text-sm text-gray-900 rounded-full hover:shadow-lg transition-all border border-gray-200 group flex items-center gap-2">
              <span><IconAlertCircle /></span>
              <span className=" text-sm outfit-regular">Learn More</span>
            </button>
          </div>
              <div className="mt-7 flex items-center gap-3">
                {gameplayVideos.map((_, index) => (
                  <button
                    key={`dot-${index}`}
                    onClick={() => setActiveVideo(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      activeVideo === index ? 'bg-red-500 scale-110' : 'bg-red-500/40'
                    }`}
                    aria-label={`Show gameplay video ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 px-2">
          <div className="flex gap-3 text-sm outfit-regular text-neutral-700">
            <span className="px-3 py-1 rounded-full bg-white border border-neutral-200 shadow-sm">
              Studio: {game.studio}
            </span>
            <span className="px-3 py-1 rounded-full bg-white border border-neutral-200 shadow-sm">
              Platform: {game.platform}
            </span>
            <span className="px-3 py-1 rounded-full bg-white border border-neutral-200 shadow-sm">
              Rating: {game.rating}
            </span>
          </div>
          <Link
            to="/games"
            className="px-3 py-2 cursor-pointer bg-white text-sm text-gray-900 rounded-full hover:shadow-lg transition-all border border-gray-200 outfit-regular group flex items-center gap-2"
          >
            <span><IconArrowBackUp /></span>
            <span className=" text-sm outfit-regular">Back to Catalogue</span>
            
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.16em] text-primary-blue outfit-regular">
            Game Details
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 outfit-regular">
            Scroll to explore key highlights
          </h2>
        </div>
        <StickyScroll
          content={revealContent}
          contentClassName="h-[20rem] w-[25rem] rounded-2xl"
        />
      </section>
    </div>
  )
}

export default GameDetail
