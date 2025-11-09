import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Body from './components/Body';
import Login from './components/Login/Login';
import Panel from './components/Panel/Panel';
import Footer from './components/Footer/Footer'
import MobileAccountMenu from './components/Navbar/MobileAccountMenu';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
         <MobileAccountMenu />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Body />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Panel" element={<Panel />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;