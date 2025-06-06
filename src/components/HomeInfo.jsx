import { Link } from "react-router-dom";
import { arrow } from "../../public/icons";

const baseBoxClasses =
  "info-box flex flex-col items-center justify-center text-center gap-4 bg-blue-500 text-white p-6 rounded-xl shadow-lg mx-4";

const baseBtnClasses =
  "inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-all hover:scale-105 hover:shadow-md";

const HomeInfo = ({ currentStage }) => {
  if (currentStage === 1)
    return (
      <h1 className="sm:text-xl text-base sm:leading-snug leading-snug text-center bg-blue-500 rounded-xl py-4 px-8 text-white mx-5 shadow-lg">
        Hi, I'm
        <span className="font-semibold mx-2 text-white">Adrian</span>
        👋
        <br />
        A Software Engineer from Croatia 🇭🇷
      </h1>
    );

  if (currentStage === 2) {
    return (
      <div className={baseBoxClasses}>
        <p className="font-medium sm:text-xl text-base">
          Worked with many companies <br /> and picked up many skills along the way
        </p>
        <Link to="/about" className={baseBtnClasses}>
          Learn more
          <img src={arrow} alt="arrow" className="w-4 h-4 object-contain transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    );
  }

  if (currentStage === 3) {
    return (
      <div className={baseBoxClasses}>
        <p className="font-medium sm:text-xl text-base">
          Led multiple projects to success over the years. <br /> Curious about the impact?
        </p>
        <Link to="/projects" className={baseBtnClasses}>
          Visit my portfolio
          <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
        </Link>
      </div>
    );
  }

  if (currentStage === 4) {
    return (
      <div className={baseBoxClasses}>
        <p className="font-medium sm:text-xl text-base">
          Need a project done or looking for a dev? <br /> I'm just a few keystrokes away
        </p>
        <Link to="/contact" className={baseBtnClasses}>
          Let’s talk
          <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
        </Link>
      </div>
    );
  }

  if (currentStage === 5) {
    return (
      <div className={baseBoxClasses}>
        <p className="font-medium sm:text-xl text-base">
          Explore blogs & tutorials I’ve written <br /> on software engineering & AI.
        </p>
        <Link to="/blog" className={baseBtnClasses}>
          Read Blogs
          <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
        </Link>
      </div>
    );
  }

  if (currentStage === 6) {
    return (
      <div className={baseBoxClasses}>
        <p className="font-medium sm:text-xl text-base">
          Connect with me on social media <br /> or shoot me a message.
        </p>
        <Link to="/socials" className={baseBtnClasses}>
          Say Hello
          <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
        </Link>
      </div>
    );
  }

  return null;
};

export default HomeInfo;
