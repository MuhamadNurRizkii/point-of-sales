import React, { useState, useEffect } from "react";
import { getProductsAPI } from "../api/products";
import DetailTransactionCard from "../components/DetailTransactionCard";

const CreateTransaction = () => {
  const [products, setProducts] = useState([]);
  const [transactionItems, setTransactionItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [sendData, setSendData] = useState([]);
  const [show, setShow] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProductsAPI(1, 100);
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setProducts(data.paging.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = (product) => {
    const existingItem = transactionItems.find(
      (item) => item.id === product.id
    );

    if (existingItem) {
      setTransactionItems(
        transactionItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: product.price * (item.quantity + 1),
              }
            : item
        )
      );
    } else {
      setTransactionItems([
        ...transactionItems,
        { ...product, quantity: 1, subtotal: product.price },
      ]);
    }
  };

  const handleRemoveProduct = (productId) => {
    setTransactionItems(
      transactionItems.filter((item) => item.id !== productId)
    );
  };

  const handleQuantityChange = (productId, quantity) => {
    if (quantity <= 0) {
      handleRemoveProduct(productId);
      return;
    }

    setTransactionItems(
      transactionItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: quantity,
              subtotal: item.price * quantity,
            }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return transactionItems.reduce((sum, item) => sum + item.subtotal, 0);
  };

  const handleClickPayment = (items) => {
    const data = items.map(({ id, quantity }) => ({ id, qty: quantity }));

    setSendData(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(transactionItems);

  return (
    <div className="flex relative gap-5 h-screen p-5 bg-gray-100">
      {/* Left Side - Products */}
      <div className="flex-1 overflow-y-auto bg-white p-5 rounded-lg shadow-sm">
        <h2 className="mt-0 mb-5 text-gray-800 font-bold text-lg">
          Daftar Produk
        </h2>
        {loading ? (
          <div className="text-center py-10">
            <p className="text-gray-600">Loading produk...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600">Tidak ada produk tersedia</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4 xl:gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => handleAddProduct(product)}
                onMouseEnter={() => setHoveredProductId(product.id)}
                onMouseLeave={() => setHoveredProductId(null)}
                className={`overflow-hidden border border-gray-300 rounded-lg cursor-pointer transition-all duration-200 text-center ${
                  hoveredProductId === product.id
                    ? "bg-blue-50 shadow-md -translate-y-0.5"
                    : "bg-gray-50 hover:bg-blue-50"
                }`}
              >
                {/* Product Image */}
                <div className="w-full h-32 bg-gray-200 overflow-hidden flex items-center justify-center">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <svg
                        className="w-12 h-12"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-3">
                  <h4 className="m-0 mb-2 text-gray-800 text-sm font-semibold line-clamp-2">
                    {product.name}
                  </h4>
                  <p className="my-1 text-gray-600 text-xs">
                    Stok: {product.stock}
                  </p>
                  <p className="m-0 text-blue-500 font-bold text-base">
                    Rp {product.price?.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Right Side - Transaction List */}
      <div className="flex-1 overflow-y-auto bg-white p-5 rounded-lg shadow-sm flex flex-col">
        <h2 className="mt-0 mb-5 text-gray-800 font-bold text-lg">
          Transaksi ({transactionItems.length})
        </h2>

        <div className="flex-1 overflow-y-auto mb-5">
          {transactionItems.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <p>Tidak ada item transaksi</p>
              <p className="text-xs">
                Klik produk di sebelah kiri untuk menambahkan
              </p>
            </div>
          ) : (
            <div>
              {transactionItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border-b border-gray-200 mb-3 rounded bg-gray-50"
                >
                  <div className="flex justify-between items-start mb-3 gap-3">
                    {/* Product Image */}
                    <div className="w-16 h-16 bg-gray-200 rounded shrink-0 overflow-hidden flex items-center justify-center">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <svg
                          className="w-8 h-8 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h4 className="m-0 mb-1 text-gray-800 font-semibold text-sm">
                        {item.name}
                      </h4>
                      <p className="m-0 text-gray-600 text-xs">
                        Rp {item.price?.toLocaleString("id-ID")} / item
                      </p>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleRemoveProduct(item.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-colors shrink-0"
                    >
                      Hapus
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <label className="text-xs text-gray-600">Qty:</label>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      className="px-2 py-1 border border-gray-300 bg-white rounded hover:bg-gray-100 transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.id,
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="w-12 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                      min="1"
                    />
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className="px-2 py-1 border border-gray-300 bg-white rounded hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex justify-between items-center p-2 bg-white rounded">
                    <span className="text-gray-600 text-xs">Subtotal:</span>
                    <span className="font-bold text-blue-500 text-base">
                      Rp {item.subtotal?.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Total Section */}
        <div className="border-t-2 border-blue-500 pt-4 mt-auto">
          <div className="flex justify-between items-center mb-5 p-4 bg-blue-50 rounded-lg">
            <span className="text-lg font-bold text-gray-800">Total:</span>
            <span className="text-2xl font-bold text-blue-500">
              Rp {calculateTotal().toLocaleString("id-ID")}
            </span>
          </div>

          <button
            className={`w-full py-3 rounded-lg text-base font-bold transition-all ${
              transactionItems.length === 0
                ? "bg-green-400 text-white cursor-not-allowed opacity-50"
                : "bg-green-500 text-white hover:bg-green-600 cursor-pointer"
            }`}
            disabled={transactionItems.length === 0}
            onClick={() => {
              handleClickPayment(transactionItems);
              setShow(!show);
              // alert("Transaksi berhasil ditambahkan!");
              // setTransactionItems([]);
            }}
          >
            Selesaikan Transaksi
          </button>
        </div>
      </div>
      <DetailTransactionCard
        show={show}
        setShow={setShow}
        totalPrice={calculateTotal()}
        data={sendData}
      />
    </div>
  );
};

export default CreateTransaction;
