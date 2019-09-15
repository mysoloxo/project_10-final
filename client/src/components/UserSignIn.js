import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignIn extends Component {
  state = {
    username: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      username,
      password,
      errors,
    } = this.state;

    return (
      //returning signin container 
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <input 
                  id="username" 
                  name="username" 
                  type="text"
                  value={username} 
                  onChange={this.change} 
                  placeholder="Username/Email" />
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />                
              </React.Fragment>
            )} />
          <p>
            Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
          </p>
        </div>
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
      const { context } = this.props;
      const { from } = this.props.location.state || { from: { pathname: '/' } }
      const { username, password } = this.state;
    //setting validations for signin 
      if(!username) {
        this.setState({
          errors: 'An email address is required'
        })
      } else if (!password) {
        this.setState({
          errors: 'A password is required'
        })
      } else {
        //redring the signin action 
      context.actions.signIn(username, password)
      .then( user => {
          if (user) {
            //if user signin is successful set path location to previouse
          this.props.history.push(from);
              console.log(`Success! ${username} is now signed in!`);
             
          } else {
               this.setState( () => {
                  return { errors: [ 'Sign-in was unsuccessful' ] };
              });
          }
        })
          .catch((error) => {
          console.error(error);
          this.props.history.push('/error');
        });
      }
    
  }

  cancel = () => {
      this.props.history.push('/');
  }


  
}
