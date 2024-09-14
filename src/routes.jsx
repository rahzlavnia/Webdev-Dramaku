import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Base from './components/base'; // Adjust the casing if needed
import Home from './views/home';
import SearchResult from './views/searchResult';
import Detail from './views/detail';
import Login from './views/login';
import Register from './views/register';
import Actors from './views/cmsActors';
import Countries from './views/cmsCountries';
import CmsAwards from './views/cmsAwards';
import Users from './views/cmsUsers';


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Base />}>
                <Route index element={<Home />} />
                <Route path="search" element={<SearchResult />} />
                <Route path="detail" element={<Detail />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/actors" element={<Actors />} />
            <Route path="/countries" element={<Countries/>} />
            <Route path="/awards" element={<CmsAwards/>} />
            <Route path="/users" element={<Users/>} />
        </Routes>
    );
};

export default AppRoutes;
