import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Base from './components/base'; // Pastikan casing konsisten
import Home from './views/home';
import SearchResult from './views/searchResult';
import Detail from './views/detail';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Base />}>
                <Route index element={<Home />} />
                <Route path="search" element={<SearchResult />} />
                <Route path="detail" element={<Detail />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
