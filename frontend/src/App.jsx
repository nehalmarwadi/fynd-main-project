import { Route, Routes } from "react-router-dom";
import {
  Home,
  Playlist,
  LikedVideos,
  SavedVideos,
  VideoPlayer,
  Login,
  Signup,
} from "./Pages";
import { PrivateRoute } from "./PrivateRoute/PrivateRoute";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/watch/:id" element={<VideoPlayer />} />
        <Route
          path="/likedvideos"
          element={
            <PrivateRoute>
              <LikedVideos />
            </PrivateRoute>
          }
        />
        <Route
          path="/playlists"
          element={
            <PrivateRoute>
              <Playlist />
            </PrivateRoute>
          }
        />
        <Route
          path="/savedvideos"
          element={
            <PrivateRoute>
              <SavedVideos />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
