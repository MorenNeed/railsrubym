import React from "react";

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cartItems: []
    }
  }
  componentDidMount() {
    localStorage.setItem("cart", JSON.stringify(this.state.cartItems));
  }
  render() {
    const items = JSON.parse(localStorage.getItem("cart")) || [];

    // Loop through each item in the cart and add a table row
    const cartItems = Object.entries(items).map(([itemId, itemData]) => {
      const itemName = itemData.name;
      const itemPrice = itemData.price;
      const itemQuantity = itemData.quantity;
      const itemTotal = itemPrice * itemQuantity;

      return (
        <tr key={itemId}>
          <td className="item-name">{itemName}</td>
          <td className="item-price">{itemPrice} UAH</td>
          <td className="item-quantity">{itemQuantity}</td>
          <td className="item-total">{itemTotal} UAH</td>
          <td>
            <button
              className="remove-item-button"
              onClick={() => removeFromCart(itemId)}
            >
              Remove
            </button>
          </td>
        </tr>
      );
    });

    // Calculate the cart total
    const cartTotal = Object.values(items).reduce(
      (total, { price, quantity }) => {
        return total + price * quantity;
      },
      0
    );

    function removeFromCart(index) {
      const newCartItems = [...this.state.cartItems];
      newCartItems.splice(index, 1);
      this.setState({cartItems: newCartItems}, () => {
        localStorage.setItem("cart", JSON.stringify(this.state.cartItems));
      });
    }

    return (
      <div className={`cart-container ${this.props.isOpen ? " open" : ""}`}>
        <h1 className="cart-header">Cart</h1>
        <table className="cart-items-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{cartItems}</tbody>
          <tfoot>
            <tr>
              <td colSpan="3"></td>
              <td className="cart-total">${cartTotal}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
        <style jsx>
          {`
            .cart-container {
              z-index: 100;
              position: fixed;
              top: 64px;
              right: -400px; /* Start position off screen */
              width: 400px;
              height: 100%;
              color: black;
              background: linear-gradient(180deg, #ffffff 0%, #ededed 100%);
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
              transition: right 1s ease-in-out; /* Animate position change */
              font-family: "Roboto", sans-serif;
              display: flex;
              flex-direction: column;
            }

            .cart-container.open {
              right: 0; /* Slide in from the right */
            }

            .cart-header {
              text-align: end;
              padding-right: 30px;
            }

            thead th,
            tfoot td {
              background-color: #f6f6f6;
              font-weight: bold;
            }

            tbody tr:hover {
              background-color: #f2f2f2;
            }

            td {
              padding: 10px;
              border-radius: 5px;
            }

            button:hover {
              cursor: pointer;
            }

            button {
              margin-right: 5px;
            }
          `}
        </style>
      </div>
    );
  }
}

export default Cart;
