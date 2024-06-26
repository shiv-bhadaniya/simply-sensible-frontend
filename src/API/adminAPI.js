import baseAPI from "./index.js";

export const addNewProduct = (newProductData) =>
  baseAPI.post("/admin/create/product", newProductData);

export const fetchAllUsers = () => baseAPI.get("/admin/alluser");

// fetch all orders
export const fetchAllOrders = () => baseAPI.get("/admin/allorders");

// delete product - admin
export const deleteProduct = (productId) =>
  baseAPI.delete(`/admin/product/delete/${productId}`);

// edit order status
export const editOrderStatus = (orderInfo) =>
  baseAPI.put("/admin/order/edit/status", orderInfo);
