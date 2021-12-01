import React, { Component } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import './App.css';
import OrderDetail from './view/orderDetail/OrderDetail';
import Preparing from './view/preparing/Preparing';
import ProfileInformation from './view/profileInformation/ProfileInformation';

export default class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/preparing/:id" exact element={<OrderDetail />} />
                        <Route path="/preparing" element={<Preparing />} />
                        <Route path="/" element={<Navigate replace to="/preparing" />} />
                        <Route path="/ProfileInformation" element={<ProfileInformation />} />
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}
