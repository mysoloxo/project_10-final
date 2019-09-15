import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Courses extends Component {

    constructor() {
        super();
        this.state = {
            courses: []
        };
    }
    //setting the Didmount component and getting all courses 
    componentDidMount() {
        axios.get('http://localhost:5000/api/courses/')
        .then(res => {
          this.setState({courses: res.data.courses});
        }).catch((err) => console.log(err));
    }

    render() {
        const courseList = this.state.courses.map((course) =>
            <div key={course.id} className="grid-33">
                <Link to={`/courses/${course.id}`}>
                    <li className="course--module course--link">
                        <h4 className="course--label">Course</h4>
                        <h3 className="course--title">{course.title}</h3>
                    </li>
                </Link>
            </div>
        );

        return (
            <div>
                <div className="bounds">
                    {courseList}
                    <div className="grid-33">
                        <Link to="/courses/create" className="course--module course--add--module">
                            <h3 className="course--add--title">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                viewBox="0 0 13 13" className="add">
                                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                            </svg>New Course</h3>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}