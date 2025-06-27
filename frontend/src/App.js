import './App.css';
import { Route, Routes } from 'react-router-dom';
import LayoutDefault from './layouts/LayoutDefault';
import Home from './pages/Home';
import ManageProduct from './pages/ManageProduct';
import Page404 from './pages/Page404';
import Import from './pages/Import';
import Export from './pages/Export';
import Main from './components/introduce/Main_intro.js';
import Profile from './pages/Profile/index.js';
import Surprised from './pages/Surprised/index.js';
import ProtectedRoute from './components/introduce/protect.js';
import { Loading } from './components/introduce/Loading.js';
import ManageAccount from './pages/ManageAccount/index.js';
import RolesGroup from './pages/RolesGroup/index.js';
import Permissions from './pages/Permission/index.js';
import Notification from './components/Notification/notification.js';
import CalendarComponent from './pages/Calendar/index.js';

function App() {
  return (
    <>
      <Loading />
      <Notification />
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Main />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <LayoutDefault />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="manage-product" element={<ManageProduct />} />
          <Route path="manage-account" element={<ManageAccount />} />
          <Route path="roles-group" element={<RolesGroup />} />
          <Route path="permissions" element={<Permissions />} />
          <Route path="import" element={<Import />} />
          <Route path="export" element={<Export />} />
          <Route path="calendar" element={<CalendarComponent />} />
          <Route path="surprised" element={<Surprised />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;