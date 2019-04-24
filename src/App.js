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
        listDisplay:"none"
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
        console.log(e.target.value)
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            }
        });

    }

  



    render() {

        const listPage = <Container
        
                clientName={this.state.queryName}
                handlesignOut={this.handlesignOut}/>
       

        return (
            <div className="App">

               



                <Route
                 exact
                    path='/your-list'
                 
                   >
                     {listPage}
                   
                   </Route>

            </div>
        );
    }
}

export default App;
