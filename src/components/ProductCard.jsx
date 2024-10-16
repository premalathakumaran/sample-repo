import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } from '../features/cartSlice';

const ProductCard = ({ product, cardWidth = "300px", cardHeight = "400px" }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);
  
  // Modal state for image preview
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Check if the product is already in the cart and get its quantity
  const cartItem = cartItems.find(item => item.id === product.id);
  const isInCart = !!cartItem;

  // Handlers for adding, increasing, and decreasing product quantity
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.id));
  };

  const handleIncreaseQuantity = () => {
    dispatch(increaseQuantity(product.id));
  };

  const handleDecreaseQuantity = () => {
    dispatch(decreaseQuantity(product.id));
  };

  // Modal handlers
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="border p-4 rounded-lg shadow-md" style={{ width: cardWidth, height: cardHeight }}>
      {/* Clickable responsive image */}
      <div className="overflow-hidden rounded-lg" style={{ height: '60%' }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover cursor-pointer"
          onClick={handleOpenModal}
          loading="lazy" // Optional: improves performance by lazy loading the image
        />
      </div>
      
      <h2 className="text-xl font-bold mt-2">{product.name}</h2>
      <p className="text-gray-700">${product.price.toFixed(2)}</p>

      {isInCart ? (
        <div className="mt-2">
          <div className="flex items-center">
            <button
              className="bg-gray-300 text-black px-2 py-1 rounded-l"
              onClick={handleDecreaseQuantity}
            >
              -
            </button>
            <span className="px-4">{cartItem.quantity}</span>
            <button
              className="bg-gray-300 text-black px-2 py-1 rounded-r"
              onClick={handleIncreaseQuantity}
            >
              +
            </button>
          </div>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mt-2"
            onClick={handleRemoveFromCart}
          >
            Remove from Cart
          </button>
        </div>
      ) : (
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mt-2"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      )}

      {/* Modal for viewing image in larger size */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-full max-h-full">
            <button
              className="absolute top-2 right-2 bg-gray-200 p-2 rounded-full text-gray-700"
              onClick={handleCloseModal}
            >
              ✖️
            </button>
            <div className="flex justify-center items-center" style={{ height: '80vh', width: '80vw' }}>
              <img
                src={product.image} // Ensure this image is of Full HD quality
                alt={product.name}
                className="object-contain w-full h-full" // Set to fill modal
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
