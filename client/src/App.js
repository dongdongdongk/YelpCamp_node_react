import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import CampGround from './pages/campground';
import CampGroundDetail from './pages/campgroundDetail';
import CampGroundAdd from './pages/campgroundAdd';
import CampGroundUpdate from './pages/campgroundUpdate';
import AdditionalContent from './pages/AdditionalContent';
import Register from './pages/register';
import Login from './pages/login';
import axios from "axios";
import { useEffect, useState } from "react";
import Header from './layout/header';
import Footer from './layout/footer';


function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});


  const logout = () => {
    axios({
      url: "http://localhost:8123/logout",
      method: "POST",
      withCredentials: true,
    }).then((result) => {
      if (result.status === 200) {
        window.open("/", "_self");
      }
    });
  };

  useEffect(() => {
    try {
      axios({
        url: "http://localhost:4000/login/success",
        method: "GET",
        withCredentials: true,
      })
        .then((result) => {
          if (result.data) {
            setIsLogin(true);
            setUser(result.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, [setUser]);

  
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Header isLogin={isLogin} logout={logout} />
      <div className="container mt-3 flex-grow-1">
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='register' element={<Register/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='campground' element={<CampGround />}/>
          <Route path='campground/:id' element={<CampGroundDetail />}/>
          <Route path='campground/new' element={<CampGroundAdd/>}/>
          <Route path='campground/:id/edit' element={<CampGroundUpdate/>}/>
          <Route path='*' element={<AdditionalContent />}/>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
