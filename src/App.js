import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import ProfileInformation from './view/profileInformation/ProfileInformation';

export default class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<ProfileInformation/>} />
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}
