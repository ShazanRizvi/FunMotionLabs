import React, { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import MainText from '../AppComponents/Hero/MainText'
import BlogSearchInput from '../AppComponents/BlogSearchInput'
import { useGamesListingStore } from '@/store/useListingStore'

const Games = () => {
  const items = useGamesListingStore((state) => state.items)
  const isLoading = useGamesListingStore((state) => state.isLoading)
  const hasLoaded = useGamesListingStore((state) => state.hasLoaded)
  const error = useGamesListingStore((state) => state.error)
  const fetchItems = useGamesListingStore((state) => state.fetchItems)
  const currentPage = useGamesListingStore((state) => state.currentPage)
  const activeFilter = useGamesListingStore((state) => state.activeFilter)
  const searchQuery = useGamesListingStore((state) => state.searchQuery)
  const setCurrentPage = useGamesListingStore((state) => state.setCurrentPage)
  const setActiveFilter = useGamesListingStore((state) => state.setActiveFilter)
  const setSearchQuery = useGamesListingStore((state) => state.setSearchQuery)
  const cardsPerPage = 6
  const heroBackgroundGif = 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWRjeTI4d2FncDI1ZnRiMnowdTB4M29hYzlwczR2dW94dXFqMG5leSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KG9y6LHirezDpPj6he/giphy.gif'
  const gameCardGifs = [
    'https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif',
    'https://media.giphy.com/media/3o7TKsQ8UQJ2pQ7O6k/giphy.gif',
    'https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif',
    'https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif',
    'https://media.giphy.com/media/3oEduSbSGpGaRX2Vri/giphy.gif',
    'https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif'
  ]

  const getInitials = (name) => {
    if (!name) return ''
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join('')
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({
      top: window.innerHeight * 0.5,
      behavior: 'smooth'
    })
  }

  const renderPagination = (totalPages) => {
    const pages = []
    const maxVisible = 7

    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    let endPage = Math.min(totalPages, startPage + maxVisible - 1)

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1)
    }

    pages.push(
      <button
        key="prev"
        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`
          px-4 py-2 rounded-lg font-medium transition-all duration-300
          ${currentPage === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-primary-blue hover:scale-105 shadow-md hover:shadow-lg'
          }
        `}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    )

    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-4 py-2 rounded-lg font-medium bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
        >
          1
        </button>
      )
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis1" className="px-2 text-gray-400">
            ...
          </span>
        )
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`
            relative px-4 py-2 rounded-lg font-medium transition-all duration-300
            ${currentPage === i
              ? 'bg-blue-500 text-white shadow-lg scale-110'
              : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:scale-105 shadow-md hover:shadow-lg'
            }
          `}
        >
          {i}
          {currentPage === i && (
            <span className="absolute inset-0 rounded-lg bg-blue-500 blur-sm opacity-50 -z-10 animate-pulse" />
          )}
        </button>
      )
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis2" className="px-2 text-gray-400">
            ...
          </span>
        )
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-4 py-2 rounded-lg font-medium bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
        >
          {totalPages}
        </button>
      )
    }

    pages.push(
      <button
        key="next"
        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`
          px-4 py-2 rounded-lg font-medium transition-all duration-300
          ${currentPage === totalPages
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-blue-50 rounded-full hover:text-primary-blue hover:scale-105 shadow-md hover:shadow-lg'
          }
        `}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    )

    return pages
  }

  const filteredGames = useMemo(() => {
    let nextGames = items

    if (activeFilter === 'recent') {
      nextGames = [...nextGames].sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
      )
    }

    if (activeFilter === 'popular') {
      nextGames = nextGames.filter((game) => game.isPopular)
    }

    const query = searchQuery.trim().toLowerCase()
    if (!query) {
      return nextGames
    }

    return nextGames.filter((game) => {
      const titleMatch = (game.title || "").toLowerCase().includes(query)
      const genreMatch = (game.genre || "").toLowerCase().includes(query)
      const studioMatch = (game.studio || "").toLowerCase().includes(query)
      return titleMatch || genreMatch || studioMatch
    })
  }, [activeFilter, searchQuery, items])

  const totalPages = Math.max(
    1,
    Math.ceil(filteredGames.length / cardsPerPage)
  )
  const startIndex = (currentPage - 1) * cardsPerPage
  const pagedGames = filteredGames.slice(
    startIndex,
    startIndex + cardsPerPage
  )

  useEffect(() => {
    if (!hasLoaded) {
      fetchItems()
    }
  }, [hasLoaded, fetchItems])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages, setCurrentPage])

  return (
    <div className='flex flex-col w-full min-h-screen'>
      <div className='relative h-[50vh] pt-20 pb-12'>
        <div
          className='absolute inset-0 bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: `url('${heroBackgroundGif}')`
          }}
        >
          <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-white/20' />
        </div>

        <div className='relative z-10 flex h-full items-center justify-center'>
          <MainText words={["Games", "ゲーム", "ゲーム", "ゲーム"]}  />
        </div>
      </div>

      <div className='sticky top-24 z-50 px-6 -mt-10 bg-transparent'>
        <div className='bg-white/90 max-w-7xl mx-auto backdrop-blur-sm  p-4 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] flex gap-4 flex-wrap justify-between rounded-full'>
          <div className='flex gap-4 flex-wrap '>
            {[
              { id: 'all', label: 'All games' },
              { id: 'recent', label: 'Recent' },
              { id: 'popular', label: 'Popular' }
            ].map((tab) => {
              const isActive = activeFilter === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`relative px-6 py-2 outfit-regular rounded-full cursor-pointer font-medium transition-all duration-300 ease-out ${isActive
                      ? 'bg-primary-blue text-white shadow-lg shadow-black/20 scale-105'
                      : 'bg-transparent text-gray-700 hover:bg-soft-cream/30'
                    }`}
                >
                  <span
                    className={`absolute inset-0 outfit-regular rounded-full transition-all duration-300 ease-out ${isActive
                        ? 'bg-primary-blue/20 opacity-100 scale-100'
                        : 'bg-transparent opacity-0 scale-90'
                      }`}
                    aria-hidden="true"
                  />
                  <span className="relative">{tab.label}</span>
                </button>
              )
            })}
          </div>
          <BlogSearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder='Search games...'
          />
        </div>
      </div>

      <div className='relative z-0 pt-10 pb-12'>
        {isLoading && (
          <div className="max-w-6xl mx-auto px-6 py-8 text-center text-gray-600 outfit-regular">
            Loading games...
          </div>
        )}
        {!isLoading && error && (
          <div className="max-w-6xl mx-auto px-6 py-8 text-center text-red-600 outfit-regular">
            {error}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 max-w-6xl mx-auto">
          {pagedGames.map((game, index) => (
            <Link
              key={game.id}
              to={`/games/${game.id}`}
              state={{ game }}
              className="group hover:cursor-pointer bg-white/80 backdrop-blur-sm rounded-4xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 hover:-translate-y-2"
            >
              <div className="relative w-full h-48 rounded-xl mb-4 overflow-hidden">
                <img
                  src={gameCardGifs[index % gameCardGifs.length]}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-primary-blue outfit-regular">{game.releaseDate}</span>
                <span className="text-xs px-2 py-1 rounded-full bg-primary-blue/10 text-primary-blue outfit-regular">
                  {game.genre}
                </span>
              </div>
              <h3 className="font-bold text-xl mb-2 line-clamp-2 outfit-regular">{game.title}</h3>
              <p className="text-gray-600 mb-4 text-sm line-clamp-3 outfit-regular">{game.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary-blue/10 text-primary-blue text-xs font-semibold flex items-center justify-center">
                    {getInitials(game.studio)}
                  </div>
                  <div className="text-sm text-gray-700 font-medium outfit-regular">
                    {game.studio}
                  </div>
                </div>
                <span className="px-2 py-1 text-xs text-neutral-500 outfit-regular rounded-full bg-neutral-100">
                  {game.platform}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 mb-8">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm outfit-regular rounded-2xl p-4 shadow-xl border border-white/50">
              {renderPagination(totalPages)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Games
