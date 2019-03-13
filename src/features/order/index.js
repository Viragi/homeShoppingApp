import React from 'react';
import fetchApi from '../../modules/fetch-api';
class Order extends React.Component {
  state = {
    order: null
  };

  componentDidMount() {
    fetchApi('get', `http://localhost:3000/order/${this.props.id}`).then(
      json => {
        console.log(json);
        this.setState({
          order: json
        });
      }
    );
  }

  renderOrder() {
    const { name, email, order_items } = this.state.order;
    return (
      <div>
        <h3>Order Summary</h3>
        <div>Name:{name}</div>
        <div>Email:{email}</div>
        <h4>Items</h4>
        <ul>
          {order_items &&
            order_items.map(item => {
              const {
                qty,
                product: { name, image, price }
              } = item;
              return (
                <li>
                  <img src={image} width={32} />
                  {name}({qty} @ ${price} = $
                  {parseFloat(qty) * parseFloat(price)}
                </li>
              );
            })}
        </ul>
      </div>
    );
  }

  render() {
    const { order } = this.state;
    return <div>{order ? this.renderOrder() : 'loading...'}</div>;
  }
}

export default Order;
