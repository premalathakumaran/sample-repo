import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from '../features/cartSlice';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between items-center border-b py-4">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover mr-4" />
                  <div>
                    <h3>{item.name}</h3>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {/* Decrease Quantity */}
                  <button 
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => dispatch(decreaseQuantity(item.id))}>
                    -
                  </button>
                  
                  {/* Increase Quantity */}
                  <button 
                    className="bg-green-500 text-white px-4 py-2 rounded ml-2"
                    onClick={() => dispatch(increaseQuantity(item.id))}>
                    +
                  </button>

                  {/* Remove from Cart */}
                  <button 
                    className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                    onClick={() => dispatch(removeFromCart(item.id))}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-4">Total Amount: ${totalAmount}</p>

          {/* Clear Cart Button */}
          <button 
            className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>

          {/* Proceed to Checkout */}
          <Link to="/checkout">
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 ml-4">
              Proceed to Checkout
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default CartPage;
