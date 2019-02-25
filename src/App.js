import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Container from './components/Container';
import CreatAccount from './components/CreatAccount';
import escapeRegExp from 'escape-string-regexp';



class App extends Component {

  state={
    clientName:"",
    clientEmail:"",
    clients:[],
    queryId:"",
    queryEmail:""
  }

  

  queryChangeEmail = (word) => {
    console.log(word)
    this.setState(() => {
        return {queryEmail: escapeRegExp(word)}
    })

}

queryChangeId = (word) => {
  console.log(word)
  this.setState(() => {
      return {queryId: escapeRegExp(word)}
  })

}

submit=(e)=>{
  e.preventDefault()
  console.log(this)
}


  addCostumer=async(e)=>{
    const addedName = this.state.queryId;
    const addedEmail = this.state.queryEmail;
    const costumer = {
        'name': addedName,
        'email': addedEmail
    };
    this.state.clients.push(costumer)
    this.setState(() => {
      return {clientEmail:addedEmail, clientName:addedName}
  })

    await this.setState(() => {
        return {queryId: "", queryEmail: ""}
    })
}


  render() {
    console.log(this.state.clientName)
    return (
      <div className="App">
            <Route exact path='/' render={() => (
 <CreatAccount addCostumer={this.addCostumer} clients={this.state.clients} 
 queryChangeEmail={this.queryChangeEmail}
 queryChangeId={this.queryChangeId}/>
      )}/>

<Route path='/your-list' render={()=>(<Container clientName={this.state.clientName} clients={this.state.clients}/>)}/>


     



   
      </div>
    );
  }
}

export default App;
