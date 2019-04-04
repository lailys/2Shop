import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp';

class CreatAccount extends Component{

    state={
        clientName:"",
        clientEmail:"",
        clients:[],
        queryId:"",
        queryEmail:""
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
        'email': addedEmail
    };
    const clientName = addedName
    const clients=[...this.state.clients]
    clients.push(costumer)
    this.setState(() => {
      return {clientEmail:addedEmail, clientName:addedName,clients}
  })

  localStorage.setItem("clientName", JSON.stringify(clientName));
  localStorage.setItem("newperson", "");
  localStorage.setItem("clientName","")
 
    await this.setState(() => {
        return {queryId: "", queryEmail: ""}
    })
}

    
    
    render(){
    return (
        <div className="sign-in">
        <Form className="sign-in-form" >

            <Form.Label
                column
                sm={2}
                className="form-lable"
                style={{
                marginTop: "2%",
            }}>
                Email:
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
               textDecoration:"none",
            }}>
                <Button type="submit" className="form-sign-up-btn" 
                onClick={(e)=>this.addCostumer(e.target.value)}
                >
                    Sign in
                </Button>
                </Link>
        </Form>
       
    </div>
    );}
};

export default CreatAccount;