import React, {Component} from 'react';
import escapeRegExp from 'escape-string-regexp';
import {Row, Col, Form, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom'



class Container extends Component {

    state = {
        product: [],
        shopper: "",
        items: 0,
        queryName: "",
        queryStore: "",
        addName: "",
        addStore: "",
        sign: ""
    }

    componentDidMount(){
        this.setState(() => {
            return {shopper: this.props.clientName}
        })

      }

    countAdd = (count, i) => {
        this.state.product[i].counts += 1
        this.setState(this.state)

    }

    countSubtract = (count, i) => {
        if (count !== 0) {
            this.state.product[i].counts += -1
            this.setState(this.state)
        }
    }

    removeProduct = (name) => {
        this.setState({
            product: this .state.product.filter(p => p.name !== name)
        })

    }

    queryChangeItem = (word) => {
        this.setState(() => {
            return {queryName: escapeRegExp(word)}
        })

    }

    queryChangeStore = (word) => {
        this.setState(() => {
            return {queryStore: escapeRegExp(word)}
        })

    }

    onSubmit = async(e) => {

        e.preventDefault();
        console.log(this.props.clientName)

        const addedItem = this.state.queryName;
        const addedStore = this.state.queryStore;
        const addedSign = this.state.sign;
        const obj = {
            'name': addedItem,
            'counts': 0,
            'store': addedStore,
            'sign': addedSign
        };
        this.state.product.push(obj)

        await this.setState(() => {
            return {queryName: "", queryStore: ""}
        })
    }

    checkMark = (sign, i) => {

        if (sign === "") {
            this.state.product[i].sign = "\u2713"
            this.setState(this.state)
        } else {
            this.state.product[i].sign = ""
            this.setState(this.state)
        }

    }

    render() {
        
        return (
               
            <div className="app-container">

                <div className="header">

                    <div
                        className="shopper-name"
                     >laily's List</div>
                    <div
                        className="items"><span style={{color:"#AD3528",marginRight:"6%"}}>{this.state.product.length}</span>Items</div>
                </div>

                <Form className="menu" onSubmit={this.onSubmit}>
                    <div className="add-button">
                        <Button
                            id="add-item-btn-main"
                            aria-label="Add"
                            type="submit"
                            style={{
                            color: "#9D9C98"
                        }}>
                            +
                        </Button>
                    </div>

                    <div className="form">
                           
                                <Form.Control
                                className="form-input"
                                    type="text"
                                    placeholder="product"
                                    style={{marginRight:"4%"}}
                                    required="required"
                                    value={this.state.queryName}
                                    onChange={(e) => this.queryChangeItem(e.target.value)}/>
                      
                     
                                <Form.Control
                                className="form-input"
                                    type="text"
                                    placeholder="store"
                                    value={this.state.queryStore}
                                    onChange={(e) => this.queryChangeStore(e.target.value)}/>
                            
                    
                    </div>

                </Form>

                <div className="content">
                    {this
                        .state
                        .product.sort((a, b) => a.name.localeCompare(b.name))
                        .map((product, i) => {
                            return (

                                <div key={i} className="each-item">
                                    <div className="left-buttons">
                                        <Button
                                            aria-label="Close"
                                            className="x-button"
                                            id="close"
                                            onClick={(e) => this.removeProduct(this.state.product[i].name)}>X</Button>
                                        <Button
                                            id="check"
                                            aria-label="Checkmark"
                                            className="x-button"
                                            onClick={(e) => this.checkMark(this.state.product[i].sign, i)}>
                                            {this.state.product[i].sign}
                                        </Button>
                                    </div>

                                    <div
                                        className="item"
                                        >
                                        <span
                                        className="item-name"
                                           >{product.name}</span>
                                        <span
                                        className="item-from">from</span>
                                        <span
                                           className="item-store">
                                            {product.store}
                                        </span >
                                    </div>
                                    <div className="counter">
                                        <Button
                                            aria-label="Remove"
                                            className="button subtract"
                                            onClick={e => this.countSubtract(product.counts, i)}>
                                            -
                                            </Button>
                                        <div className="counts">{product.counts}</div>
                                        <Button
                                            aria-label="AddMore"
                                            className="button add"
                                            onClick={e => this.countAdd(product.counts, i)}>
                                            +
                                            </Button>
                                    </div>
                                    <div className="under-border"></div>

                                </div>
                            )
                        })}

                </div>

                <div className="footer"></div>
            </div>
        );
    }
}

export default Container;