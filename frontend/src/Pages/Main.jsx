import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo11 from "../Images/logo11.png";
import wallpaper from "../Images/image.jpg";
import img1 from "../Images/WhatsApp Image 2024-06-14 at 14.42.42_7ef71a78.jpg";
import testnomial1 from "../Images/user.png";

const Main = () => {
    const testimonialsRef = useRef(null);

    useEffect(() => {
        const seeMoreBtn = document.getElementById('see-more');
        const detailsCard = document.getElementById('details-card');
        const closeDetailsBtn = document.getElementById('close-details');

        const showDetails = (event) => {
            event.preventDefault();
            detailsCard.style.display = 'block';
        };

        const hideDetails = () => {
            detailsCard.style.display = 'none';
        };

        seeMoreBtn.addEventListener('click', showDetails);
        closeDetailsBtn.addEventListener('click', hideDetails);

        return () => {
            seeMoreBtn.removeEventListener('click', showDetails);
            closeDetailsBtn.removeEventListener('click', hideDetails);
        };
    }, []);

    useEffect(() => {
        const menuButton = document.querySelector('.mobile-menu-button');
        const mobileMenu = document.querySelector('.mobile-menu');

        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        const handleScroll = () => {
            const nav = document.querySelector('nav');
            if (window.scrollY > 50) {
                nav.style.backgroundColor = 'rgb(245, 193, 124)'; // Apply the new background color
            } else {
                nav.style.backgroundColor = 'transparent'; // Reset to transparent
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollLeft = () => {
        if (testimonialsRef.current) {
            testimonialsRef.current.scrollBy({
                left: -400,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (testimonialsRef.current) {
            testimonialsRef.current.scrollBy({
                left: 400,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="bg-custom-yellow overflow-x-hidden">
        <nav className="text-black fixed w-full z-10 top-0 transition-all duration-300" style={{ backgroundColor: 'transparent', padding: '0.5rem 1rem' }}>
            <div className="container mx-auto flex justify-between items-center">
                <Link to="../" className="text-2xl font-bold flex items-center">
                    <img src={logo11} className="w-24 h-auto mr-2" alt="Logo" />
                </Link>
                <div className="hidden md:flex space-x-8">
                    {['Payment', 'Search', 'Login', 'Profile'].map((link) => (
                        <Link
                            key={link}
                            to={`../${link.toLowerCase()}`}
                            className="nav-link hover:text-amber-500"
                            style={{
                                padding: '10px 15px',
                                borderRadius: '5px',
                                transition: 'background-color 0.3s, color 0.3s',
                                display: 'inline-block',
                                textAlign: 'center'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = 'white';
                                e.target.style.color = 'black';
                                e.target.style.border = '1px solid black';
                                e.target.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.color = '';
                                e.target.style.border = 'none';
                                e.target.style.boxShadow = 'none';
                            }}
                        >
                            {link}
                        </Link>
                    ))}
                </div>
                <div className="md:hidden flex items-center">
                    <button className="mobile-menu-button">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div className="mobile-menu hidden md:hidden">
            <Link className='block py-2 px-4 text-sm hover:bg-gray-700' to="../search">Search</Link>
            <Link className='block py-2 px-4 text-sm hover:bg-gray-700' to="../profile">Profile</Link>
            <Link className='block py-2 px-4 text-sm hover:bg-gray-700' to="../payment">Upgrade</Link>
            <Link className='block py-2 px-4 text-sm hover:bg-gray-700' to="../help">Help</Link>
            </div>
        </nav>

        <img src={wallpaper} className="w-full h-screen object-cover" alt="Cinque Terre" />
        <div className="description absolute top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/2 text-left font-light px-4 md:px-0">
            <h2 className="text-5xl text-gray-800 md:font-bold">Hello And <span className="text-amber-500">World</span></h2>
            <h2 className="text-4xl text-gray-800">Plan Your <span className="text-amber-500">Dream Partner</span> With Us</h2>
            <br />
            <Link to="../signup" className="bg-amber-500 text-white py-2 px-4 rounded-md inline-block hover:bg-white hover:text-black transition-all">Register Now</Link>
        </div>

        <section className="about-section flex flex-col md:flex-row items-center p-10 bg-gray-200 rounded-lg shadow-lg overflow-hidden max-w-5xl mx-auto my-20">
            <div className="about-content flex-1 p-10 text-left">
                <h2 className="text-4xl text-gray-800">About <span className="text-amber-500">Us</span></h2>
                <p className="text-lg text-gray-600 my-5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dapibus placerat velit. Donec in porttitor elit. Suspendisse accumsan iaculis tincidunt.
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <a href="#" className="see-more text-amber-500 font-bold cursor-pointer" id="see-more">&rarr;</a>
            </div>
            <div className="about-images flex-1 relative overflow-hidden">
                <img src={img1} alt="Couple Image 1" className="w-full md:w-[80%] mx-auto rounded-md" />
            </div>
        </section>

        <div className="details-card fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[80%] bg-white p-5 shadow-lg rounded-lg z-50 hidden max-w-4xl" id="details-card">
            <h2 className="text-4xl text-gray-800">Full Details About Us</h2>
            <p className="text-lg text-gray-600 my-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p className="text-lg text-gray-600 my-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <button id="close-details" className="bg-amber-500 text-white py-2 px-4 rounded-md cursor-pointer">Close</button>
        </div>

        <section className="testimonials-section p-14 text-center bg-white">
            <h2 className="text-5xl text-amber-500 mb-12">Testimonials</h2>
            <div className="testimonials-container flex  overflow-x-auto space-x-8" ref={testimonialsRef}>
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="testimonial-card bg-custom-yellow bg-gray-200 w-96 p-8 flex-shrink-0 rounded-lg shadow-lg">
                        <div className="flex items-center mb-4">
                            <img src={testnomial1} className="w-16 h-16 rounded-full" alt={`User ${index + 1}`} />
                            <div className="ml-4 text-left">
                                <h3 className="text-2xl text-gray-800 font-bold">User {index + 1}</h3>
                                <p className="text-lg text-gray-600">User Position</p>
                            </div>
                        </div>
                        <p className="text-lg text-gray-800">
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet."
                        </p>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-10">
                <button onClick={scrollLeft} className="bg-amber-500 text-white py-2 px-4 rounded-md mx-2">←</button>
                <button onClick={scrollRight} className="bg-amber-500 text-white py-2 px-4 rounded-md mx-2">→</button>
            </div>
        </section>

            <footer className="bg-gray-800 text-white py-6">
                <div className="container mx-auto text-center">
                    <div className="flex flex-wrap justify-center gap-8">
                        <div className="mb-4 lg:w-1/2 px-4">
                            <h6 className="text-lg font-semibold uppercase">Follow Us</h6>
                            <ul className="list-none flex gap-3 mt-3 justify-center">
                                <li><a href="#" className="text-amber-500 hover:text-white">Facebook</a></li>
                                <li><a href="#" className="text-amber-500 hover:text-white">Instagram</a></li>
                                <li><a href="#" className="text-amber-500 hover:text-white">LinkedIn</a></li>
                                <li><a href="#" className="text-amber-500 hover:text-white">Twitter</a></li>
                            </ul>
                        </div>
                        <div className="mb-4 lg:w-1/2 px-4">
                            <h6 className="text-lg font-semibold uppercase">Contact Information</h6>
                            <ul className="list-none">
                                <li>Address</li>
                                <li>Contact</li>
                                <li>Email: <a href="mailto:sanvithabharani@gmail.com" className="text-amber-500">sanvithabharani@gmail.com</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Main;