import { Box, Button } from "@mui/material";
import axios from "axios";
import React from "react";

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
    this.removeFromCart = this.removeFromCart.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  removeFromCart(index) {
    const { items } = this.state;

    if (items.length === 1) {
      localStorage.removeItem("cart");
      this.setState({ items: [] });
    } else {
      const newItems = [...items.slice(0, index), ...items.slice(index + 1)];
      localStorage.setItem("cart", JSON.stringify(newItems));
      this.setState({ items: newItems });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const order_descriptions_attributes = [];
    var count = 0;

    this.state.items.forEach((item) => {
      const existingItem = order_descriptions_attributes.find(
        (orderDescription) => orderDescription.item_id === item.id
      );

      if (existingItem) {
        const quantity =
          parseInt(existingItem.quantity, 10) + parseInt(item.quantity, 10);
        existingItem.quantity = quantity;
      } else {
        order_descriptions_attributes.push({
          item_id: item.id,
          quantity: parseInt(item.quantity, 10),
        });
        count++;
      }
    });

    const csrfToken = document.querySelector('[name="csrf-token"]').content;

    axios.post(
      "/orders",
      {
        order: {
          amount: count,
          order_descriptions_attributes: order_descriptions_attributes,
        },
      },
      {
        headers: {
          "X-CSRF-Token": csrfToken,
        },
      }
    );

    const newItems = [];
    localStorage.setItem("cart", JSON.stringify(newItems));
    this.setState({ items: newItems });
  }

  componentDidMount() {
    const cartItems = localStorage.getItem("cart");
    if (cartItems) {
      this.setState({ items: JSON.parse(cartItems) });
    } else {
      this.setState({ items: [] });
    }
  }

  render() {
    // Loop through each item in the cart and add a table row
    const cartItems = Object.entries(this.state.items).map(
      ([itemId, itemData]) => {
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
              <Button
                className="remove-item-button"
                onClick={() => this.removeFromCart(itemId)}
              >
                Remove
              </Button>
            </td>
          </tr>
        );
      }
    );

    // Calculate the cart total
    const cartTotal = Object.values(this.state.items).reduce(
      (total, { price, quantity }) => {
        return total + price * quantity;
      },
      0
    );

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
              <td className="cart-total">{cartTotal} UAH</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"flex-end"}
          padding={10}
        >
          <Button
            variant="contained"
            type="submit"
            size="large"
            fullWidth
            onClick={this.handleSubmit}
          >
            Buy
          </Button>
        </Box>
        <style jsx="true">
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
