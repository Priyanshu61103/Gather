import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "./Components/HomePage";
import { store } from "./Redux/Store/store";
import { Provider } from "react-redux";
import StoryPage from "./Components/StoryPage";
import Messages from "./Components/Messages";
import Connections from "./Components/Connections";
import Discover from "./Components/Discover";
import Profile from "./Components/Profile";
import CreatePost from "./Components/CreatePost";
import MessagePage from "./Components/MessagePage";
import SignUpPage from "./Components/SignUpPage";
import OtpVerification from "./Components/OtpVerification";
import Protected from "./Components/Protected";
import SignInPage from "./Components/SignInPage";
import CurrentPost from "./Components/CurrentPost";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Protected><HomePage /></Protected>}></Route>
          <Route path="/signin" element={<SignInPage />}></Route>
          <Route path="/story-page/:id" element={<Protected><StoryPage /></Protected>}></Route>
          <Route path="/messages" element={<Protected><Messages /></Protected>}></Route>
          <Route path="/connections" element={<Protected><Connections /></Protected>}></Route>
          <Route path="/discover" element={<Protected><Discover /></Protected>}></Route>
          <Route path="/profile/:email" element={<Protected><Profile /></Protected>}></Route>
          <Route path="/create-post" element={<Protected><CreatePost /></Protected>}></Route>
          <Route path="/messages/:email" element={<Protected><MessagePage/></Protected>}></Route>
          <Route path="/signup" element={<SignUpPage/>}></Route>
          <Route path="/otp-verification-page" element={<OtpVerification/>}></Route>
          <Route path="/posts/:id" element={<Protected><CurrentPost/></Protected>}></Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
