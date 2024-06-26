import baseAPI from "./index.js";

export const getAllProducts = () => baseAPI.get("/shop");

export const getCartPrice = (cartDetails) =>
  baseAPI.post("/shop/cart-details-price-calculate", cartDetails);

// payment
export const getStripAPIKey = () =>
  baseAPI.get("/shop/checkout/getstripapikey");

export const paymentProcess = (data) =>
  baseAPI.post("/shop/checkout/payment", data);

// order
export const newOrder = (newOrderData) =>
  baseAPI.post("/shop/checkout/order/new", newOrderData);

export const getAllUserOrder = () => baseAPI.get("/user/profile/order");

// product new review
export const newProductReview = (productId, reviewData) =>
  baseAPI.put(`/shop/product/new-review/${productId}`, reviewData);

// product detials
export const getProductDetails = (productId) =>
  baseAPI.get(`/shop/product/product-details/${productId}`);
