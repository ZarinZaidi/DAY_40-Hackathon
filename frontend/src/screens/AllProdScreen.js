import React, { useEffect, useState } from 'react';
import axios from 'axios'; // You might need to import axios or any other library you're using for HTTP requests

function AllProdScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from MongoDB database
    axios.get('/api/products') // Assuming your backend API endpoint for fetching products is '/api/products'
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div>
      <ul>
        {products.map(product => (
          <li key={product._id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default AllProdScreen;
