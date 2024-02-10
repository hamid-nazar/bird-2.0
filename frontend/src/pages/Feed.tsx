import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { setToken } from "../redux/Slices/UserSlice";
import { useNavigate } from "react-router-dom";

export function Feed(): React.ReactElement {

  const state = useSelector((state:RootState) => state.user);
  const dispatch:AppDispatch = useDispatch();


  const[jwt, setJwt, removJwt] = useLocalStorage("token", "");

  const navigate = useNavigate();
  
  useEffect(function(){

    if(jwt === "" && state.token !== ""){
      console.log("There is a no token in the local storage");
      setJwt(state.token);
    } else if(jwt !== "" && state.token === ""){

      dispatch(setToken(jwt));

    } else {
      console.log("User is not logged in");
      navigate("/");
    }
    
  },[]);



  return (
    <div>
      <h1> Welcome Feed</h1>
    </div>
  );
}
