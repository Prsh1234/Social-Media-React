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
import Friends from './pages/Friends';
import FriendTimeline from './pages/FriendTimeline';
import FriendLayout from './component/FriendLayout';
import FriendProfile from './pages/FriendProfile';
import FriendofFriend from './pages/FriendofFriend';
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


          <Route element={<ProfileLayout />}>
            <Route path="/profile" element={<Navigate to="/profile/info" replace />} />
            <Route path="/profile/info" element={<Profile />} />
            <Route path="/profile/timeline" element={<Timeline />} />
            <Route path="/profile/changePassword" element={<ChangePassword />} />
            <Route path="/profile/friendRequests" element={<FriendRequests />} />
            <Route path="/profile/friends" element={<Friends />} />
          </Route>

          <Route element={<FriendLayout />}>
            <Route path="/friend/info/:friendId" element={<FriendProfile />} />
            <Route path="/friend/timeline/:friendId" element={<FriendTimeline />} />
            <Route path="/friend/friends/:friendId" element={<FriendofFriend />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
