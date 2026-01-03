import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Upload,
  X,
  Package,
  DollarSign,
  Box,
  Tag,
  Image as ImageIcon,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import {
  createProductAPI,
  editProductByIdAPI,
  getProductById,
} from "../api/products";
import { useNavigate, useParams } from "react-router";
import { getToken } from "../utils/token";

const EditProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("makanan");
  const [image, setImage] = useState(null);
  const token = getToken();

  const params = useParams();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  console.log(image);

  const categories = [
    { value: "makanan", label: "Makanan" },
    { value: "minuman", label: "Minuman" },
    { value: "lain-lain", label: "Lain-lain" },
  ];
  // fetch product
  const fetchProduct = async () => {
    const response = await getProductById(params.id, token);
    const { success, message, data } = await response.json();

    if (success) {
      setName(data[0].name);
      setPrice(data[0].price);
      setStock(data[0].stock);
      setCategory(data[0].category);
      setImage(data[0].image_url);
      setPreview(data[0].image_url);
    } else {
      toast.error(message);
    }
  };

  //   handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          gambar: "File harus berupa gambar (JPG, PNG, etc)",
        }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          gambar: "Ukuran file maksimal 5MB",
        }));
        return;
      }

      setImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      if (errors.gambar) {
        setErrors((prev) => ({
          ...prev,
          gambar: "",
        }));
      }
    }
  };

  //   handle remove Image
  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  //   handle Sumbit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("category", category);
    formData.append("image", image);

    setIsLoading(true);
    // Simulate API call

    const response = await editProductByIdAPI(formData, params.id, token);
    const responseBody = await response.json();

    if (responseBody.success) {
      toast.success(responseBody.message);
      setIsLoading(false);
      setName("");
      setPrice(0);
      setStock(0);
      setCategory("");
      setImage(null);
    } else {
      toast.error(responseBody.message);
      setIsLoading(false);
    }
  };

  //   render fetch
  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="w-full min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Tambah Produk Baru
          </h1>
          <p className="text-gray-600 mt-2">
            Isi formulir di bawah untuk menambahkan produk baru ke katalog Anda
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nama Produk */}
            <div className="md:col-span-2">
              <label
                htmlFor="nama"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Nama Produk
              </label>
              <div className="relative">
                <Package
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Contoh: Nasi Goreng Spesial"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-200`}
                />
              </div>
            </div>

            {/* Harga */}
            <div>
              <label
                htmlFor="harga"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Harga (Rp)
              </label>
              <div className="relative">
                <DollarSign
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={20}
                />
                <input
                  type="number"
                  id="harga"
                  name="harga"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="25000"
                  required
                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-200`}
                />
              </div>
            </div>

            {/* Stok */}
            <div>
              <label
                htmlFor="stok"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Stok (Unit)
              </label>
              <div className="relative">
                <Box
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={20}
                />
                <input
                  type="number"
                  id="stok"
                  name="stok"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="10"
                  required
                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent `}
                />
              </div>
            </div>

            {/* Kategori */}
            <div>
              <label
                htmlFor="kategori"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Kategori
              </label>
              <div className="relative">
                <Tag
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={20}
                />
                <select
                  id="kategori"
                  name="kategori"
                  value={category}
                  required
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer transition-all"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3 top-3.5 text-gray-400 pointer-events-none"
                  size={20}
                />
              </div>
            </div>

            {/* Upload Gambar */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Gambar Produk
              </label>

              {!preview ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="gambar"
                    required
                  />
                  <label htmlFor="gambar" className="cursor-pointer block">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors mb-3">
                      <Upload className="text-blue-500" size={24} />
                    </div>
                    <p className="text-sm font-semibold text-gray-700">
                      Klik gambar di sini
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Format: JPG, PNG (Maks 5MB)
                    </p>
                  </label>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}
              {errors.gambar && (
                <p className="text-red-500 text-xs mt-1.5">{errors.gambar}</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={() => navigate("/dashboard/products")}
              className="flex-1 px-6 py-3 rounded-lg border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-linear-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Mengedit..." : "Edit Produk"}
              {!isLoading && <ArrowRight size={20} />}
            </button>
          </div>
        </form>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-700">
            <strong>Tip:</strong> Pastikan gambar produk berkualitas tinggi dan
            ukuran file tidak lebih dari 5MB untuk hasil terbaik.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
