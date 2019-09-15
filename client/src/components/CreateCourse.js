import React, { Component } from 'react';
import Form from './Form';

export default class CreateCourse extends Component {
    state = {
        //getting authenticatedUser 
        authUser: this.props.context.authenticatedUser.user,
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: []
    }

    render() {
        const {
            //setting the state of the required constants 
            authUser,
            title,
            description,
            estimatedTime,
            materialsNeeded,
            errors
        } = this.state;
        
        return (
            //returning the create course container
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <div>
                    <Form 
                    cancel={this.cancel}
                    errors={errors}
                    submit={this.submit}
                    submitButtonText="Create Course"
                    elements={ () => (
                        <React.Fragment>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div>
                                    <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    className="input-title course--title--input"
                                    value={title} 
                                    onChange={this.change}
                                    placeholder="Course title..." />
                                </div>
                            <p>By {authUser.firstName} {authUser.lastName}</p>
                            </div>
                            <div className="course--description">
                                <div>
                                    <textarea
                                    id="description"
                                    name="description" 
                                    value={description} 
                                    onChange={this.change}
                                    placeholder="Course description..." />
                                </div>
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <div>
                                            <input
                                            id="estimatedTime"
                                            name="estimatedTime"
                                            type="text"
                                            className="course--time--input"
                                            value={estimatedTime} 
                                            onChange={this.change}
                                            placeholder="___ Hours" />
                                        </div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <div>
                                            <textarea
                                            id="materialsNeeded" 
                                            name="materialsNeeded" 
                                            value={materialsNeeded} 
                                            onChange={this.change}
                                            placeholder="List materials (Seperated by an asterisk and new line)" />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        </React.Fragment>
                    )} />
            </div>
        </div>
        );
    }

    change = (event) => {
        const { name } = event.target;
        const { value }= event.target;
    
        this.setState(() => {
          return {
            [name]: value
          };
        });
      }
    
      submit = () => {
          const { context } = this.props;
    
          const {
            title,
            description,
            estimatedTime,
            materialsNeeded
          } = this.state;
    
          // New course payload
          const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId: this.state.authUser.id
          }

          const credentials = {
              username: this.props.context.authenticatedUser.user.emailAddress,
              password: this.props.context.authenticatedUser.password
          }

          if(!title) {
            this.setState({
              errors: 'A title is required'
            })
          }   
          else if (!description) {
            this.setState({
              errors: 'description is required'
            })
          } else {
       
          //creating new course an rendering to the courses route 
          context.data.createCourse(course, credentials)
          .then( response => {
              if (response.status !== 201) {
                this.setState({ errors: response });
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
    
      cancel = () => {
          this.props.history.push('/');
      }
}