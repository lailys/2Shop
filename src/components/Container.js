import React, { Component } from "react";
import escapeRegExp from "escape-string-regexp";
import { Form, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Product from "./Product";

class Container extends Component {
  state = {
    product: [],
    newItem: "",
    newStore: "",
    list: [],
    items: 0,
    queryName: "",
    queryStore: "",
    addName: "",
    addStore: "",
    sign: "",
    left1: "2vw",
    hide: "none",
    textDecoration: "none"
  };

  componentDidMount() {
    this.hydrateStateWithLocalStorage();
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }
  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

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
    for (let key in this.state) {
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }


  queryChangeItem = (key, word) => {
    this.setState(() => {
      return { queryName: escapeRegExp(word) };
    });
    localStorage.setItem(key, word);
  };

  queryChangeStore = (key, word) => {
    this.setState(() => {
      return { queryStore: escapeRegExp(word) };
    });
    localStorage.setItem(key, word);
  };

  onSubmit = async e => {
    e.preventDefault();

    const addedItem = this.state.queryName;
    const addedStore = this.state.queryStore;
    const addedSign = this.state.sign;
    const addedMoved = this.state.moved;
    const addedTransition = this.state.transition;
    const addedStartX = this.state.startX;
    const addedP = this.state.p;
    const addedX = this.state.x;
    const addedLeft = this.state.left1;
    const textD = this.state.textDecoration;
    const Display=this.state.hide

    let obj = {
      name: addedItem,
      counts: 0,
      store: addedStore,
      sign: addedSign,
      moved: addedMoved,
      transition: addedTransition,
      startX: addedStartX,
      p: addedP,
      x: addedX,
      left1: addedLeft,
      text: textD,
     hide:Display,
    };
    console.log(textD);
    const product = [...this.state.product];
    product.push(obj);

    await this.setState(() => {
      return { product };
    });

    localStorage.setItem("product", JSON.stringify(product));
    localStorage.setItem("newItem", "");
    localStorage.setItem("newStore", "");

    await this.setState(() => {
      return { queryName: "", queryStore: "" };
    });
  };
  removeProduct = item => {
    console.log(item);
    const updatedProduct = this.state.product.filter(p => p.name !== item);
    this.setState({ product: updatedProduct });
    localStorage.setItem("product", JSON.stringify(updatedProduct));
  };

  done = (e, i) => {
    console.log(this.state.product[i].text);
    let product = Object.assign({}, this.state.product);
    if (product[i].text === "none") {
      product[i].text = "line-through";
      product[i].hide=""

    } else {
      product[i].text = "none";
      product[i].hide="none"
    }





    this.setState(this.state);
  };
  lined = (e, i) => {
    this.done(e, i);
  };

  render() {
    return (
      <div className="app-container">
        <div className="header">
          <div className="shopper-name"><span style={{color:"#E85E00"}}>2</span>SHOP</div>
        </div>

        <Form className="menu" onSubmit={this.onSubmit}>
          <Form.Control
            className="form-input"
            type="text"
            placeholder="Product"
            required="required"
            value={this.state.queryName}
            onChange={e => this.queryChangeItem("newItem", e.target.value)}
          />

          <Form.Control
            className="form-input"
            type="text"
            placeholder="Category"
            value={this.state.queryStore}
            onChange={e => this.queryChangeStore("newStore", e.target.value)}
          />
          <Button id="add-item-btn-main" className="fa fa-plus" aria-label="Add" type="submit">
           
          </Button>
        </Form>

        <Product
          product={this.state.product}
          removeProduct={this.removeProduct}
          checkMark={this.checkMark}
          countSubtract={this.countSubtract}
          countAdd={this.countAdd}
          all={this.state.all}
          startswipe1={this.startswipe1}
          moveswipe1={this.moveswipe1}
          stopMove1={this.stopMove1}
          lined={this.lined}

        />

        <div className="footer">
          <LinkContainer
            style={{
              textDecoration: "none"
            }}
            to="/"
          >
            <Button className="signout" onClick={this.props.handlesignOut}>
              <div>Sign Out</div>
            </Button>
          </LinkContainer>
        </div>
      </div>
    );
  }
}

export default Container;
