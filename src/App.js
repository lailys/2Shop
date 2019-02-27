import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Container from './components/Container';
import CreatAccount from './components/CreatAccount';
import {Form, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp';




class App extends Component {


  state={
    clientName:"",
    clientEmail:"",
    clients:[],
    queryId:"",
    queryEmail:""
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
          this.setState({ [key]: value });
        } catch (e) {
          this.setState({ [key]: value });
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

queryChangeEmail = (key,word) => {
this.setState(() => {
    return {queryEmail: escapeRegExp(word)}
})
localStorage.setItem(key, word);
}

queryChangeId = (key,word) => {
this.setState(() => {
  return {queryId: escapeRegExp(word)}
})
localStorage.setItem(key, word);
}




addCostumer=async(e)=>{
const addedName = this.state.queryId;
const addedEmail = this.state.queryEmail;

const costumer = {
    'name': addedName,
    'email': addedEmail,
   
};
const clientName=addedName
const clients=[...this.state.clients]
clients.push(costumer)
this.setState(() => {
  return {clientEmail:addedEmail, clientName:addedName,clients}
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
            <Route exact path='/' render={() => (
                <div className="sign-in">
                <Form className="sign-in-form" >
        
                    <Form.Label
                        column
                        sm={2}
                        className="form-lable"
                        style={{
                        marginTop: "3%"
                    }}>
                        Email@
                    </Form.Label>
        
                    <Form.Control type="email" placeholder="Email" className="form-in"
                    required="required" value={this.state.queryEmail}  name="email"
                    onChange={(e) => this.queryChangeEmail("newEmail",e.target.value)}/>
        
                    <Form.Label column sm={2} className="form-lable">
                        Name:
                    </Form.Label>
        
                    <Form.Control type="name" placeholder="Name" className="form-in"
                    required="required" value={this.state.queryId} name="name"
                    onChange={(e) => this.queryChangeId("newName",e.target.value)}/>
                    <Link  
                        to="/your-list"
                        style={{
                        width: "80%",
                       height:"20%",
                       display: "flex",
                       justifyContent: "center",
                       alignItems: "center",
                       textDecoration:"none"
                    }}>
                        <Button type="submit" className="form-sign-up-btn" 
                        onClick={(e)=>this.addCostumer(e.target.value)}
                        >
                            Sign in
                        </Button>
                        </Link>
                </Form>
               
            </div>
            )}/>

<Route path='/your-list' render={()=>(
<Container clientName={this.state.clientName} 
/>)}/>


     



   
      </div>
    );
  }
}

export default App;
