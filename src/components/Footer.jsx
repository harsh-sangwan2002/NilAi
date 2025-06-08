const Footer = () => {
    return (
        <footer className="bg-black text-gray-400 py-12 px-6 mt-20 ml-15">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-8">

                {/* Brand / Logo */}
                <div className="flex flex-col space-y-4">
                    <h2 className="text-2xl font-bold text-white">NilAi</h2>
                    <p className="max-w-xs">
                        Uncovering hidden forces shaping a sustainable future.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col space-y-3">
                    <h3 className="text-white font-semibold mb-2">Quick Links</h3>
                    <ul className="space-y-1">
                        <li><a href="#about" className="hover:text-white transition">About Us</a></li>
                        <li><a href="#initiatives" className="hover:text-white transition">Initiatives</a></li>
                        <li><a href="#stories" className="hover:text-white transition">Stories</a></li>
                        <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col space-y-3">
                    <h3 className="text-white font-semibold mb-2">Contact</h3>
                    <p>Email: <a href="mailto:contact@iceberg.com" className="hover:text-white transition">contact@nilai.com</a></p>
                    <p>Phone: <a href="tel:+1234567890" className="hover:text-white transition">+1 (234) 567-890</a></p>
                    <p>Address: 123 London St, Sustainable City</p>
                </div>

                {/* Social Media */}
                <div className="flex flex-col space-y-3">
                    <h3 className="text-white font-semibold mb-2">Follow Us</h3>
                    <div className="flex space-x-4">
                        {/* Twitter */}
                        <a
                            href="https://twitter.com/iceberg"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition"
                            aria-label="Twitter"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.4a9 9 0 01-2.83 1.08 4.52 4.52 0 00-7.69 4.13A12.83 12.83 0 013 4.15a4.48 4.48 0 001.4 6 4.41 4.41 0 01-2.05-.57v.06a4.52 4.52 0 003.6 4.43 4.52 4.52 0 01-2.04.07 4.52 4.52 0 004.22 3.13 9 9 0 01-6.66 1.84 12.73 12.73 0 006.88 2.02c8.27 0 12.8-6.85 12.8-12.8 0-.2 0-.39-.01-.58A9.22 9.22 0 0023 3z" />
                            </svg>
                        </a>

                        {/* LinkedIn */}
                        <a
                            href="https://linkedin.com/company/iceberg"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition"
                            aria-label="LinkedIn"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 3a2 2 0 110 4 2 2 0 010-4z" />
                            </svg>
                        </a>

                        {/* Instagram */}
                        <a
                            href="https://instagram.com/iceberg"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition"
                            aria-label="Instagram"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm5 2a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm3.5-3a1 1 0 110 2 1 1 0 010-2z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-12 text-center text-gray-600 text-sm select-none">
                &copy; {new Date().getFullYear()} Iceberg. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
