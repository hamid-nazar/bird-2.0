import React from 'react'


import './Feed.css'
import { FeedTopBar } from '../FeedTopBar/FeedTopBar'
import { FeedPostCreator } from '../FeedPostCreator/FeedPostCreator'



export function Feed(): React.ReactElement {
  return (
    <div className='feed'>
      <FeedTopBar />
      <FeedPostCreator />
    </div>
  )
}
