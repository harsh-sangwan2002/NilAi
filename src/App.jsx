import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const NavBar = lazy(() => import("./components/Navbar"));
const Hero = lazy(() => import("./components/Hero"));
const Problem = lazy(() => import("./components/Problem"));
const ProblemStats = lazy(() => import("./components/ProblemStats"));
const Solution = lazy(() => import("./components/Solution"));
const Proposition = lazy(() => import("./components/Proposition"));
const Computer = lazy(() => import("./components/Computer"));
const Team = lazy(() => import("./components/Team"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={[<NavBar />,
          <Hero />,
          <Problem />,
          <ProblemStats />,
          <Solution />,
          <Proposition />,
          <Computer />,
          <Team />,
          <Contact />,
          <Footer />]} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
