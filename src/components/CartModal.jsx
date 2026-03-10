import { Trash2, Minus, Plus, X } from "lucide-react";

export default function CartModal({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemove,
  onCheckout,
}) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl flex flex-col max-h-[92vh] animate-fadeIn">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b bg-gradient-to-r from-blue-600 to-blue-500 rounded-t-3xl">
          <h2 className="text-lg font-semibold text-white">🛒 Your Cart</h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {cartItems.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 text-base">Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border hover:shadow-lg transition-transform hover:-translate-y-1"
              >
                {/* Medicine Info */}
                <div>
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.details}</p>
                  <p className="text-green-600 font-medium mt-1">₹ {item.price}</p>
                </div>

                {/* Quantity & Remove */}
                <div className="flex flex-col items-end space-y-2">
                  <div className="flex items-center bg-gray-100 rounded-full px-2 shadow-inner">
                    <button
                      onClick={() => onUpdateQty(item, item.qty - 1)}
                      disabled={item.qty <= 1}
                      className="p-1 text-gray-600 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 font-semibold">{item.qty}</span>
                    <button
                      onClick={() => onUpdateQty(item, item.qty + 1)}
                      className="p-1 text-gray-600 hover:text-blue-600"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => onRemove(item)}
                    className="text-red-500 hover:text-red-600 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t bg-white p-6 rounded-b-3xl shadow-inner">
          <div className="flex justify-between items-center mb-5">
            <span className="text-gray-600 font-medium">Subtotal</span>
            <span className="text-xl font-bold text-gray-900">₹ {subtotal.toFixed(2)}</span>
          </div>
          <button
            onClick={onCheckout}
            disabled={cartItems.length === 0}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3.5 rounded-xl font-semibold shadow-lg hover:from-blue-700 hover:to-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
