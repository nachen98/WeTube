import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import VideosList from './components/VideosList/VideosList';
import { SingleVideo } from './components/SingleVideo/SingleVideo';
import  ChannelPage from './components/ChannelPage/ChannelPage'
import Footer from "./components/Footer";
import ScrollToTop from './util/helper';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>

      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route exact path='/'>
          <NavBar />
          <VideosList />
        </Route>

        <Route exact path='/videos/:videoId'>
          <NavBar />
          <ScrollToTop />
          <SingleVideo />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute exact path='/channel/@:username'>
          <NavBar />
          <ChannelPage />
        </ProtectedRoute>
        {/* <ProtectedRoute exact path='/channel/@:username/home'>
          <NavBar />
          <ChannelHome />
        </ProtectedRoute>
        <ProtectedRoute exact path='/channel/@:username/uploads'>
          <NavBar />
          <ChannelUploads />
        </ProtectedRoute>
        <ProtectedRoute exact path='/channel/@:username/liked'>
          <NavBar />
          <ChannelLikes />
        </ProtectedRoute>
        <ProtectedRoute exact path='/channel/@:username/about'>
          <NavBar />
          <ChannelAbout />
        </ProtectedRoute>  */}
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>
      </Switch>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
