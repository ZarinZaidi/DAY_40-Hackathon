import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ListGroupItem } from "react-bootstrap";
function AllProdScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from MongoDB database
    axios.get('/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div>
      <Row className="flex-wrap">
        {products.map((product) => (
          <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
            <ListGroupItem>
              <Link
                to={`/product/${product.slug}`}
                className="d-flex flex-column align-items-center">
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "150px", height: "150px" }}
                />
                <h5>{product.name}</h5>
                <p>${product.price}</p>
              </Link>
            </ListGroupItem>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default AllProdScreen;
