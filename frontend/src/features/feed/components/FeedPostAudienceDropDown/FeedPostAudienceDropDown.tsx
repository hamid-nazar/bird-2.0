import React, { useState } from "react";

import { Check, ExpandMore } from '@mui/icons-material';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import GlobeSVG from "../../../../components/SVGs/GlobeSVG";
import { CirclesSVG } from "../../../../components/SVGs/CirclesSVG";
import { updateRegister } from "../../../../redux/Slices/RegisterSlice";
import { updateCurrentPost } from "../../../../redux/Slices/PostSlice";


import "./FeedPostAudienceDropDown.css";

export function FeedPostAudienceDropDown() {

  const state = useSelector((state: RootState) => state);
  const dispatch: AppDispatch = useDispatch();

  const [active, setActive] = useState<boolean>(false);
  const [selection, setSelection] = useState<string>("EVERYONE");


  function handleClick() {

    setActive(!active);
  }

  function handleChangeSelection(e: React.MouseEvent<HTMLDivElement>) {

    setSelection(e.currentTarget.id);

    dispatch(updateRegister({ name: "audience", value: e.currentTarget.id.toUpperCase() }));

    dispatch(updateCurrentPost({name: "replyRestriction", value: e.currentTarget.id.toUpperCase()}));

  }

  return (
    <div
      className={ selection === "EVERYONE" ? "feed-post-creator-audience everyone" : "feed-post-creator-audience circle"}  onClick={handleClick}> 

      {selection}
      
      <ExpandMore sx={{ fontSize: "22px" }} />

      <div className="feed-post-creator-audience-dropdown" style={{display: active ? "block" : "none"}}>

        <h2 className="feed-post-creator-audience-dropdown-title"> Choose audience </h2>
        
        <div id="Everyone" className="feed-post-creator-audience-dropdown-choice" onClick={handleChangeSelection}>

            <div className="feed-post-creator-audience-dropdown-choice-left">
                <div className="feed-post-creator-audience-dropdown-choice-everyone-bg">
                    <GlobeSVG width={20} height={20} color={"#fff"}/>
                </div>
                <p className="feed-post-creator-audience-dropdown-choice-text">Everyone</p>
            </div>

            {selection === "Everyone" ? <Check sx={{ fontSize: "18px", color: "#1DA1F2"}}/> : <></>}

      </div>


      <div id="Circle" className="feed-post-creator-audience-dropdown-choice" onClick={handleChangeSelection}>

            <div className="feed-post-creator-audience-dropdown-choice-left">

                <div className="feed-post-creator-audience-dropdown-choice-circle-bg">
                    <CirclesSVG width={20} height={20} color={"#fff"}/>
                </div>
                    <div className="feed-post-creator-audience-dropdown-choice-circle-group">

                        <p className="feed-post-creator-audience-dropdown-choice-text">Circle</p>

                        <div className="feed-post-creator-audience-dropdown-circle-info">
                            <p className="feed-post-creator-audience-dropdown-circle-info-amount">0</p>
                            <p className="feed-post-creator-audience-dropdown-circle-people">People</p>
                            <p className="feed-post-creator-audience-dropdown-circle-info-edit">Edit</p>
                        </div>

                    </div>
               
            </div>

            {selection === "Circle" ? <Check sx={{ fontSize: "18px", color: "#1DA1F2"}}/> : <></>}

      </div>

      </div>

    </div>
  );
}
