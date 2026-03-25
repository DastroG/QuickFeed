import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

function Feed() {

  const [posts, setPosts] = useState([]);

  useEffect(() =>{ 
    axios.get('http://localhost:3000/posts')
    .then(response => {
       setPosts(response.data.posts)
    })

  },[])
  return (
    <section className='feed-section'>
        {  
           posts.length === 0 ? <p className='no-posts'>No posts available</p> :
            posts.map(post => (
                <div className='post-card' key={post._id}>
                    <img src={post.image} alt="Post" className='post-image' />
                    <p className='post-caption'>{post.caption}</p>
                </div>
            ))
        }
    </section>
  )
}

export default Feed
