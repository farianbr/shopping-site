export const savedCartLoader = async () => {
  const cart = JSON.parse(localStorage.getItem("cartLength"));
  let uniqueId = [];
  const uniqueCart = [];
//   console.log("this is initial uniqueId", uniqueId);
  uniqueId = [...uniqueId]
  
    cart.forEach((item) => {
      if (!uniqueId.includes(item.id)) {
        // console.log("this is inside  if", uniqueId);
        uniqueId.push(item.id);
        item = {...item}
        item.quantity = 1;
        uniqueCart.push(item);
      }
      else {
        // console.log("this is from  else", item.quantity);
        const cartItem = uniqueCart.find(it=> it.id===item.id)
        // console.log(cartItem.id,cartItem.quantity);
        cartItem.quantity += 1
      }
    })
 

  console.log(cart);
  return uniqueCart
};
