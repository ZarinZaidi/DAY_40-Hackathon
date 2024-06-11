import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from './Product'; 

const FilteredProducts = ({ products }) => {
  return (
    <Row className='mt-4'>
      {products.map((product) => (
        <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
          <Product product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default FilteredProducts;
