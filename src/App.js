import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import Preparing from './view/preparing/Preparing';
import ProfileInformation from './view/profileInformation/ProfileInformation';

export default class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/preparing" element={<Preparing/>} />
                        <Route path="/" element={<ProfileInformation/>} />
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}
