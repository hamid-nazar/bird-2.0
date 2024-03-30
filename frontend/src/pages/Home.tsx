import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { getUserByToken, setToken } from "../redux/Slices/UserSlice";
import { useNavigate } from "react-router-dom";

import './Home.css';
import { Navigation } from "../components/Navigation/Navigation";
import { Feed } from "../features/feed/components/Feed/Feed";

export function Home(): React.ReactElement {

  const state = useSelector((state:RootState) => state.user);
  const dispatch:AppDispatch = useDispatch();


  const[jwt, setJwt, removJwt] = useLocalStorage("token", "");

  const navigate = useNavigate();
  
  useEffect(function(){

    if(jwt !== "" && state.token !== "") {

      dispatch(getUserByToken(state.token));

    } else if(jwt !== "" && state.token === "") {

      dispatch(setToken(jwt));

    } else if(jwt === "" && state.token !== "") {
      
      setJwt(state.token);

    } else{
      
      navigate("/home");

    }

   
  },[state.token]);


  
  return (
    <div className="home">

      <div className="home-layout">

        <div className="home-navigation-section">
          <Navigation/>
        </div>
        
        <div className="home-content-section">
          <Feed/>
        </div>
        <div className="home-info-section"></div>

        
      </div>      
    </div>
  );
}
