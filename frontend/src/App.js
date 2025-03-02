import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainIntro from './components/introduce/Main_intro.js';
import ManageProduct from './pages/ManageProduct';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainIntro />} />
          <Route path="/home/manage-product" element={<ManageProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;