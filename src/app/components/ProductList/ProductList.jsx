"use client"
import React, { useEffect, useState } from 'react';
import { getProducts } from '../../services/api';
import ProductCard from '../ProductCard/ProductCard';

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

  return (
    <>
      <div>
        <label>
          Min Price:
          <input
            type="number"
            name="minPrice"
            value={filterParams.minPrice}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Max Price:
          <input
            type="number"
            name="maxPrice"
            value={filterParams.maxPrice}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Product Name:
          <input
            type="text"
            name="productName"
            value={filterParams.productName}
            onChange={handleFilterChange}
          />
        </label>
        <button onClick={applyFilters}>Apply Filters</button>
      </div>
      <div className='d-flex flex-wrap'>
        {filteredProducts.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductList;
