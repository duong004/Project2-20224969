import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainIntro from './components/introduce/Main_intro.js';
import ProtectedRoute from './components/introduce/protect.js';
import LayoutDefault from './layouts/LayoutDefault';
import ManageProduct from './pages/ManageProduct';
import Export from './pages/Export'; 
import Import from './pages/Import';
import Home from './pages/Home';
import RolesGroup from './pages/RolesGroup/index.js';
import Permissions from './pages/Permission/index.js';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route công khai */}
        <Route path="/" element={<MainIntro />} />

        {/* Các routes cần bảo vệ */}
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <LayoutDefault />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} /> 
          <Route path="manage-product" element={<ManageProduct />} />
          <Route path = 'roles-group' element={<RolesGroup/>}/>
          <Route path = 'permissions' element={<Permissions/>}/>
          <Route path="export" element={<Export />} />
          <Route path="import" element={<Import />} /> 
        </Route>
      </Routes>
    </Router>
  );
}

export default App;