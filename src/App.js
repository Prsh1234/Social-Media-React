import './css/App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import HomeLayout from './component/HomeLayout';
import FriendRequests from './pages/profile/FriendRequests';
import ProfileLayout from './component/profile/ProfileLayout';
import Profile from './pages/profile/Profile';
import Timeline from './pages/profile/Timeline';
import ChangePassword from './pages/profile/ChangePassword';
import Friends from './pages/profile/Friends';
import FriendTimeline from './pages/friend/FriendTimeline';
import FriendLayout from './component/friend/FriendLayout';
import FriendProfile from './pages/friend/FriendProfile';
import FriendofFriend from './pages/friend/FriendofFriend';
import ChatLayout from './component/chat/ChatLayout';
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


            <Route path="/chat" element={<ChatLayout />} />



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
