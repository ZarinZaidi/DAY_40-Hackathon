import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Form,
  Button,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Alert,
  Container,
} from "react-bootstrap";
import "./CatScreen.css";

const CatScreen = () => {
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/api/products");
        const categories = [
          ...new Set(data.map((product) => product.category)),
        ];
        setCategories(categories);
      } catch (error) {
        setError("Failed to fetch categories. Please try again later.");
      }
    };
    fetchCategories();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`/api/products`);
      const filtered = data.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } catch (error) {
      setError("Failed to fetch products. Please try again later.");
    }
  };

  return (
    <Container>
      <Link to="/" className="btn btn-secondary mb-2">
        Back to Home
      </Link>
      <div className="text-center">
        <h1>All Products</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSearch} className="mb-3">
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col>
              <Button variant="primary" type="submit">
                Search
              </Button>
            </Col>
          </Row>
        </Form>

        <Row className="justify-content-center">
          <Col xs="auto" className="pe-2">
            <Link to="/">
              <Button className="custom-button">All</Button>
            </Link>
          </Col>
          {categories.map((category) => (
            <Col key={category} xs="auto" className="pe-2">
              <Link to={`/product/category/${category}`}>
                <Button className="custom-button">{category}</Button>
              </Link>
            </Col>
          ))}
        </Row>

        <Row className="flex-wrap justify-content-center">
          {filteredProducts.length > 0 && (
            <div className="w-100">
              <h2 className="mt-4">Search Results</h2>
              {filteredProducts.map((product) => (
                <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                  <ListGroupItem>
                    <Link
                      to={`/product/${product.slug}`}
                      className="d-flex flex-column align-items-center"
                    >
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
            </div>
          )}
        </Row>
      </div>
    </Container>
  );
};

export default CatScreen;
