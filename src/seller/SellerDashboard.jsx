
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function SellerDashboard() {
  const [products, setProducts] = useState([]);
  const [sellerPlan, setSellerPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSellerPlan();
    fetchProducts();
  }, []);

  const fetchSellerPlan = async () => {
    try {
      const response = await api.get('/seller/profile');
      setSellerPlan(response.data);
    } catch (error) {
      console.error('Error fetching seller plan:', error.response?.data || error.message);
      setError('Failed to fetch seller plan. Please try again.');
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get('/seller/products');
      console.log('Fetched products:', response.data);
      setProducts(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching products:', error.response?.data || error.message);
      setError('Failed to fetch products. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    console.log('handleFileChange triggered');
    const file = e.target.files[0];
    if (!file) {
      console.error('No file selected');
      setError('Please select an image.');
      return;
    }
    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      console.error('Invalid file type:', file.type);
      setError('Please upload a valid image (JPEG, JPG, or PNG).');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      console.error('File too large:', file.size);
      setError('Image size must be less than 2MB.');
      return;
    }

    // Verify file integrity
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      console.log('Valid image selected:', file.name, 'Size:', file.size, 'Type:', file.type);
      setFormData((prev) => ({ ...prev, image: file }));
      setError(null);
    };
    img.onerror = () => {
      console.error('Invalid or corrupted image:', file.name);
      setError('The selected image is invalid or corrupted. Please choose another.');
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    setError(null);

    if (!editingId && products.length >= 5) {
      setError('You have reached the maximum limit of 5 products for your plan.');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('stock', formData.stock);
    if (formData.image) {
      data.append('image', formData.image);
    }
    if (editingId) {
      data.append('_method', 'PUT');
    }

    try {
      if (editingId) {
        await api.post(`/seller/products/${editingId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await api.post('/seller/products', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      fetchProducts();
      setFormData({ name: '', description: '', price: '', stock: '', image: null });
      setEditingId(null);
    } catch (error) {
      console.error('Error saving product:', error.response?.data || error.message);
      if (error.response?.status === 422 && error.response.data.errors) {
        setError(Object.values(error.response.data.errors).flat().join(' '));
      } else {
        setError(error.response?.data.message || 'Failed to save product. Please try again.');
      }
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      image: null,
    });
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }
    try {
      await api.delete(`/seller/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error.response?.data || error.message);
      setError(error.response?.data.message || 'Failed to delete product. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await api.post('/seller/logout');
      localStorage.removeItem('seller_token');
      navigate('/seller/login');
    } catch (error) {
      console.error('Error logging out:', error.response?.data || error.message);
      setError('Failed to log out. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Seller Dashboard</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </div>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {sellerPlan && (
          <p className="text-gray-600 mb-4">
            Your Plan: {sellerPlan.plan_type === 'basic' ? '5 Products, 3 Minutes - ₹500' : '5 Products, 5 Minutes - ₹1200'} (Products: {products.length}/5)
          </p>
        )}

        {/* Product Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit Product' : 'Add Product'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                  Stock
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                  min="0"
                  required
                />
              </div>
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Product Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={handleFileChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
                {editingId && formData.image === null && (
                  <p className="text-sm text-gray-500 mt-1">Previous image will be retained unless a new one is selected.</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                  rows="4"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-200"
            >
              {editingId ? 'Update Product' : 'Add Product'}
            </button>
          </form>
        </div>

        {/* Product List */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Your Products</h3>
          {products.length === 0 ? (
            <p className="text-gray-600">No products added yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-md"
                >
                  <div className="flex items-center space-x-4">
                    {product.image && (
                      <img
                        src={`http://localhost:8000/storage/${product.image}`}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-md"
                        onError={(e) => {
                          console.error(`Failed to load image for ${product.name}: ${product.image}`);
                          e.target.src = 'https://via.placeholder.com/150';
                        }}
                      />
                    )}
                    <div>
                      <h4 className="text-lg font-medium">{product.name}</h4>
                      <p className="text-sm text-gray-600">{product.description}</p>
                      <p className="text-sm text-gray-600">Price: ₹{product.price}</p>
                      <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;
