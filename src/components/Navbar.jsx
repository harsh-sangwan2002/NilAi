import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";

const navItems = ["Problem", "Solution", "Proposition", "Strategies", "Team", "Contact"];

const NavBar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  const audioElementRef = useRef(null);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900 shadow-md h-16 sm:inset-x-6 transition-all duration-300">
      <header className="h-full w-full">
        <nav className="flex h-full items-center justify-between px-4">
          {/* Logo and Product button */}
          <div className="flex items-center gap-7">
            <img src="/img/logo2.png" alt="logo" className="w-10 rounded-full" />
            <a href="#hero">
              <Button
                id="product-button"
                title="NilAi"
                rightIcon={<TiLocationArrow />}
                containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
              />
            </a>
          </div>

          {/* Navigation Links and Audio Button */}
          <div className="flex items-center">
            <div className="hidden md:flex gap-4">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn text-sm"
                >
                  {item}
                </a>
              ))}
            </div>

            <button
              onClick={toggleAudioIndicator}
              className="ml-10 flex items-center space-x-0.5"
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line", {
                    active: isIndicatorActive,
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
