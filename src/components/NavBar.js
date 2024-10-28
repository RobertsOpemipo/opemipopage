// src/Navbar.js

import React from 'react';
import { FaLaptopCode, FaHome, FaUserInjured, FaCalendarAlt, FaComment, FaMoneyBillWave, FaCog, FaEllipsisV } from 'react-icons/fa';

const Navbar = () => {
    const navLinks = [
        { name: 'Home', icon: <FaHome /> },
        { name: 'Patients', icon: <FaUserInjured /> },
        { name: 'Schedule', icon: <FaCalendarAlt /> },
        { name: 'Message', icon: <FaComment /> },
        { name: 'Transactions', icon: <FaMoneyBillWave /> },
    ];

    return (
        <nav className="bg-white border rounded-lg shadow-md mx-auto my-4 max-w-8xl flex items-center justify-between p-4">
            <div className="flex items-center">
                <FaLaptopCode className="text-2xl mr-2" />
                <span className="text-xl font-bold">Tech Care</span>
            </div>
            <div className="flex space-x-4">
                {navLinks.map(({ name, icon }) => (
                    <a
                        key={name}
                        href="#"
                        className="flex items-center hover:bg-sky-400 transition-colors duration-300 rounded-md px-3 py-2"
                    >
                        {icon}
                        <span className="ml-1">{name}</span>
                    </a>
                ))}
            </div>
            <div className="flex items-center space-x-2">
                <img
                    src="https://via.placeholder.com/40" // Placeholder for profile pic
                    alt="Profile"
                    className="rounded-full"
                />
                <div className="flex flex-col items-start">
                    <span className="text-blue-600 font-bold">Dr. Jose Simmons</span>
                    <span className="text-gray-500 text-sm">General Practitioner</span>
                </div>
                <div className="border-l h-6 mx-2"></div>
                <FaCog />
                <FaEllipsisV className="ml-2" />
            </div>
        </nav>
    );
};

export default Navbar;