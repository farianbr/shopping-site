export const savedCartLoader = async () => {
  const cart = JSON.parse(localStorage.getItem("cartLength"));
 
  return cart
};
