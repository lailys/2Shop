import React, {Component} from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import Container from './components/Container';
import {Button} from 'react-bootstrap';

import escapeRegExp from 'escape-string-regexp';
import {LinkContainer} from "react-router-bootstrap";

class App extends Component {

    state = {
        logged:false,
        clientName: "",
        clientEmail: "",
        clients: {},
        queryPassword: "",
        queryEmail: "",
        queryName: "",
        moved: false,
        X: 0,
        p: "",
        up: "none", in: "",
        incolor: "#005da5",
        upcolor: "",
        display:"",
        listDsiplay:""
    }

    componentDidMount=()=> {
     
    

    }

    componentWillUnmount() {
    

        // saves if component has a chance to unmount

    }


print=()=>{
    console.log(this.state.clients)
}
   
    handleSignup=e=>{
        e.preventDefault();
        console.log("yey")

        const clients={
              name:this.state.queryName,
              email:this.state.queryEmail,
              password:this.state.queryPassword,
              products:[],
              display:"none"
            
            }
        this.setState({clients})
            console.log(clients) 
            if(this.state.clients){
 this.setState({logged:true,
                    display:"none"}) 
            }
    }




    handleSubmit = e => {
        e.preventDefault();
        console.log("yey")
 
 if(this.state.queryName!==""){
    console.log(this.state.queryName)
    this.setState({logged:true,
                    display:"none"}) 
 }
          
    
            
  
    }

    handleChange = e => {
        console.log(e.target.name)
        if (e.target.name === "username") {
            console.log("name:" +e.target.value)
            this.setState({queryName:e.target.value}) 
        }else  if (e.target.name === "email") {
            console.log("email:" +e.target.value)
            this.setState({queryEmail:e.target.value}) 
        }else  if (e.target.name === "password") {
            console.log("password:" +e.target.value)
            this.setState({queryPassword:e.target.value}) 
        }
    }

    handlesignOut=()=>{
        this.setState({logged:false,
            listDsiplay:"none",
            display:"",
            queryPassword:""
        })
    }




    render() {
      const listPage=this.state.logged? <Container clientName={this.state.queryName} handlesignOut={this.handlesignOut} /> :''
      

        return (
            <div className="App">

                <h2>**Just click the sign in/up button for now </h2>

              
                <Route
             exact
             path='/'
             render={() => (
                        <div className="sign-up-page" 
                        style={{display:this.state.display}}>
                        <form onSubmit={this.handleSubmit} className="sign-in-form">
    
                            <input
                                className="form-in"
                                required
                                type="text"
                                name="username"
                                placeholder=" &#xf007; Username..."
                                onChange={this.handleChange}/>
    
                         
                            <input
                                className="form-in"
                                required
                                value={this.state.queryPassword}
                                type="password"
                                name="password"
                                placeholder=" &#xf023; Password..."
                                onChange={this.handleChange}/>
    
                            <Button type="submit" className="form-sign-up-btn">
                                Sign in
                            </Button>
                            
                            <small
                              style={{color:"#2E1C18",
                              fontSize:"1.6vh",
                              cursor: "pointer"}}>dont have an accout?!
                                 <LinkContainer
                                to="/signup"
                                style={{
                                textDecoration: "none"
                            }}>
                              <a
                              className="signin"
                             style={{color:"#176BAD",
                             }}
                              >sign up here</a>
                              </LinkContainer>
                              </small>
                        </form>
                    </div>)}/ >






                <Route
             exact
             path='/sign'
             render={() => (
                        <div className="sign-up-page" 
                        style={{display:this.state.display}}>
                        <form onSubmit={this.handleSignup} className="sign-in-form">
    
                            <input
                                className="form-in"
                                required
                                type="text"
                                name="username"
                                placeholder=" &#xf007; Username..."
                                onChange={this.handleChange}/>
    
                         
                            <input
                                className="form-in"
                                required
                                type="password"
                                name="password"
                                placeholder=" &#xf023; Password..."
                                onChange={this.handleChange}/>
    
                            <Button type="submit" className="form-sign-up-btn">
                                Sign in
                            </Button>
                            
                            <small
                              style={{color:"#2E1C18",
                              fontSize:"1.6vh",
                              cursor: "pointer"}}>dont have an accout?!
                                 <LinkContainer
                                to="/signup"
                                style={{
                                textDecoration: "none"
                            }}>
                              <a
                              className="signin"
                             style={{color:"#176BAD",
                             }}
                              >sign up here</a>
                              </LinkContainer>
                              </small>
                        </form>
                    </div>)}/ >
    
                        
                    <Route
             exact
             path='/signup'
             render={() => (

                        <div className="sign-up-page">
                        <form onSubmit={e=>this.handleSignup(e)} className="sign-in-form">
    
                            <input
                                className="form-in"
                                required
                                type="text"
                                name="username"
                                placeholder=" &#xf007; Username..."
                                onChange={this.handleChange}/>
    
                            <input
                                className="form-in"
                                required
                                type="email"
                                name="email"
                                placeholder=" &#xf003; Email..."
                                onChange={this.handleChange}/>
                            <input
                                className="form-in"
                                required
                                type="password"
                                name="password"
                                placeholder=" &#xf023; Password..."
                                onChange={this.handleChange}/>
    
                            <Button type="submit" className="form-sign-up-btn">
                                Sign up
                            </Button>
                            
                            <small
                              style={{color:"#2E1C18",
                              fontSize:"1.6vh",
                              cursor: "pointer"}}>already have an account?!
                                 <LinkContainer
                                to="/sign"
                                style={{
                                textDecoration: "none"
                            }}>
                              <a
                              className="signin"
                             style={{color:"#176BAD",
                             }}
                              >sign in here</a>
                              </LinkContainer>
                              </small>
                        </form>
                    </div>

                    )}/>







                <Route
                    path='/your-list'
                    style={{display:this.state.listDsiplay}}
                   >
                    {listPage}
                   
                   </Route>

            </div>
        );
    }
}

export default App;
