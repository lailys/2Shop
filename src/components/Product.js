import React from 'react'
import {Button} from 'react-bootstrap';

function Product(props) {

   
    
    return (
        <div className="content">
            {props
                .product
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((product, i) => {
                    return (

                        <div key={i} className="each-item"
                        style={{
                           top:String(i*7.68)+"vh",
                           left:product.left1+"vw",
                           transition: "left .7s",
                         }} 
                         onMouseDown={e => props.startswipe1(e,i)}
                         onMouseMove={e => props.moveswipe1(e,i)}
                         onMouseUp={e => props.stopMove1(e,i)}
                         onTouchStart={e => props.startswipe1(e,i)}
                         onTouchMove={e => props.moveswipe1(e,i)}
                         onTouchEnd={e => props.stopMove1(e,i)}
                      
                         >
                           <div className="swipe1"
                             >
                      
                           
                           
                           <div className="left-buttons">
                                <Button
                                    id="check"
                                    aria-label="Checkmark"
                                    onClick={(e) => props.checkMark(product.sign, i)}>
                                    {product.sign}
                                </Button>
                            </div>
                            <div className="item"
                           
                            >
                            
                                <span className="item-name">{product.name}</span>
                                <span className="item-from">from</span>
                                <span className="item-store">
                                    {product.store}
                                </span >
                                </div>
                                <div className="counter"
                                >
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

                            </div>
                            <div className="swipe2"
                                   
                              >
     <Button
                                    aria-label="Close"
                                    id="close"
                                    onClick={(e) => props.removeProduct(product.name)}>X</Button>
                            </div>
                        </div>
                    )
                })}
        </div>
    );
};

export default Product;