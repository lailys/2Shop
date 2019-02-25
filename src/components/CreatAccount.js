import React from 'react';
import {Form, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import serializeForm from 'form-serialize'

const CreatAccount = (props) => {
    return (
        <div className="sign-in">
        <Form className="sign-in-form"
        onSubmit={props.submit}>

            <Form.Label
                column
                sm={2}
                className="form-lable"
                style={{
                marginTop: "10%"
            }}>
                Email@
            </Form.Label>

            <Form.Control type="email" placeholder="Email" className="form-in"
            required="required" value={props.queryEmail}  name="email"
            onChange={(e) => props.queryChangeEmail(e.target.value)}/>

            <Form.Label column sm={2} className="form-lable">
                Name:
            </Form.Label>

            <Form.Control type="name" placeholder="Name" className="form-in"
            required="required" value={props.queryId} name="name"
            onChange={(e) => props.queryChangeId(e.target.value)}/>
            <Link  
                to="/your-list"
                style={{
                width: "80%"
            }}>
                <Button type="submit" className="form-sign-up-btn" 
                onClick={(e)=>props.addCostumer(e.target.value)}
                >
                    Sign in
                </Button>
            </Link>
        </Form>
    </div>
    );
};

export default CreatAccount;