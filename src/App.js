import './App.css';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import HomeLayout from './component/HomeLayout';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />


          <Route element={<HomeLayout />}>
            <Route path="/home" element={<Home />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
