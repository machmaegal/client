import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ProtectedAdminRoute } from './components/ProtectedAdminRoute';
import Nav from './components/Nav';
import Footer from './components/Footer';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import FoodListPage from './pages/FoodListPage';
import DrinkListPage from './pages/DrinkListPage';
import UserProfilePage from './pages/UserProfilePage';
import AdminPage from './pages/AdminPage';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <>
      <Nav />
      <div className='main-container'>
        <Routes>
          <Route path='/' element={<FoodListPage />} />
          <Route path='/drinks' element={<DrinkListPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <UserProfilePage />
              </ProtectedRoute>

            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminPage />
              </ProtectedAdminRoute>
            }
          />
          <Route path='*' element={<ErrorPage />
          } />
        </Routes>
      </div>
      <Footer />
    </>);
}

export default App;
