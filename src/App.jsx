import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import FoodListPage from '../pages/FoodListPage';
import UserProfilePage from '../pages/UserProfilePage';
import FoodCreatePage from '../pages/FoodCreatePage';


function App() {
  return (
    <>
      <Nav />
      <div className='main-container'>
        <Routes>
          <Route path='/' element={<FoodListPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route
            path="/home"
            element={
              //shall be protected for logged in user
              <UserProfilePage />

            }
          />
          <Route
            path="/admin"
            element={
              //shall be protected for admin
              <FoodCreatePage />

            }
          />
        </Routes>
      </div>
      <Footer />
    </>);
}

export default App;
