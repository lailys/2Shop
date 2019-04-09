import React from 'react';
import escapeRegExp from 'escape-string-regexp';
import {Form, Button} from 'react-bootstrap';

const Product = (props) => {
    return (
        <div className="content">
            {props
                .product
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((product, i) => {
                    return (

                        <div key={i} className="each-item">
                            <div className="left-buttons">
                                <Button
                                    aria-label="Close"
                                    id="close"
                                    onClick={(e) => props.removeProduct(product.name)}>X</Button>
                                <Button
                                    id="check"
                                    aria-label="Checkmark"
                                    onClick={(e) => props.checkMark(product.sign, i)}>
                                    {product.sign}
                                </Button>
                            </div>

                            <div className="item">
                                <span className="item-name">{product.name}</span>
                                <span className="item-from">from</span>
                                <span className="item-store">
                                    {product.store}
                                </span >
                            </div>
                            <div className="counter">
                                <Button
                                    aria-label="Remove"
                                    className="button subtract"
                                    onClick={e => props.countSubtract(product.counts, i)}>
                                    -
                                </Button>
                                <div className="counts">{product.counts}</div>
                                <Button
                                    aria-label="AddMore"
                                    className="button add"
                                    onClick={e => props.countAdd(product.counts, i)}>
                                    +
                                </Button>
                            </div>
                            <div className="under-border"></div>

                        </div>
                    )
                })}
        </div>
    );
};

export default Product;