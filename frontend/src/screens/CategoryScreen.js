import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ListGroup, ListGroupItem, Alert } from "react-bootstrap";
import Rating from '../components/Rating';

function CategoryScreen() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`/api/products/category/${category}`);
        setProducts(data);
      } catch (error) {
        setError("Failed to fetch products. Please try again later.");
      }
    };
    fetchProducts();
  }, [category]);

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row className="flex-wrap mt-4">
        {products.map((product) => (
          <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
            <Card>
              <Link to={`/product/${product.slug}`}>
                <Card.Img variant="top" src={product.image} alt={product.name} style={{ width: "180px", height: "220px" }} />
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
};

export default CategoryScreen;