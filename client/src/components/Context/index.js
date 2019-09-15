import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from '../Data';

const Context = React.createContext(); 

export class Provider extends Component {

  state = {
    //Using cookies to preserve the authenticated user state. 
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null
  };

//contructing an instance of the Data class
  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    //Getting  the authenticatedUser state 
    const { authenticatedUser } = this.state;

    const value = {
      authenticatedUser,
      data: this.data,
      actions: { 
        signIn: this.signIn,
        signOut: this.signOut
      }
    };

    return (
      <Context.Provider value={value}>
        {/* making the parent props accessable to its children */}
        {this.props.children}
      </Context.Provider>  
    );
  }
  
  //Greating the signin method and passing getUser to retrieve fethed userdata
  signIn = async (username, password) => {
    const user = await this.data.getUser(username, password);
    
    //setting the state of the user if retrieved fetch is not null
    if (user !== null) {
      this.setState( () => {
        return {
          authenticatedUser: {user, password: password}
        };
      });
      //setting authenticated user to cookie and making expiration day for stored data 1 day
      Cookies.set('authenticatedUser', JSON.stringify(this.state.authenticatedUser), { expires: 1 });
    }
    return user;
  }

  //creating the singout method 
  signOut = () => {
    this.setState( () => {
      return {
        authenticatedUser: null
      };
    });
    //removing authenticated user data from cookie on signout
    Cookies.remove('authenticatedUser');
  }
}


/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

//exporting Consumer
export const Consumer = Context.Consumer;

//the following is a higher order component that automatically matches the passed component to the actions and data
export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

