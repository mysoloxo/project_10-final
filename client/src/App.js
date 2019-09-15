import React, { Component } from 'react';
// import { Provider } from './components/Context';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// Importing needed components 
import Header from './components/Header';
import Authenticated from './components/Authenticated';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import UnhandledError from './components/UnhandledError';
import Forbidden from './components/Forbidden';
import NotFound from './components/NotFound';

import withContext from './components/Context';
import PrivateRoute from './PrivateRoute';
//Storing required components functionality with context in constants to be used in the routing 
const HeaderWithContext = withContext(Header);
const AuthWithContext = withContext(Authenticated);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CreateCourseWithContext = withContext(CreateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse);

export default class App extends Component {
//Rendering the route parts 
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <HeaderWithContext />

          <Switch>
            <Route exact path="/" render={ () => <Redirect to="/courses" /> } />
            <Route exact path="/courses" component={Courses} />
            <PrivateRoute path="/authenticated" component={AuthWithContext} />
            <PrivateRoute exact path="/courses/create" component={CreateCourseWithContext} />
            <Route exact path="/courses/:id" component={CourseDetailWithContext} />
            <PrivateRoute exact path="/courses/:id/update" component={UpdateCourseWithContext} />
            <Route path="/signin" component={UserSignInWithContext} />
            <Route path="/signup" component={UserSignUpWithContext} />
            <Route path="/signout" component={UserSignOutWithContext} />
            <Route path="/forbidden" component={Forbidden} />
            <Route path="/error" component={UnhandledError} />
            <Route path="/notfound" component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}