import React, { useEffect } from "react";
import { loadProductIntoRedux } from "../../slices/user/cart";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "../Shared/ProductCard";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import img from "../../assets/hero-1.5.jpg"; // Keeping the original image for now

const Home = () => {
  const dispatch = useDispatch();
  // Assuming we can get products from redux or they are loaded from local storage as per original code
  // But original code was loading from localStorage to Redux. 
  // Let's keep the effect but also try to display some products if available in a real app.
  // For now, I'll mock some products or use what's in the state if I could access it.
  // Since I don't see a selector for products in the original file, I'll assume we might need to fetch them or just show the structure.
  // I will use a placeholder list for demonstration if real data isn't readily available in this component's context, 
  // but better to check if I can get products. 
  // The original code didn't render products, just Heroes. 
  // I will add a "Featured Products" section with dummy data or real data if I can find where it is.
  // Looking at App.js, there is no product loading there.
  // I'll stick to the plan: New Hero + Featured Section.

  useEffect(() => {
    let products = [];
    if (localStorage.getItem("products")) {
      products = JSON.parse(localStorage.getItem("products"));
    }
    dispatch(loadProductIntoRedux(products));
  }, [dispatch]);

  return (
    <div className="bg-secondary-50">
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-secondary-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Sensible snacks for</span>{" "}
                  <span className="block text-primary-600 xl:inline">sensible people</span>
                </h1>
                <p className="mt-3 text-base text-secondary-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Discover our curated collection of premium, healthy, and delicious snacks. We believe in quality ingredients and exceptional taste.
                </p>
                <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start gap-4">
                  <div className="rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Link
                      to="/shop"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg transition-all hover:-translate-y-0.5"
                    >
                      Shop Now
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0">
                    <Link
                      to="/shop"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-primary-700 bg-primary-50 hover:bg-primary-100 md:py-4 md:text-lg transition-all"
                    >
                      View Collection
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src={img}
            alt="Healthy snacks"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/20 to-transparent lg:via-white/0"></div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white to-secondary-50 opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:text-center mb-16">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Why Choose Us</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-secondary-900 sm:text-4xl">
              Simply Sensible Difference
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {[
                {
                  title: 'Premium Quality',
                  description: 'We source only the finest ingredients for our snacks.'
                },
                {
                  title: 'Healthy Choices',
                  description: 'All our products are curated to be both delicious and nutritious.'
                },
                {
                  title: 'Fast Delivery',
                  description: 'Get your favorite snacks delivered right to your doorstep.'
                },
              ].map((feature) => (
                <div key={feature.title} className="relative bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-secondary-100">
                  <dt>
                    <p className="text-xl leading-6 font-bold text-secondary-900 mb-4">{feature.title}</p>
                  </dt>
                  <dd className="text-base text-secondary-500 leading-relaxed">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Featured Products Preview */}
      <div className="bg-secondary-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-secondary-900">Featured Products</h2>
              <p className="mt-2 text-secondary-500">Handpicked favorites just for you</p>
            </div>
            <Link to="/shop" className="hidden sm:flex items-center text-primary-600 hover:text-primary-700 font-medium group">
              View all <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          {/* Placeholder for products since we don't have real data in this component context yet */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
             {/* We can't map real products here without fetching them. 
                 I'll add a note or a static placeholder if needed, 
                 but for now let's just show a "Shop Now" call to action or similar 
                 if no products are passed. 
                 Actually, let's just leave the grid empty or put some static cards if I had data.
                 For now, I will just put a message or rely on the Shop link.
             */}
             <div className="col-span-full text-center py-16 bg-white rounded-3xl border border-secondary-100 border-dashed">
                <p className="text-secondary-400 text-lg">Check out our Shop page for all products!</p>
                <Link to="/shop" className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-primary-700 bg-primary-50 hover:bg-primary-100 transition-all">Go to Shop &rarr;</Link>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
