import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AddToCart } from "../../slices/user/cart";
import { toast } from "react-toastify";
import { StarIcon } from "@heroicons/react/24/solid";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const addToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(AddToCart(product));
    toast.success("Added to cart");
  };

  return (
    <Link to={`/shop/product-details/${product._id}`} className="group block h-full">
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-secondary-100 h-full flex flex-col">
        {/* Image Container */}
        <div className="aspect-[4/5] overflow-hidden bg-secondary-50 relative">
          <img
            src={product.images[0]?.url}
            alt={product.name}
            className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          
          {/* Quick Add Button */}
          <button
            onClick={addToCart}
            className="absolute bottom-4 right-4 p-3.5 rounded-full bg-white/90 backdrop-blur-sm shadow-lg text-secondary-900 hover:bg-primary-600 hover:text-white transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10 hover:scale-110"
          >
            <ShoppingCartIcon className="h-5 w-5" />
          </button>
          
          {/* Badge (Optional) */}
          {product.stock <= 0 && (
            <div className="absolute top-4 left-4 bg-red-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wider uppercase">
              Out of Stock
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-secondary-900 line-clamp-1 group-hover:text-primary-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-lg font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-lg">
              ${product.price}
            </p>
          </div>
          
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-4 w-4 ${
                  i < product.ratings
                    ? "text-yellow-400"
                    : "text-secondary-200"
                }`}
              />
            ))}
            <span className="text-xs text-secondary-400 ml-2 font-medium">({product.numOfReviews} reviews)</span>
          </div>

          <p className="text-sm text-secondary-500 line-clamp-2 mb-4 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
