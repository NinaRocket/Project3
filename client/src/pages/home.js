// import React, { Component } from 'react';
// import axios from 'axios'
// import { Route, Link } from 'react-router-dom';
// // components
// import Signup from "../components/SignupForm";
// import LoginForm from "../components/LoginForm";
// import Navbar from '../components/Navbar';
// import API from "../utils/API";


// class Home extends Component {
//   constructor() {
//     super()
//     this.state = {
//       loggedIn: false,
//       email: null
//     }

//     this.getUser = this.getUser.bind(this)
//     this.componentDidMount = this.componentDidMount.bind(this)
//     this.updateUser = this.updateUser.bind(this)
//   }

//   componentDidMount() {
//     this.getUser()
//   }

//   updateUser (userObject) {
//     this.setState(userObject)
//   }

//   getUser() {
//     axios.get('/user/').then(response => {
//       console.log('Get user response: ')
//       console.log(response.data)
//       if (response.data.user) {
//         console.log('Get User: There is a user saved in the server session: ')

//         this.setState({
//           loggedIn: true,
//           email: response.data.user.email
//         })
//       } else {
//         console.log('Get user: no user');
//         this.setState({
//           loggedIn: false,
//           email: null
//         })
//       }
//     })
//   }

//   render() {
//     return (
//       <div className="Login">
   
//         <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
//         {/* greet user if logged in: */}
//         {this.state.loggedIn &&
//           <p>Join the party, {this.state.email}!</p>
//         }
//         {/* Routes to different components */}
//         <Route
//           exact path="/"
//           component={Home} />
//         <Route
//           path="/login"
//           render={() =>
//             <LoginForm
//               updateUser={this.updateUser}
//             />}
//         />
//         <Route
//           path="/signup"
//           render={() =>
//             <Signup/>}
//         />

//       </div>
//     );
//   }
// }

// export default Home;

import React from "react";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


function Home(){

  

    return(

        <Container>



        </Container>
    )
}

export default Home; 