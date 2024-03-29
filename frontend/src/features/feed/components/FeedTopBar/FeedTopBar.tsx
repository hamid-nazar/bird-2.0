import React, { useState } from 'react'

import './FeedTopBar.css'

export function FeedTopBar(): React.ReactElement {

    // const state = useSelector((state:RootState) => state.user);
    // const dispatch:AppDispatch = useDispatch();

    const[forYouActive, setForYouActive] = useState<boolean>(true);
    const[followingActive, setFollowingActive] = useState<boolean>(false);


    function selectChoice(e:React.MouseEvent<HTMLDivElement>) {

        if(e.currentTarget.id === 'for-you') {
            setForYouActive(true);
            setFollowingActive(false);
       
        } else {
            setForYouActive(false);
            setFollowingActive(true);
   
        }
    }


  return (
    <div className='feed-top-bar'>

        <div className='feed-top-bar-top'>
            <div className='feed-top-bar-home'>Home</div>
        </div>

        <div className='feed-top-bar-bottom'>

            <div className='feed-top-bar-choice' id='for-you' onClick={selectChoice}>

                <div className='feed-top-bar-choice-content'>

                    <h2 className={`{forYouActive}?'feed-top-bar-choice-text-active':'feed-top-bar-choice-text'`}>
                        For You
                    </h2>
                    {forYouActive ? <div className='feed-top-bar-choice-underline'></div> : <></>}
                </div>

            </div>

            <div className='feed-top-bar-choice' id='following' onClick={selectChoice}>

                <div className='feed-top-bar-choice-content'>

                    <h2 className={`{forYouActive}?'feed-top-bar-choice-text-active':'feed-top-bar-choice-text'`}>
                        Following
                    </h2>

                    {followingActive ? <div className='feed-top-bar-choice-underline'></div> : <></>}

                </div>

            </div>

        </div>

    </div>
  )
}
