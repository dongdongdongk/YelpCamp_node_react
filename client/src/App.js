import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import CampGround from './pages/campground';
import CampGroundDetail from './pages/campgroundDetail';
import CampGroundAdd from './pages/campgroundAdd';
import CampGroundUpdate from './pages/campgroundUpdate';
import AdditionalContent from './pages/AdditionalContent';


function App() {

  
  return (
    <div className='d-flex flex-column min-vh-100'>
      <div className="container mt-3 flex-grow-1">
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='campground' element={<CampGround />}/>
          <Route path='campground/:id' element={<CampGroundDetail />}/>
          <Route path='campground/new' element={<CampGroundAdd/>}/>
          <Route path='campground/:id/edit' element={<CampGroundUpdate/>}/>
          <Route path='*' element={<AdditionalContent />}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
