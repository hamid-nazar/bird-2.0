import React, { useEffect, useRef, useState } from 'react'

import { Link } from 'react-router-dom'
import { ExpandMore } from '@mui/icons-material'
import GlobeSVG from './../../../../components/SVGs/GlobeSVG'


import  MediaSVG from '../../../../components/SVGs/MediaSVG'
import GIFSVG from '../../../../components/SVGs/GIFSVG'
import PollSVG from '../../../../components/SVGs/PollSVG'
import EmojiSVG from '../../../../components/SVGs/EmojiSVG'
import ScheduleSVG from '../../../../components/SVGs/ScheduleSVG'
import LocationSVG from '../../../../components/SVGs/LocationSVG'


import './FeedPostCreator.css'
import { FeedPostCreatorProgress } from '../FeedPostCreatorProgress/FeedPostCreatorProgress'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../../redux/Store'
import { Post } from '../../../../utils/GlobalInterfaces'
import { createPost, initializeCurrentPost, updateCurrentPost } from '../../../../redux/Slices/PostSlice'

export function FeedPostCreator() {

    const state = useSelector((state:RootState) => state);
    const dispatch:AppDispatch = useDispatch();

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const[active, setActive] = useState<boolean>(false);
    const[postContent, setPostContent] = useState<string>('');

    function activatePostCreator() {

        if(!active) {

            setActive(true);

            if (state.user.loggedIn) {
                
                let p:Post = {
                    postId: 0,
                    content: '',
                    author: state.user.loggedIn,
                    likes: [],
                    images:[],
                    reposts: [],
                    views: [],
                    scheduled:false,
                    audience: 'EVERYONE',
                    replyRestriction:"EVERYONE",
                }

                dispatch(initializeCurrentPost(p));
            }
           
        }

        if(textAreaRef && textAreaRef.current) {

            textAreaRef.current.focus();
        }
        
    }

    function autoGrow(e:React.ChangeEvent<HTMLTextAreaElement>) {
   
        setPostContent(e.target.value);

        if(textAreaRef && textAreaRef.current){
            textAreaRef.current.style.height = "25px"
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
        }

        dispatch(updateCurrentPost({name:"content",value:e.target.value}))
    }

    function submitPost(){

        if (state.post.currentPost && state.user.loggedIn) {

            let body = {
                content: state.post.currentPost.content,
                author: state.user.loggedIn,
                replies: [],
                scheduled: state.post.currentPost.scheduled,
                scheduledDate: state.post.currentPost.scheduledDate,
                audience: state.post.currentPost.audience,
                replyRestriction: state.post.currentPost.replyRestriction,
                token: state.user.token
            }
            
            dispatch(createPost(body));
        }

        setActive(false);

        if (textAreaRef && textAreaRef.current) {

            console.log(textAreaRef.current.value);
            
            textAreaRef.current.blur();
            // textAreaRef.current.value = "";
            setPostContent("");

            console.log(textAreaRef.current.value);
        }

    }

    useEffect(function() {

        if(!state.post.currentPost) {

            setPostContent("");
        }

        console.log(postContent);

    },[state.post.currentPost]);


  return (
    <div className='feed-post-creator' onClick={activatePostCreator}>

        <Link to="">
            <img src="https://christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg"alt="" className='feed-post-creator-pfp' />
        </Link>

        <div className='feed-post-creator-right'>

            <div className={active ? 'feed-post-creator-audience' : 'feed-post-creator-audience hide'}> 
                Everyone
                <ExpandMore sx={{ fontSize: "22px",   }}/>
            </div>

            <textarea
                    className={active ? "feed-post-creator-input input-active" : "feed-post-creator-input"}
                    placeholder='What is happening?!'
                    ref={textAreaRef}
                    onChange={autoGrow}
                    cols={50}
                    maxLength={256}
                    value={ postContent}
                />

            <div className={active ? 'feed-post-creator-reply' : 'feed-post-creator-reply hide'}>
                <GlobeSVG width={14} height={14} color={"#1DA1F2"} />    
                Everyone Can Reply
            </div>

            <div className={active ? 'feed-post-creator-bottom-icons icons-border' : 'feed-post-creator-bottom-icons'}>

                <div className='feed-post-creator-icons-left'>

                    <div className='feed-post-creator-icon-bg'> 
                    <MediaSVG width={20} height={20} color={"#1DA1F2"}/>
                    </div>

                    <div className='feed-post-creator-icon-bg'>
                        <GIFSVG width={20} height={20} color={"#1DA1F2"}/>
                    </div>

                    <div className='feed-post-creator-icon-bg'>
                        <PollSVG width={20} height={20} color={"#1DA1F2"}/>
                    </div>

                    <div className='feed-post-creator-icon-bg'>
                        <EmojiSVG width={20} height={20} color={"#1DA1F2"}/>
                    </div>

                    <div className='feed-post-creator-icon-bg'>
                        <ScheduleSVG width={20} height={20} color={"#1DA1F2"}/>
                    </div>

                    <div className='feed-post-creator-location'>
                        <LocationSVG width={20} height={20} color={"#1DA1F2"}/>
                    </div>

                </div>

                
                <div className='feed-post-creator-submit-cluster'>
                    
                    { postContent.length > 0? 
                    <><FeedPostCreatorProgress percent={(postContent.length/256)*100}/>
                    <span className='feed-post-creator-submit-cluster-divider'></span>
                    <div className='feed-post-creator-submit-cluster-add'>+</div></>:<></> 
                    }

                    <button className={postContent === '' ? 'feed-post-creator-post-button' : 'feed-post-creator-post-button post-active'} disabled={postContent === ''} onClick={submitPost}>
                        Post
                    </button>
                </div>


            </div>


        </div>
    </div>
  )
}
