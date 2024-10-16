import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <nav className="p-4 bg-gray-800 text-white">
      <ul className="flex justify-between">
        <li><h1 className="text-3xl font-bold mb-4"><Link to="/">Shopping Cart App</Link></h1></li>
        <li><h1 className="text-3xl font-bold mb-4"><Link to="/cart">Cart ({cartItems.length})</Link></h1></li>
      </ul>
    </nav>
  );
};

export default Navbar;