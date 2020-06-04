import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import style from './homepage.module.scss';
import { getClassName } from '../../utils/component-utils';
import LoginPage from '../login-page/LoginPage';


export default function HomePage() {
    
    return (
        <Router>
            <div className={getClassName(
                style.Bgimg, style.HomePageContainer, style.AnimeOpicity, style.TextWhite
            )}>
                <div className={getClassName(style.BannerDisplayMiddle)}>
                    <h1 className={
                        getClassName(style.HomePageSkeleton,
                            style.WelcomeWeight,
                            style.WelcomeJumbo,
                            style.WelcomeAnimateTop,
                            style.ContentCenter)
                    }>
                        Welcome to <br /> Watering System
                </h1>
                    <hr className={
                        getClassName(style.BorderColor,
                            style.BorderSize,
                            style.BorderAnimation)
                    } />
                    <p className={
                        getClassName(
                            style.ContentLarge,
                            style.ContentCenter,
                            style.ContentFormat)}>
                        The Website will assist you in irrigating your plants easily with our features.
                    <br /> Let's sign in and try to use these features.
                </p>

                    <Link to="/login" className={getClassName(
                        style.ButtonFontSize,
                        style.ButtonFormat,
                        style.ButtonCenter)}>
                        Sign In
                    </Link>



                </div>
            </div>
            <Switch>
                <Route exact path="/login">
                    <LoginPage />
                </Route>
            </Switch>
        </Router>
    );
}