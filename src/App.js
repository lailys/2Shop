import React, {Component} from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import Container from './components/Container';
import {Form, Button} from 'react-bootstrap';

import escapeRegExp from 'escape-string-regexp';
import {LinkContainer} from "react-router-bootstrap";

class App extends Component {

    state = {
        clientName: "",
        clientEmail: "",
        clients: [],
        queryId: "",
        queryEmail: "",
        moved: false,
        X: 0,
        p: "",
        up: "none", 
        in: "",
        incolor: "#005da5",
        upcolor: ""
    }

    componentDidMount() {
        this.hydrateStateWithLocalStorage();

    }

    componentWillUnmount() {

        // saves if component has a chance to unmount
        this.saveStateToLocalStorage();
    }

    hydrateStateWithLocalStorage() {
        for (let key in this.state) {
            if (localStorage.hasOwnProperty(key)) {
                let value = localStorage.getItem(key);
                try {
                    value = JSON.parse(value);
                    this.setState({[key]: value});
                } catch (e) {
                    this.setState({[key]: value});
                }
            }
        }
    }

    saveStateToLocalStorage() {
        // for every item in React state
        for (let key in this.state) {
            // save to localStorage
            localStorage.setItem(key, JSON.stringify(this.state[key]));
        }
    }

    queryChangeEmail = (key, word) => {
        console.log(word)

        const final = word.replace(/\//, "")
        this.setState(() => {
            return {queryEmail: final}
        })
        localStorage.setItem(key, word);
    }

    queryChangeId = (key, word) => {
        this.setState(() => {
            return {queryId: escapeRegExp(word)}
        })
        localStorage.setItem(key, word);
    }

    addCostumer = async(e) => {
        const addedName = this.state.queryId;
        const addedEmail = this.state.queryEmail;

        const costumer = {
            'name': addedName,
            'email': addedEmail
        };
        const clientName = addedName
        const clients = [...this.state.clients]
        clients.push(costumer)
        this.setState(() => {
            return {clientEmail: addedEmail, clientName: addedName, clients}
        })

        localStorage.setItem("clientName", clientName);
        localStorage.setItem("newperson", "");

        await this.setState(() => {
            return {queryId: "", queryEmail: ""}
        })
    }


    render() {
        return (
            <div className="App">
                <header className="sign-in-header">
                <LinkContainer
                            to="/signup"
                            style={{
                            textDecoration: "none",
                            color:"white"
                        }}
                        activeStyle={{
                           color:"#005da5"
                        }}>
                        <a className="signup" id="signup">
                        Sign Up
                        </a>
                        </LinkContainer>
                        <LinkContainer
                            to="/signin"
                            style={{
                            textDecoration: "none",
                            color:"white"
                        }}
                        activeStyle={{
                            color:"#005da5"
                                                    }}>
                        <a className="signin" id="signin">
                        Sign In
                        </a>
                        </LinkContainer>
                    </header>

                    <h3>"Just click on sign in/up button for now"</h3>




                    <Route
             exact
             path='/'
             render={() => (
                <div className="sign-up-page">



                
                <form
                        id="sign-in-form"
                        onSubmit={(e) => this.addCostumer(e.target.value)}
                     >
                        <input
                            type="username"
                            placeholder="Username..."
                            className="form-in"
                            required
                            value={this.state.queryEmail}
                            name="email"
                            onChange={(e) => this.queryChangeEmail("newEmail", e.target.value)}/>
                        <input
                            type="password"
                            placeholder="Password..."
                            className="form-in"
                            required
                            value={this.state.queryId}
                            name="name"
                            onChange={(e) => this.queryChangeId("newName", e.target.value)}/>
                        <LinkContainer
                            to="/your-list"
                            style={{
                            textDecoration: "none"
                        }}>
                            <Button
                                type="submit"
                                className="form-sign-up-btn"
                                >
                                Sign in
                            </Button>
                        </LinkContainer>
                        <span
                          style={{color:"#2E1C18",
                          fontSize:"1.2vw",
                          cursor: "pointer"}}>dont have an accout?!
                              <LinkContainer
                            to="/signup"
                            style={{
                            textDecoration: "none"
                        }}>
                          <a
                          className="signin"
                         style={{color:"#176BAD",
                         fontSize:"1.2vw"}}
                          >
                          click here
                          </a>

                          </LinkContainer></span>
                    </form>

                </div>
             )}
                   />




               
                    <Route
             exact
             path='/signin'
             render={() => (
                <div className="sign-up-page">
                <form
                        id="sign-in-form"
                     >
                        <input
                            type="username"
                            placeholder="Username..."
                            className="form-in"
                            required
                            value={this.state.queryEmail}
                            name="email"
                            onChange={(e) => this.queryChangeEmail("newEmail", e.target.value)}/>
                        <input
                            type="password"
                            placeholder="Password..."
                            className="form-in"
                            required
                            value={this.state.queryId}
                            name="name"
                            onChange={(e) => this.queryChangeId("newName", e.target.value)}/>
                        <LinkContainer
                            to="/your-list"
                            style={{
                            textDecoration: "none"
                        }}>
                            <Button
                                type="submit"
                                className="form-sign-up-btn"
                                onClick={(e) => this.addCostumer(e.target.value)}>
                                Sign in
                            </Button>
                        </LinkContainer>
                        <span
                          style={{color:"#2E1C18",
                          fontSize:"1.2vw",
                          cursor: "pointer"}}>dont have an accout?!
                             <LinkContainer
                            to="/signup"
                            style={{
                            textDecoration: "none"
                        }}>
                          <a
                          className="signin"
                         style={{color:"#176BAD",
                         fontSize:"1.2vw"}}
                          >click here</a>
                          </LinkContainer>
                          </span>
                    </form>

                </div>
             )}
                   />

                    

                    
                        
                    <Route
             exact
             path='/signup' render={() => (
                <div className="sign-up-page">
                <form
                        id="sign-in-form"
                     >
                     <input
                            type="username"
                            placeholder="Username..."
                            className="form-in"
                            required
                            value={this.state.queryEmail}
                            name="username"
                            onChange={(e) => this.queryChangeEmail("newEmail", e.target.value)}/>
                        <input
                            type="email"
                            placeholder="Email..."
                            className="form-in"
                            required
                            value={this.state.queryEmail}
                            name="email"
                            onChange={(e) => this.queryChangeEmail("newEmail", e.target.value)}/>
                        <input
                            type="password"
                            placeholder="Password..."
                            className="form-in"
                            required
                            value={this.state.queryId}
                            name="name"
                            onChange={(e) => this.queryChangeId("newName", e.target.value)}/>
                        <LinkContainer
                            to="/your-list"
                            style={{
                            textDecoration: "none"
                        }}>
                            <Button
                                type="submit"
                                className="form-sign-up-btn"
                                onClick={(e) => this.addCostumer(e.target.value)}>
                                Sign Up
                            </Button>
                        </LinkContainer>
                      
                    </form>

                </div>
             )}
                />
                   
            
                <Route
                    path='/your-list'
                    render={() => (<Container clientName={this.state.clientName}/>)}/>

            </div>
        );
    }
}

export default App;
