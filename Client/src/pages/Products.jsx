import React, { useState } from "react";
import { Plus, Search, Edit2, Trash2, ChevronDown } from "lucide-react";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Laptop Gaming",
      category: "Electronics",
      price: 12500000,
      stock: 15,
      image: "https://via.placeholder.com/400x300?text=Laptop",
    },
    {
      id: 2,
      name: "Wireless Mouse",
      category: "Accessories",
      price: 250000,
      stock: 45,
      image: "https://via.placeholder.com/400x300?text=Mouse",
    },
    {
      id: 3,
      name: "USB-C Cable",
      category: "Accessories",
      price: 75000,
      stock: 120,
      image: "https://via.placeholder.com/400x300?text=Cable",
    },
    {
      id: 4,
      name: "Mechanical Keyboard",
      category: "Electronics",
      price: 1500000,
      stock: 8,
      image: "https://via.placeholder.com/400x300?text=Keyboard",
    },
    {
      id: 5,
      name: "Monitor 27 Inch",
      category: "Electronics",
      price: 3200000,
      stock: 12,
      image: "https://via.placeholder.com/400x300?text=Monitor",
    },
    {
      id: 6,
      name: "Webcam HD",
      category: "Accessories",
      price: 500000,
      stock: 32,
      image: "https://via.placeholder.com/400x300?text=Webcam",
    },
  ]);

  const categories = ["all", "Electronics", "Accessories"];
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="w-full overflow-hidden">
      {/* Header dengan Button Tambah */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Daftar Produk</h1>
          <p className="text-gray-600 mt-2">
            Total {filteredProducts.length} produk
          </p>
        </div>
        <button className="flex items-center gap-2 bg-linear-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-medium">
          <Plus size={20} />
          Tambah Produk
        </button>
      </div>

      {/* Search dan Filter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Search Box */}
        <div className="relative">
          <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Cari nama produk..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer bg-white transition-all"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "Semua Kategori" : cat}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-3 top-3.5 text-gray-400 pointer-events-none"
            size={20}
          />
        </div>
      </div>

      {/* Grid Produk */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-48 bg-gray-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <span className="bg-linear-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                  {product.name}
                </h3>

                {/* Price */}
                <p className="text-2xl font-bold text-transparent bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text mb-3">
                  {formatPrice(product.price)}
                </p>

                {/* Stock Info */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">Stock:</span>
                  <span
                    className={`font-bold ${
                      product.stock > 20
                        ? "text-green-600"
                        : product.stock > 5
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {product.stock} unit
                  </span>
                </div>

                {/* Stock Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      product.stock > 20
                        ? "bg-linear-to-r from-green-400 to-green-600"
                        : product.stock > 5
                        ? "bg-linear-to-r from-yellow-400 to-yellow-600"
                        : "bg-linear-to-r from-red-400 to-red-600"
                    }`}
                    style={{ width: `${Math.min(product.stock / 2, 100)}%` }}
                  ></div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 py-2.5 rounded-lg font-medium transition-all duration-200">
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 py-2.5 rounded-lg font-medium transition-all duration-200">
                    <Trash2 size={16} />
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Search className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Produk tidak ditemukan
          </h3>
          <p className="text-gray-500">
            Coba gunakan kata kunci atau kategori yang berbeda
          </p>
        </div>
      )}
    </div>
  );
};

export default Products;
