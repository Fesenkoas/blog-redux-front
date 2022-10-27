import React from 'react'
import { Link } from 'react-router-dom';

export const PopularPost = ({post}) => {
  return (
    <div className='bg-gray-400 my-1'>
        <Link to={`${post._id}`} className='flex text-xs p-2 text-white hover:bg-gray-800'>
            {post.title}
        </Link>
    </div>
  )
}
