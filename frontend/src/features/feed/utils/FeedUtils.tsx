import React from 'react'
import { PostSliceState } from '../../../redux/Slices/PostSlice'
import GlobeSVG from '../../../components/SVGs/GlobeSVG'
import PeopleYouFollowSVG from '../../../components/SVGs/PeopleYouFollowSVG'
import LockSVG from '../../../components/SVGs/LockSVG'
import MentionedSVG from '../../../components/SVGs/MentionedSVG'



export function getReplyDropDownButton(state: PostSliceState, callback:()=> void): React.ReactNode {

    switch (state.currentPost?.replyRestriction) {

        case "EVERYONE":
             return <div className='feed-post-reply-restriction-drop-down-button' onClick={callback}>
                <GlobeSVG width={14} height={14} color= {'#1DA1F2'} />
                Everyone can reply
             </div>

        case "FOLLOW":
            return <div className='feed-post-reply-restriction-drop-down-button' onClick={callback}>
                <PeopleYouFollowSVG width={14} height={14}  color= {'#1DA1F2'} />
                People who you follow can reply
            </div>

        case "CIRCLE":
            return <div className='feed-post-reply-restriction-drop-down-button-disabled'>
                <LockSVG width={14} height={14}  color= {'rgba(29, 161, 242, .5)'} />
                Only your Bird Circle can reply
            </div>

        case "MENTION":
            return <div className='feed-post-reply-restriction-drop-down-button' onClick={callback}>
                <MentionedSVG width={14} height={14}  color= {'#1DA1F2'} />

                Only people you mentioned can reply
            </div>
            
        default:
            return <></>

    }
}
