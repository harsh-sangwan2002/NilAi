const Layout = ({ children }) => {
    return (
        <div className="relative min-h-screen">
            {/* Partition Lines */}
            <div className="fixed inset-0 z-50 pointer-events-none">
                {/* Line at 25% */}
                <div
                    className="absolute top-16 w-[1px] h-full bg-white opacity-20 border-1"
                    style={{ left: "16%" }}
                />
                {/* Line at 50% */}
                <div
                    className="absolute top-16 w-[1px] h-full bg-white opacity-20 border-1"
                    style={{ left: "50%" }}
                />
                {/* Line at 75% */}
                <div
                    className="absolute top-16 w-[1px] h-full bg-white opacity-20 border-1"
                    style={{ left: "75%" }}
                />
            </div>

            {/* Render child components */}
            {children}
        </div>
    );
};

export default Layout;