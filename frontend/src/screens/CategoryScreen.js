import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ListGroup, ListGroupItem, Alert, Button } from "react-bootstrap";

const CategoryScreen = () => {
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
};

export default CategoryScreen;