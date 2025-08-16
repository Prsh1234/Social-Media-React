import './css/App.css';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import HomeLayout from './component/HomeLayout';
import FriendRequests from './pages/FriendRequests';
import ProfileLayout from './component/ProfileLayout';
import Profile from './pages/Profile';
import Timeline from './pages/Timeline';
import ChangePassword from './pages/ChangePassword';
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


          <Route path="/profile" element={<ProfileLayout />}>
            <Route path="/profile/info" element={<Profile />} />
            <Route path="/profile/timeline" element={<Timeline />} />
            <Route path="/profile/changePassword" element={<ChangePassword />} />
            <Route path="/profile/friends/friendRequests" element={<FriendRequests />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
