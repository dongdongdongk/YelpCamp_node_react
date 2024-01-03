import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import CampGround from './pages/campground';
import CampGroundDetail from './pages/campgroundDetail';
import CampGroundAdd from './pages/campgroundAdd';
import CampGroundUpdate from './pages/campgroundUpdate';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='campground' element={<CampGround />}/>
      <Route path='campground/:id' element={<CampGroundDetail />}/>
      <Route path='campground/new' element={<CampGroundAdd/>}/>
      <Route path='campground/:id/edit' element={<CampGroundUpdate/>}/>
    </Routes>
  );
}

export default App;
