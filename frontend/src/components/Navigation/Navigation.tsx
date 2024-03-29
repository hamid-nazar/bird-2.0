import React, { useEffect } from 'react'
import { Link, useFetcher } from 'react-router-dom'

import blueLogo from "../../assets/fwitter-logo-large-blue.png"
import "./Navigation.css"
import HomeSVG from '../SVGs/HomeSVG'
import ExploreSVG from '../SVGs/ExploreSVG'
import NotificationSVG from '../SVGs/NotificationSVG'
import MessagesSVG from '../SVGs/MessagesSVG'
import ListsSVG from '../SVGs/ListsSVG'
import CommunitiesSVG from '../SVGs/CommunitiesSVG'
import VerifiedSVG from '../SVGs/VerifiedSVG'
import ProfileSVG from '../SVGs/ProfileSVG'
import MoreSVG from '../SVGs/MoreSVG'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/Store'



export function Navigation():React.ReactElement {

    const state = useSelector((state:RootState) => state.user);




  return (
    <div className='navigation'>
        <nav className='navigation-container'>
            <Link to="/home" className='navigation-logo'>
                <img src={blueLogo} alt="" className='navigation-logo-bg' />
            </Link>

            <div className='navigation-item'>
                <Link to="" className='navigation-link'>
                    <HomeSVG width={26} height={26} />
                    <p className='navigation-text navigation-active'>Home</p>
                </Link>
            </div>

            <div className='navigation-item'>
                <Link to="" className="navigation-link">
                    <ExploreSVG width={26} height={26} />
                    <p className='navigation-text navigation-inactive'>Explore</p>
                </Link>
            </div>

            <div className='navigation-item'>
                <Link to="" className="navigation-link">
                    <NotificationSVG width={26} height={26} />
                    <p className='navigation-text navigation-inactive'>Notification</p>
                </Link>
            </div>

            <div className='navigation-item'>
                <Link to="" className="navigation-link">
                    <MessagesSVG width={26} height={26} />
                    <p className='navigation-text navigation-inactive'>Messages</p>
                </Link>
            </div>


            <div className='navigation-item'>
                <Link to="" className="navigation-link">
                    <ListsSVG width={26} height={26} />
                    <p className='navigation-text navigation-inactive'>Lists</p>
                </Link>
            </div>

            <div className='navigation-item'>
                <Link to="" className="navigation-link">
                    <CommunitiesSVG width={26} height={26} />
                    <p className='navigation-text navigation-inactive'>Communities</p>
                </Link>
            </div>

            <div className="navigation-item">
                    <Link to="" className="navigation-link">
                        <VerifiedSVG height={26} width={26} />
                        <p className="navigation-text navigation-inactive">Verified</p>
                    </Link>
            </div>


            <div className='navigation-item'>
                <Link to="" className="navigation-link">
                    <ProfileSVG width={26} height={26} />
                    <p className='navigation-text navigation-inactive'>Profile</p>
                </Link>
            </div>


            <div className='navigation-item'>
                <Link to="" className="navigation-link">
                    <MoreSVG width={26} height={26} />
                    <p className='navigation-text navigation-inactive'>More</p>
                </Link>
            </div>

            <button className='navigation-post-button'>
                Post
            </button>

        </nav>

        <div className='navigation-options'>
            <img className='navigation-options-pfp' src="https://christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg" alt="" />
            <div className='navigation-options-info'>
                <p className='navigation-options-info-display-name'>{state.loggedIn? state.loggedIn.nickname: state.username}</p>
                <p className='navigation-options-info-handle'>@{state.username? state.username:""}</p>
            </div>
            <p className='navigation-options-dotdotdot'>...</p>
        </div>
    </div>
  )
}
