import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Row, Col, Alert, Container } from 'react-bootstrap';
import './CatScreen.css';

function CatScreen() {
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/api/products');
        const categories = [
          ...new Set(data.map((product) => product.category)),
        ];
        setCategories(categories);
      } catch (error) {
        setError('Failed to fetch categories. Please try again later.');
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
      setError('Failed to fetch products. Please try again later.');
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
          <Row className="justify-content-center">
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="me-2"
              />
            </Col>
            <Col xs="auto">
              <Button variant="primary" type="submit">
                Search
              </Button>
            </Col>
          </Row>
        </Form>
        <Row className="justify-content-center">
          <Col xs="auto" className="pe-2">
            <Link to="/categories">
              <Button className="custom-button">All</Button>
            </Link>
          </Col>
          {categories.map((category) => (
            <Col key={category} xs="auto" className="pe-2">
              <Link to={`/categories/${category}`}>
                <Button className="custom-button">{category}</Button>
              </Link>
            </Col>
          ))}
        </Row>
        <Row className="justify-content-center mt-3">
          <Outlet />
        </Row>
      </div>
    </Container>
  );
};

export default CatScreen;
