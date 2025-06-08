const Navbar = () => {
    const navLinks = [
        { label: "Home", href: "#hero" },
        { label: "About NilAi", href: "#about" },
        { label: "Problem", href: "#problem" },
        { label: "How It Works", href: "#works" },
        { label: "Contact", href: "#contact" },
    ];

    const handleScroll = (e, href) => {
        e.preventDefault();

        const targetId = href.replace("#", "");
        const targetEl = document.getElementById(targetId);

        if (targetEl) {
            setTimeout(() => {
                targetEl.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }, 100);
        }
    };

    return (
        <div className="bg-black text-white sticky top-0 z-50 navbar-bounce">
            <ul className="flex flex-col md:flex-row justify-center md:justify-between items-center w-full max-w-6xl mx-auto px-4 py-4 gap-4 md:gap-0">
                {navLinks.map((link) => (
                    <li key={link.label}>
                        <a
                            href={link.href}
                            onClick={(e) => handleScroll(e, link.href)}
                            className="relative text-xl font-light after:block after:h-[2px] after:bg-white after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
                        >
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Navbar;
