import React from 'react'

const BlogSearchInput = ({ value, onChange, placeholder = 'Search blogs...' }) => {
  return (
    <div className='relative w-full max-w-md'>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className='w-full pl-10 pr-4 py-2 outfit-regular  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-full'
      />
      <svg
        className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
      </svg>
    </div>
  )
}

export default BlogSearchInput
