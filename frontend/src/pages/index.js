import { useState, useEffect } from 'react';
import ProductCarousel from '../components/ProductCarousel';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [popularityRange, setPopularityRange] = useState([0, 5]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className=" mt-10 text-3xl text-black font-avenir font-book text-center mb-6">Product List</h1>
      <div className="mb-6 flex justify-center space-x-4">

      </div>
      <ProductCarousel products={products} />
    </div>
  );
}