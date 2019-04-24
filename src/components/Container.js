import React, {Component} from 'react';
import escapeRegExp from 'escape-string-regexp';
import {Form, Button} from 'react-bootstrap';
import {LinkContainer} from "react-router-bootstrap";
import Product from './Product'



class Container extends Component {

    state = {
        product: [],
        newItem: "",
        newStore: "",
        list: [],
        shopper: "",
        items: 0,
        queryName: "",
        queryStore: "",
        addName: "",
        addStore: "",
        sign: "",
        left1: "0",
        x: 0, 
        startX: 0,
        moved:0,
        transition: "left .3s",
        p:0
       
    }

    componentDidMount() {
        this.hydrateStateWithLocalStorage();
        window.addEventListener("beforeunload", this.saveStateToLocalStorage.bind(this));
    }
    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.saveStateToLocalStorage.bind(this));

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
        for (let key in this.state) {
            localStorage.setItem(key, JSON.stringify(this.state[key]));
        }
    }

    countAdd = (count, i) => {
        let product = Object.assign({},this.state.product)
        product[i].counts+=1
        this.setState(this.state)

    }

    countSubtract = (count, i) => {
        if (count !== 0) {
            let product = Object.assign({},this.state.product)
            product[i].counts+=-1
            this.setState(this.state)
        }
    }

    removeProduct = (name) => {
        const updatedProduct = this
            .state
            .product
            .filter(p => p.name !== name)
        this.setState({product: updatedProduct})
        localStorage.setItem("product", JSON.stringify(updatedProduct));

    }

    queryChangeItem = (key, word) => {
        this.setState(() => {
            return {queryName: escapeRegExp(word)}
        })
        localStorage.setItem(key, word);

    }

    queryChangeStore = (key, word) => {
        this.setState(() => {
            return {queryStore: escapeRegExp(word)}
        })
        localStorage.setItem(key, word);
    }

    onSubmit = async(e) => {
        e.preventDefault();

       
        const addedItem = this.state.queryName;
        const addedStore = this.state.queryStore;
        const addedSign = this.state.sign;
        const addedMoved=this.state.moved
        const addedTransition=this.state.transition
        const addedStartX=this.state.startX
        const addedP=this.state.p
        const addedX=this.state.x
        const addedLeft=this.state.left1

        let obj = {
            'name': addedItem,
            'counts': 0,
            'store': addedStore,
            'sign': addedSign,
            'moved':addedMoved,
            'transition':addedTransition,
            'startX':addedStartX,
            'p':addedP,
            'x':addedX,
            'left1':addedLeft
            
        };

        const product = [...this.state.product]
        product.push(obj)

        await this.setState(() => {
            return {product}
        })

        localStorage.setItem("product", JSON.stringify(product));
        localStorage.setItem("newItem", "");
        localStorage.setItem("newStore", "");

        await this.setState(() => {
            return {queryName: "", queryStore: ""}
        })

    }

    checkMark = (sign, i) => {
        if (sign === "") {
            let product = Object.assign({},this.state.product)
            product[i].sign = "\u2713"
            this.setState(this.state)
        } else {
            let product = Object.assign({},this.state.product)
            product[i].sign = ""
            this.setState(this.state)
        }

    }



    startswipe1 = (e,i) => {
        if(this.state.product[i].moved===0){
            let product = Object.assign({},this.state.product)
            product[i].moved=1
            product[i].startX=e.clientX
            this.setState(this.state)
        }
      
      };

    moveswipe1 = (e,i)=> {
        
        if (this.state.product[i].moved===1) {
            let product = Object.assign({},this.state.product)
         
            product[i].p=e.clientX-product[i].startX
            if(product[i].p<0){
                product[i].left1="-8"
                this.setState(this.state) 
                 
            }else if(product[i].p>0){
              product[i].left1="0"
        this.setState(this.state) 
            }
           
            window.setTimeout(() => this.stopswipe1(e,i), 3000);     
    }   
    }

    stopswipe1 = (e,i) => {
        if(this.state.product.length>0){
            let product = Object.assign({},this.state.product)
            product[i].left1="0"
             this.setState(this.state)  
        }
       
      };
   
    stopMove1 = (e,i) => {
        let product = Object.assign({},this.state.product)
       product[i].moved=0
       product[i].p=0
       product[i].x=0
        product[i].startX=0
        this.setState(this.state)  
  };



    render() {

        return (

            <div className="app-container">

                <div  className="header" >

                    <div className="shopper-name">2shop</div>
                    <div className="items">
                        <span
                            style={{
                            color: "#005DA5",
                            marginRight: ".4vw",
                            
                        }}>{this.state.product.length}</span>Items</div>
                </div>

                <Form className="menu" onSubmit={this.onSubmit}>
                    
                        <Button
                            id="add-item-btn-main"
                            aria-label="Add"
                            type="submit"
                          >
&#43;                        </Button>
 

                    

                        <Form.Control
                            className="form-input"
                            type="text"
                            placeholder="Product"
                       
                            required="required"
                            value={this.state.queryName}
                            onChange={(e) => this.queryChangeItem("newItem", e.target.value)}/>

                        <Form.Control
                            className="form-input"
                            type="text"
                            placeholder="Store"
                            value={this.state.queryStore}
                            onChange={(e) => this.queryChangeStore("newStore", e.target.value)}/>

  

                </Form>

                <Product
                    product={this.state.product}
                    removeProduct={this.removeProduct}
                    checkMark={this.checkMark}
                    countSubtract={this.countSubtract}
                    countAdd={this.countAdd}
                    all={this.state.all}
                    startswipe1= {this.startswipe1}
                    moveswipe1= {this.moveswipe1}
                    stopMove1= {this.stopMove1}
                   />


                <div className="footer">
                <LinkContainer
                 style={{
                    textDecoration: "none"
                }}
                to="/">
                <Button className="signout" onClick={this.props.handlesignOut}>
                <div >Sign Out</div>
                </Button>
                </LinkContainer>
                </div>
            </div>
        );
    }
}

export default Container;

 