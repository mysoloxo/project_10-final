import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import axios from 'axios';

export default class CourseDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      authUser: {},
      course: {},
      creator: {},
      deleteClicked: false,
      courseURL: props.match.url,
      errors: [],
      loading: true
    }
    
    this.deleteButton = this.deleteButton.bind(this);
    this.delete = this.delete.bind(this);
  }
  //creating the DidMount component 
  componentDidMount() {
    if (this.props.context.authenticatedUser) {
      this.setState({authUser: this.props.context.authenticatedUser.user});
    }
    //passing the getCourse method to render fetched courses 
    this.getCourse();
    this.props.context.from = this.props.location.pathname;
  }

  //creating the getcourse method to get all courses
  getCourse() {
    axios.get(`http://localhost:5000/api${this.state.courseURL}`)
    .then(response => {
      //creating an if statement for if response status from api is not 200(passed)
      if (response.status !== 200) {
        this.setState({ errors: response });
      } else {
      //creating if statement for if response is not null setting the state and if it is throw a javascript error which is being caught by the catch 
       if (response.data.courses !== null) 
       {this.setState({ course: response.data.courses, loading: false });
        console.log(response.data.courses);
      }else{
        throw Error;
      }
      }
      
    }).catch((err) => {//catch method is catching error and setting /notfound route as new path location 
      console.log(err);
      this.props.history.push('/notfound');
    });
  }

  //setting the delete method 
  deleteButton() {
    this.setState(prevState => ({ deleteClicked: !prevState.deleteClicked }));
  }

  render() {
    const { authUser, course,  courseURL } = this.state;
    const { deleteClicked } = this.state;

    return (
        (this.state.loading)
        ? null
        :
        <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">

              {deleteClicked ? (
                <span>
                  <p>Are you sure you want to delete this course?</p>
                  <button className="button" onClick={this.delete}>Yes</button>
                  <button className="button" onClick={this.deleteButton}>No</button>
                </span>
              ) : (
                <span>
                  {authUser.id === course.User.id ? (
                    <span>
                      <Link to={`${courseURL}/update`} className="button">Update Course</Link>
                      <button className="button" onClick={this.deleteButton}>Delete Course</button>
                    </span>
                  ) : null }
                </span>
              )}
              <Link to="/" className="button button-secondary">Return to List</Link>
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{course.title}</h3>
              <p>by {course.User.firstName} {course.User.lastName}</p>
            </div>
            <div className="course--description">
              <Markdown source={course.description} />
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                 <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <h3>{course.estimatedTime}</h3>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <Markdown source={course.materialsNeeded} />
                  </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  delete = () => {

    const { course } = this.state;

    const credentials = {
        username: this.props.context.authenticatedUser.user.emailAddress,
        password: this.props.context.authenticatedUser.password
    }

    this.props.context.data.delete(course, credentials)
    .then( response => {
        if (response.status !== 204) {
          this.setState({ errors: response });
          console.log(this.state.errors);
        } else {
          this.props.history.push('/');
          return response;
        }
    }).catch( err => {
        console.log(err);
        this.props.history.push('/error');
    });
}
}