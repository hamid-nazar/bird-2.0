import React, { useState } from 'react'
import GlobeSVG from '../../../../components/SVGs/GlobeSVG'
import { AppDispatch, RootState } from '../../../../redux/Store';
import { useDispatch, useSelector } from 'react-redux';

import './FeedPostReplyRestrictionDropDown.css';

import { getReplyDropDownButton } from '../../utils/FeedUtils';
import { Check } from '@mui/icons-material';
import PeopleYouFollowSVG from '../../../../components/SVGs/PeopleYouFollowSVG';
import MentionedSVG from '../../../../components/SVGs/MentionedSVG';
import { updateCurrentPost } from '../../../../redux/Slices/PostSlice';



export  function FeedPostReplyRestrictionDropDown(): React.ReactElement{

    const state = useSelector((state: RootState) => state.post);
    const dispatch: AppDispatch = useDispatch();

    const [active, setActive] = useState<boolean>(false);
    const[selection, setSelection] = useState<string>("Everyone");



    function handleOpenModal() {

      setActive(!active);
    }


    function handleChangeSelection(e: React.MouseEvent<HTMLDivElement>) {

      setSelection(e.currentTarget.id);

      dispatch(updateCurrentPost({name: "replyRestriction", value: e.currentTarget.id.toUpperCase()}));

      setActive(false);
    }

    console.log(state.currentPost);

  return (
    <div className="feed-post-reply-restriction-drop-down">

      {getReplyDropDownButton(state, handleOpenModal)}
   

      <div className='feed-post-reply-restriction-drop-down-modal' style={{display: active ? "block" : "none"}}>

        <h2 className='feed-post-reply-restriction-dropdown-title'>Who can reply?</h2>
        <p className='feed-post-reply-restriction-dropdown-sub-title'> Choose who can reply to this post.</p>
        <p className='feed-post-reply-restriction-dropdown-sub-title'> Any mentioned can always reply.</p>

        <div id='Everyone' className='feed-post-reply-restriction-dropdown-choice' onClick={handleChangeSelection}>
          <div className='feed-post-creator-reply-restriction-dropdown-choice-left'>

            <div className='feed-post-creator-reply-restriction-dropdown-choice-bg'> 
              <GlobeSVG width={20} height={20} color= {'#fff'} /> 
            </div>
            <p className='feed-post-creator-reply-restriction-dropdown-choice-text'>Everyone</p>

          </div>

          {selection === "Everyone"? <Check sx={{color: '#1DA1F2', fontSize: 18}}/>: <></> }
        </div>

        <div id='Follow' className='feed-post-reply-restriction-dropdown-choice' onClick={handleChangeSelection}>
          <div className='feed-post-creator-reply-restriction-dropdown-choice-left'>

            <div className='feed-post-creator-reply-restriction-dropdown-choice-bg'> 
              <PeopleYouFollowSVG width={20} height={20} color= {'#fff'} /> 
            </div>
            <p className='feed-post-creator-reply-restriction-dropdown-choice-text'> People you follow</p>

          </div>

          {selection === "Follow"? <Check sx={{color: '#1DA1F2', fontSize: 18}}/>: <></> }
        </div>

        <div id='Mention' className='feed-post-reply-restriction-dropdown-choice' onClick={handleChangeSelection}>
          <div className='feed-post-creator-reply-restriction-dropdown-choice-left'>

            <div className='feed-post-creator-reply-restriction-dropdown-choice-bg'> 
              <MentionedSVG width={20} height={20} color= {'#fff'} /> 
            </div>
            <p className='feed-post-creator-reply-restriction-dropdown-choice-text'> Only people you mention </p>
            
          </div>

          {selection === "Mention"? <Check sx={{color: '#1DA1F2', fontSize: 18}}/>: <></> }
        </div>



      </div>
</div>
  )
}
