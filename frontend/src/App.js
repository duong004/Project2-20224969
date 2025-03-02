import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ManageProduct from './pages/ManageProduct';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/home/manage-product" element={<ManageProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;