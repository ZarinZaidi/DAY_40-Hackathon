import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card, Button } from "react-bootstrap";
import Rating from '../components/Rating';
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
      <Row className="flex-wrap mt-4">
        {products.map((product) => (
          <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
            <Card>
              <Link to={`/product/${product.slug}`}>
                <Card.Img variant="top" src={product.image} alt={product.name} style={{ width: "160px", height: "200px" }} />
              </Link>
              <Card.Body>
                <Link to={`/product/${product.slug}`}>
                  <Card.Title>{product.name}</Card.Title>
                </Link>
                <Rating rating={product.rating} numReviews={product.numReviews} />
                <Card.Text>${product.price}</Card.Text>
                {product.countInStock === 0 ? (
                  <Button variant="light" disabled>
                    Out of stock
                  </Button>
                ) : (
                  <Button>Add to cart</Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default AllProdScreen;
