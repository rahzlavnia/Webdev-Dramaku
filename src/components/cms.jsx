// src/components/cms.jsx
import React from 'react';
import Sidebar from '../components/sidebar';

const Cms = ({ children, activePage }) => {
    return (
        <div className="flex bg-gray-900 text-white min-h-screen">
            <Sidebar activePage={activePage} />
            <div className="flex-1 ml-64 pt-12">
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
};

export default Cms;
