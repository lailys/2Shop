import React from "react";

function Product(props) {
  return (
    <div className="content">
      {props.product
        .sort((a, b) => a.store.localeCompare(b.store))
        .map((product, i) => {
          return (
            <div
              key={i}
              className="each-item"
              style={{
                top: String(i * 7.3) + "vh",
                transition: "left 2s "
              }}
            >
           
                <div
                  className="item-name"
                  onClick={e => props.lined(e, i)}
                  style={{
                    textDecoration: product.text
                  }}
                >
                  {product.name}
                </div>

                <div className="category">{product.store}</div>
        

              <div
                id="delete"
                className="fa fa-close"
                aria-label="Close"
                style={{ display: product.hide }}
                onClick={e => props.removeProduct(product.name)}
              />
            </div>
          );
        })}
    </div>
  );
}

export default Product;
