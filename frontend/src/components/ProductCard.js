import { useState } from "react";
import Image from "next/image";
const ProductCard = ({ product }) => {
  const [color, setColor] = useState("yellow");
  const rawRating = product.popularityScore 
  const rating = Math.round(rawRating*5)
  const getColorLabel = (c) => {
    return c === "yellow"
      ? "Yellow Gold"
      : c === "rose"
      ? "Rose Gold"
      : "White Gold";
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center space-x-1 mt-2">
        {/* Stars */}
        <div className="flex items-center space-x-0.5 text-yellow-400">
          {[...Array(fullStars)].map((_, i) => (
            <svg
              key={`full-${i}`}
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09L5.64 12.18.76 8.41l6.11-.88L10 2l3.13 5.53 6.11.88-4.88 3.77 1.52 5.91z" />
            </svg>
          ))}

          {halfStar && (
            <svg className="w-5 h-5" viewBox="0 0 20 20">
              <defs>
                <linearGradient id="half">
                  <stop offset="50%" stopColor="#FACC15" />
                  <stop offset="50%" stopColor="#E5E7EB" />
                </linearGradient>
              </defs>
              <path
                fill="url(#half)"
                d="M10 15l-5.878 3.09L5.64 12.18.76 8.41l6.11-.88L10 2l3.13 5.53 6.11.88-4.88 3.77 1.52 5.91z"
              />
            </svg>
          )}

          {[...Array(emptyStars)].map((_, i) => (
            <svg
              key={`empty-${i}`}
              className="w-5 h-5 text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09L5.64 12.18.76 8.41l6.11-.88L10 2l3.13 5.53 6.11.88-4.88 3.77 1.52 5.91z" />
            </svg>
          ))}
        </div>

        {/* Rating label */}
        <span className="text-sm text-gray-700 ml-1">{rating} / 5</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col rounded-lg ">
      {/* Product Image */}
      <Image
        src={product.images[color]}
        alt={product.name}
        width={400}
        height={256}
        className="w-full h-64 object-cover rounded-md mb-4"
        priority
      />

      {/* Product Info */}
      <div className="text-left">
        <h2 className="text-[15px] text-black font-bold font-montserrat">
          {product.name}
        </h2>
        <p className="text-[15px] text-black font-regular font-montserrat">
          ${product.price} USD
        </p>
        {/* Color Selector */}
        <div className="flex space-x-3 mt-3">
          {["yellow", "rose", "white"].map((c) => (
            <button
              key={c}
              className={`w-8 h-8 rounded-full border-2 ${
                color === c ? "ring-1 ring-black" : "border-gray-300"
              }`}
              style={{
                backgroundColor:
                  c === "yellow"
                    ? "#E6CA97"
                    : c === "rose"
                    ? "#E1A4A9"
                    : "#D9D9D9",
              }}
              onClick={() => setColor(c)}
              aria-label={`Select ${getColorLabel(c)} color`}
            ></button>
          ))}
        </div>

        {/* Selected Color Label */}
        <p className="mt-1 text-[12px] text-gray-600 font-avenir font-book">
          {getColorLabel(color)}
        </p>
        {/* Star Rating */}
        <div className="flex items-center space-x-1 mt-2">
          <span className="text-[14px] text-gray-700 font-avenir font-book">
            {renderStars(rating)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
