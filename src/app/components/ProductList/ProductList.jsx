"use client"
import React, { useEffect, useState } from 'react';
import { getProducts } from '../../services/api';
import ProductCard from '../ProductCard/ProductCard';
import { Row, Col } from 'react-bootstrap';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filterParams, setFilterParams] = useState({
    minPrice: '',
    maxPrice: '',
    productName: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
        setFilteredProducts(productsData);
        console.log(productsData)
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterParams({ ...filterParams, [name]: value });
  };

  const applyFilters = () => {
    let filteredResult = products;

    if (filterParams.minPrice !== '') {
      filteredResult = filteredResult.filter(
        (product) => parseFloat(product.price) >= parseFloat(filterParams.minPrice)
      );
    }

    if (filterParams.maxPrice !== '') {
      filteredResult = filteredResult.filter(
        (product) => product.price <= parseFloat(filterParams.maxPrice)
      );
    }

    if (filterParams.productName !== '') {
      filteredResult = filteredResult.filter((product) =>
        product.name.toLowerCase().includes(filterParams.productName.toLowerCase())
      );
    }

    setFilteredProducts(filteredResult);
  };

  const clearFilters = () => {
    setFilteredProducts(products);
    setFilterParams({
      minPrice: '',
      maxPrice: '',
      productName: '',
    });
  }

  return (
    <Row>
      <Col xs={12} sm={12} md={2} lg={2} style={{ position: 'sticky', top: '50px', margin: '50px 20px' }}>
        <div className="p-4 rounded" style={{position: 'sticky', top: '50px', backgroundColor: '#B1B7D1'}}>
          <h4>Filtry</h4>
          <div className="mb-3">
            <label className="form-label">Cena minimalna:</label>
            <input
              type="number"
              className="form-control"
              name="minPrice"
              value={filterParams.minPrice}
              onChange={handleFilterChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Cena maksymalna:</label>
            <input
              type="number"
              className="form-control"
              name="maxPrice"
              value={filterParams.maxPrice}
              onChange={handleFilterChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Nazwa produktu:</label>
            <input
              type="text"
              className="form-control"
              name="productName"
              value={filterParams.productName}
              onChange={handleFilterChange}
            />
          </div>
          <button className="btn btn-primary" onClick={applyFilters}>
            Zastosuj
          </button>
          <button className="btn btn-danger" onClick={clearFilters} style={{marginTop: '10px'}}>
            Wyczyść
          </button>
        </div>
        </Col>
      <Row style={{width: '75%', marginRight: '15px'}}>
        {filteredProducts.map((product, index) => (
          <Col key={product.product_id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
      
    </Row>
  );
};

export default ProductList;
