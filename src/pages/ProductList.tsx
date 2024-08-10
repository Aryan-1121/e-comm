import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchProducts } from '../redux/productsSlice';
import { log } from 'console';

const ProductList: React.FC = () => {
  const dispatch = useDispatch<any>();
  const products = useSelector((state: RootState) => state.products.products);
  const loading = useSelector((state: RootState) => state.products.loading);
  const error = useSelector((state: RootState) => state.products.error);

  useEffect(() => {
    dispatch(fetchProducts(1)); 
  }, [dispatch]);

  const loadMoreProducts = () => {
    const nextPage = Math.ceil(products.length / 5) + 1;
    console.log(nextPage);
    dispatch(fetchProducts(nextPage));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Product List</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow">
            <img src={product.image} alt={product.title} className="h-40 mx-auto" />
            <h2 className="text-xl font-bold mt-2">{product.title}</h2>
            <p>${product.price}</p>
            <p className="text-sm text-gray-600">{product.description}</p>
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
