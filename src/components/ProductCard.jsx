// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } from '../features/cartSlice';

// const ProductCard = ({ product, cardWidth = "300px", cardHeight = "400px" }) => {
//   const dispatch = useDispatch();
//   const cartItems = useSelector(state => state.cart.cartItems);
  
//   // Modal state for image preview
//   const [isModalOpen, setIsModalOpen] = useState(false);
  
//   // Check if the product is already in the cart and get its quantity
//   const cartItem = cartItems.find(item => item.id === product.id);
//   const isInCart = !!cartItem;

//   // Handlers for adding, increasing, and decreasing product quantity
//   const handleAddToCart = () => {
//     dispatch(addToCart(product));
//   };

//   const handleRemoveFromCart = () => {
//     dispatch(removeFromCart(product.id));
//   };

//   const handleIncreaseQuantity = () => {
//     dispatch(increaseQuantity(product.id));
//   };

//   const handleDecreaseQuantity = () => {
//     dispatch(decreaseQuantity(product.id));
//   };

//   // Modal handlers
//   const handleOpenModal = () => setIsModalOpen(true);
//   const handleCloseModal = () => setIsModalOpen(false);

//   return (
//     <div className="border p-4 rounded-lg shadow-md" style={{ width: cardWidth, height: cardHeight }}>
//       {/* Clickable responsive image */}
//       <div className="overflow-hidden rounded-lg" style={{ height: '60%' }}>
//         <img
//           src={product.image}
//           alt={product.name}
//           className="w-full h-full object-cover cursor-pointer"
//           onClick={handleOpenModal}
//           loading="lazy" // Optional: improves performance by lazy loading the image
//         />
//       </div>
      
//       <h2 className="text-xl font-bold mt-2">{product.name}</h2>
//       <p className="text-gray-700">${product.price.toFixed(2)}</p>

//       {isInCart ? (
//         <div className="mt-2">
//           <div className="flex items-center">
//             <button
//               className="bg-gray-300 text-black px-2 py-1 rounded-l"
//               onClick={handleDecreaseQuantity}
//             >
//               -
//             </button>
//             <span className="px-4">{cartItem.quantity}</span>
//             <button
//               className="bg-gray-300 text-black px-2 py-1 rounded-r"
//               onClick={handleIncreaseQuantity}
//             >
//               +
//             </button>
//           </div>
//           <button
//             className="bg-red-500 text-white px-4 py-2 rounded mt-2"
//             onClick={handleRemoveFromCart}
//           >
//             Remove from Cart
//           </button>
//         </div>
//       ) : (
//         <button
//           className="bg-green-500 text-white px-4 py-2 rounded mt-2"
//           onClick={handleAddToCart}
//         >
//           Add to Cart
//         </button>
//       )}

//       {/* Modal for viewing image in larger size */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
//           <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-full max-h-full">
//             <button
//               className="absolute top-2 right-2 bg-gray-200 p-2 rounded-full text-gray-700"
//               onClick={handleCloseModal}
//             >
//               ✖️
//             </button>
//             <div className="flex justify-center items-center" style={{ height: '80vh', width: '80vw' }}>
//               <img
//                 src={product.image} // Ensure this image is of Full HD quality
//                 alt={product.name}
//                 className="object-contain w-full h-full" // Set to fill modal
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductCard;




import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } from '../features/cartSlice';

const ProductCard = ({ product, cardWidth = "300px", cardHeight = "400px" }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);
  const [imageError, setImageError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const cartItem = cartItems.find(item => item.id === product.id);
  const isInCart = !!cartItem;

  const getImageUrl = () => {
    if (product.image.startsWith('http')) {
      return product.image;
    }
    const publicUrl = process.env.PUBLIC_URL || '';
    return `${publicUrl}${product.image}`;
  };

  const handleImageError = () => {
    setImageError(true);
    console.error(`Failed to load image for product: ${product.name}`);
  };

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

  return (
    <>
      <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300" 
           style={{ width: cardWidth, height: cardHeight }}>
        {/* Image Container */}
        <div className="overflow-hidden rounded-lg" style={{ height: '60%' }}>
          {!imageError ? (
            <img
              src={getImageUrl()}
              alt={product.name}
              className="w-full h-full object-cover cursor-pointer transform hover:scale-105 transition-transform duration-300"
              onClick={() => setIsModalOpen(true)}
              onError={handleImageError}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-500">Image not available</span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="mt-4">
          <h2 className="text-xl font-bold text-gray-800 truncate">{product.name}</h2>
          <p className="text-lg font-semibold text-gray-700 mt-1">
            ${product.price.toFixed(2)}
          </p>
          
          {/* Stock Status */}
          <p className="text-sm text-gray-600 mt-1">
            In Stock: {product.qty}
          </p>

          {/* Cart Controls */}
          <div className="mt-4">
            {isInCart ? (
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <button
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-l transition-colors duration-200"
                    onClick={handleDecreaseQuantity}
                  >
                    -
                  </button>
                  <span className="px-4 py-1 bg-gray-100">
                    {cartItem.quantity}
                  </span>
                  <button
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-r transition-colors duration-200"
                    onClick={handleIncreaseQuantity}
                  >
                    +
                  </button>
                </div>
                <button
                  className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors duration-200"
                  onClick={handleRemoveFromCart}
                >
                  Remove from Cart
                </button>
              </div>
            ) : (
              <button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-200"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 transition-opacity"
             onClick={() => setIsModalOpen(false)}>
          <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-4xl max-h-[90vh] overflow-hidden"
               onClick={e => e.stopPropagation()}>
            <button
              className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 rounded-full p-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              onClick={() => setIsModalOpen(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="mt-8 flex justify-center items-center">
              {!imageError ? (
                <img
                  src={getImageUrl()}
                  alt={product.name}
                  className="max-w-full max-h-[70vh] object-contain"
                  onError={handleImageError}
                />
              ) : (
                <div className="w-full h-64 flex items-center justify-center bg-gray-200">
                  <span className="text-gray-500">Image not available</span>
                </div>
              )}
            </div>
            
            <div className="mt-4 text-center">
              <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
              <p className="text-lg font-semibold text-gray-700 mt-1">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;