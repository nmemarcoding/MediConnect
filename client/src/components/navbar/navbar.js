import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../../store';

const Navbar = () => {
    const navigate = useNavigate();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const userInfo = useStore((state) => state.userInf);
    const deleteUserInfo = useStore((state) => state.deleteUserInfo);


    // Placeholder for user context, replace with your actual user context logic
    const user = { isLoggedIn: userInfo.firstName, role: userInfo.rule };

    const handleLogout = () => {
        // Implement your logout logic here
        deleteUserInfo();
        navigate('/login');
    };

    return (
        <nav className="bg-green-400">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center py-4 px-2 text-white text-3xl font-bold">MediConnect</Link>

                    {/* Primary Nav Items for desktop */}
                    <div className="hidden md:flex items-center space-x-1">
                        <Link to="/" className="py-4 px-2 text-white font-semibold hover:text-gray-300">Home</Link>
                        <Link to="/about" className="py-4 px-2 text-white font-semibold hover:text-gray-300">About</Link>
                        {/* Additional desktop links */}
                    </div>

                    {/* Secondary Nav Items for desktop */}
                    <div className="hidden md:flex items-center space-x-3">
                        {user.isLoggedIn ? (
                            <>
                                {/* Doctor or patient specific links */}
                                {user.role === 'doctor' ? (
                                    <>
                                        <Link to="/dashboard" className="py-2 px-2 text-white font-semibold hover:text-gray-300">Dashboard</Link>
                                        <Link to="/schedule" className="py-2 px-2 text-white font-semibold hover:text-gray-300">Schedule</Link>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/appointments" className="py-2 px-2 text-white font-semibold hover:text-gray-300">Appointments</Link>
                                        <Link to="/prescriptions" className="py-2 px-2 text-white font-semibold hover:text-gray-300">Prescriptions</Link>
                                    </>
                                )}
                                <button onClick={handleLogout} className="py-2 px-2 text-white font-semibold hover:text-gray-300">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="py-2 px-2 text-white font-semibold hover:text-gray-300">Login</Link>
                                <Link to="/signup" className="py-2 px-2 text-white font-semibold hover:text-gray-300">Sign Up</Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button type="button" onClick={() => setIsNavOpen((prev) => !prev)}>
                            <div className="space-y-2">
                                <span className="block w-8 h-0.5 bg-white"></span>
                                <span className="block w-8 h-0.5 bg-white"></span>
                                <span className="block w-8 h-0.5 bg-white"></span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`${isNavOpen ? 'block' : 'hidden'} md:hidden bg-green-400 pb-4`}>
                    <Link to="/" className="block py-2 px-4 text-sm text-white hover:bg-green-500">Home</Link>
                    <Link to="/about" className="block py-2 px-4 text-sm text-white hover:bg-green-500">About</Link>
                    {user.isLoggedIn && user.role === 'doctor' && (
                        <>
                            <Link to="/dashboard" className="block py-2 px-4 text-sm text-white hover:bg-green-500">Dashboard</Link>
                            <Link to="/schedule" className="block py-2 px-4 text-sm text-white hover:bg-green-500">Schedule</Link>
                        </>
                    )}
                    {user.isLoggedIn && user.role === 'patient' && (
                        <>
                            <Link to="/appointments" className="block py-2 px-4 text-sm text-white hover:bg-green-500">Appointments</Link>
                            <Link to="/prescriptions" className="block py-2 px-4 text-sm text-white hover:bg-green-500">Prescriptions</Link>
                        </>
                    )}
                    {user.isLoggedIn ? (
                        <button onClick={handleLogout} className="block py-2 px-4 text-sm text-white hover:bg-green-500 w-full text-left">Logout</button>
                    ) : (
                        <>
                            <Link to="/login" className="block py-2 px-4 text-sm text-white hover:bg-green-500">Login</Link>
                            <Link to="/signup" className="block py-2 px-4 text-sm text-white hover:bg-green-500">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
