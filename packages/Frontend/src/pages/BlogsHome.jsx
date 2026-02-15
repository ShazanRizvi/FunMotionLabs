import React, { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import MainText from '../AppComponents/Hero/MainText'
import BlogSearchInput from '../AppComponents/BlogSearchInput'
import { useBlogsListingStore } from '@/store/useListingStore'

const BlogsHome = () => {
  const items = useBlogsListingStore((state) => state.items)
  const isLoading = useBlogsListingStore((state) => state.isLoading)
  const hasLoaded = useBlogsListingStore((state) => state.hasLoaded)
  const error = useBlogsListingStore((state) => state.error)
  const fetchItems = useBlogsListingStore((state) => state.fetchItems)
  const currentPage = useBlogsListingStore((state) => state.currentPage)
  const activeFilter = useBlogsListingStore((state) => state.activeFilter)
  const searchQuery = useBlogsListingStore((state) => state.searchQuery)
  const setCurrentPage = useBlogsListingStore((state) => state.setCurrentPage)
  const setActiveFilter = useBlogsListingStore((state) => state.setActiveFilter)
  const setSearchQuery = useBlogsListingStore((state) => state.setSearchQuery)
  const cardsPerPage = 6

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
    // Scroll to top of cards section smoothly
    window.scrollTo({
      top: window.innerHeight * 0.5,
      behavior: 'smooth'
    })
  }

  const renderPagination = (totalPages) => {
    const pages = []
    const maxVisible = 7

    // Calculate start and end page numbers
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    let endPage = Math.min(totalPages, startPage + maxVisible - 1)

    // Adjust start if we're near the end
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1)
    }

    // Previous button
    pages.push(
      <button
        key="prev"
        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`
          px-4 py-2 rounded-lg font-medium transition-all duration-300
          ${currentPage === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:scale-105 shadow-md hover:shadow-lg'
          }
        `}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    )

    // First page
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

    // Page numbers
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

    // Last page
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

    // Next button
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

  const filteredBlogs = useMemo(() => {
    let nextBlogs = items

    if (activeFilter === 'recent') {
      nextBlogs = [...nextBlogs].sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
      )
    }

    if (activeFilter === 'popular') {
      nextBlogs = nextBlogs.filter((blog) => blog.isPopular)
    }

    const query = searchQuery.trim().toLowerCase()
    if (!query) {
      return nextBlogs
    }

    return nextBlogs.filter((blog) => {
      const titleMatch = (blog.title || "").toLowerCase().includes(query)
      const excerptMatch = (blog.excerpt || "").toLowerCase().includes(query)
      return titleMatch || excerptMatch
    })
  }, [activeFilter, searchQuery, items])

  const totalPages = Math.max(
    1,
    Math.ceil(filteredBlogs.length / cardsPerPage)
  )
  const startIndex = (currentPage - 1) * cardsPerPage
  const pagedBlogs = filteredBlogs.slice(
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
      {/* Image Section */}
      <div className='relative h-[50vh] pt-20 pb-12'>
        <div
          className='absolute inset-0 bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: "url('https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3ZnQxZXN4Nm1wcmFvMjBmdnJ5djl0OHRnN3MxMHRuaXVqaDJ6bHpjeCZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/d82TJpBja9ixVVlT6X/giphy.gif')"
          }}
        >
          <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-white/20' />
        </div>

        {/* Main Text */}
        <div className='relative z-10 flex h-full items-center justify-center'>
          <MainText words={["Blogs", "ブログ", "ブログ", "ブログ"]}  />
        </div>
      </div>

      {/* Sticky Navigation (below navbar) */}
      <div className='sticky top-24 z-50 px-6 -mt-10 bg-transparent'>
        <div className='bg-white/90 max-w-7xl mx-auto backdrop-blur-sm  p-4 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] flex gap-4 flex-wrap justify-between rounded-full'>
          <div className='flex gap-4 flex-wrap '>
            {[
              { id: 'all', label: 'All posts' },
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
            placeholder='Search blogs...'
          />
        </div>
      </div>

      {/* Bottom Text Section - Cards below image */}
      <div className='relative z-0  pt-10 pb-12'>
        {isLoading && (
          <div className="max-w-6xl mx-auto px-6 py-8 text-center text-gray-600 outfit-regular">
            Loading blogs...
          </div>
        )}
        {!isLoading && error && (
          <div className="max-w-6xl mx-auto px-6 py-8 text-center text-red-600 outfit-regular">
            {error}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 max-w-6xl mx-auto">
          {pagedBlogs.map((blog) => (
            <Link
              key={blog.id}
              to={`/blogs/${blog.id}`}
              state={{ blog }}
              className="group hover:cursor-pointer"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-4xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 hover:-translate-y-2">

                <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300" />
                <span className="text-sm text-primary-blue outfit-regular">{blog.date || ""}</span>
                <h3 className="font-bold text-xl mb-2 line-clamp-2 outfit-regular">{blog.title || "Untitled Blog"}</h3>
                <p className="text-gray-600 mb-4 text-sm line-clamp-3 outfit-regular">{blog.excerpt || ""}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 ">
                    <div className="w-6 h-6 rounded-full bg-primary-blue/10 text-primary-blue text-xs font-semibold flex items-center justify-center">
                      {getInitials(blog.author)}
                    </div>
                    <div className="text-sm text-gray-700 font-medium outfit-regular">
                      {blog.author || "FunMotion Labs"}
                    </div>
                  </div>
                  <span className="px-1 py-1 text-sm text-neutral-300 outfit-regular rounded-full font-medium transition-all">
                    {blog.readTime || ""}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination Component */}
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

export default BlogsHome
