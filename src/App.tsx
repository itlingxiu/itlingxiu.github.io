import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MobileNav from './components/MobileNav';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import TechCategory from './pages/TechCategory';
import Resources from './pages/Resources';
import Cooperation from './pages/Cooperation';
import Certificate from './pages/Certificate';

import Html from './pages/Frontend/Html';
import Css from './pages/Frontend/Css';
import JavaScript from './pages/Frontend/JavaScript';

import Webpack from './pages/Engineering/Webpack';
import Vite from './pages/Engineering/Vite';
import Desktop from './pages/Engineering/Desktop';

import Hooks from './pages/ReactPages/Hooks';
import State from './pages/ReactPages/State';
import Performance from './pages/ReactPages/Performance';

import VueBasic from './pages/VuePages/Basic';
import Pinia from './pages/VuePages/Pinia';
import VueRouter from './pages/VuePages/Router';

import Express from './pages/NodePages/Express';
import Nest from './pages/NodePages/Nest';
import NodePractice from './pages/NodePages/Practice';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/tech-category" element={<TechCategory />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/cooperation" element={<Cooperation />} />
            <Route path="/certificate" element={<Certificate />} />

            <Route path="/frontend-basic" element={<Html />} />
            <Route path="/frontend-basic/html" element={<Html />} />
            <Route path="/frontend-basic/css" element={<Css />} />
            <Route path="/frontend-basic/js" element={<JavaScript />} />

            <Route path="/frontend-engineering" element={<Webpack />} />
            <Route path="/frontend-engineering/build" element={<Webpack />} />
            <Route path="/frontend-engineering/ci" element={<Vite />} />
            <Route path="/frontend-engineering/quality" element={<Desktop />} />

            <Route path="/react" element={<Hooks />} />
            <Route path="/react/hooks" element={<Hooks />} />
            <Route path="/react/state" element={<State />} />
            <Route path="/react/perf" element={<Performance />} />

            <Route path="/vue" element={<VueBasic />} />
            <Route path="/vue/basic" element={<VueBasic />} />
            <Route path="/vue/pinia" element={<Pinia />} />
            <Route path="/vue/router" element={<VueRouter />} />

            <Route path="/node" element={<Express />} />
            <Route path="/node/express" element={<Express />} />
            <Route path="/node/nest" element={<Nest />} />
            <Route path="/node/practice" element={<NodePractice />} />
          </Routes>
        </Layout>
        <MobileNav />
      </div>
    </Router>
  );
}

export default App;
