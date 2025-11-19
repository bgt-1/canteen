import { useCart } from "../context/CartContext.jsx";
import API from "../api/apiClient.js";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  const placeOrder = async () => {
    const res = await API.post("/orders", { items: cart });
    alert("Order placed successfully!");
    clearCart();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="p-4 border-b flex justify-between">
              <span>{item.name} (x{item.qty})</span>
              <span>₹{item.price * item.qty}</span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            onClick={placeOrder}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
}
