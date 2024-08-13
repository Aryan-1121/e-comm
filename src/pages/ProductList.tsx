import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchProducts } from '../redux/productsSlice';
import { addItemToCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';



const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);
  const loading = useSelector((state: RootState) => state.products.loading);
  const error = useSelector((state: RootState) => state.products.error);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    dispatch(fetchProducts(0)); 
  }, [dispatch]);

  const loadMoreProducts = () => {
    const limit = products.length + 5;
    dispatch(fetchProducts(limit));
  };

  // search logic

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
    } else {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();

      const searchResults = products.filter(product =>
        product.title.toLowerCase().includes(lowerCaseSearchTerm)
        // || product.category.toLowerCase() === lowerCaseSearchTerm
      );
      setFilteredProducts(searchResults);
    }
  }, [searchTerm, products]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };


  const handleAddToCart = (product: any) => {
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.image,
    };
    dispatch(addItemToCart(cartItem));
  };

  return (

    <div className="container mx-auto p-4">
      <Link
        to="/cart"
        className=" inline-block mb-4 px-6 py-2 text-white bg-yellow-500 rounded-full hover:bg-yellow-700">
        🛒 Go to Cart
      </Link>
      <h1 className="text-3xl font-bold mb-4">Product List</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by product name or category"
          className="p-2 border rounded w-full"
        />
      </div>  

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* {products.map((product) => ( */}
        {filteredProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow">
            <img src={product.image} alt={product.title} className="h-40 mx-auto" />
            <h2 className="text-xl font-bold mt-2">{product.title}</h2>
            {/* <p className="mb-2">Category: {product.category}</p> */}
            <p>${product.price}</p>
            <p className="text-sm text-gray-600">{product.description}</p>
            {/* add to cart button  */}
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-400"
            >Add to Cart
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={loadMoreProducts}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Load More
      </button>
    </div>
  );
};

export default ProductList;
