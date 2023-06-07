export function uniqueCart (cart){
    let uniqueId = [];
    let uniqueCart = [];
    uniqueId = [...uniqueId]
    uniqueCart = [...uniqueCart]
    
      cart.forEach((item) => {
        if (!uniqueId.includes(item.id)) {
          uniqueId.push(item.id);
          item = {...item}
          item.quantity = 1;
          uniqueCart.push(item);
        }
        else {
          const cartItem = uniqueCart.find(it=> it.id===item.id)
          cartItem.quantity += 1
        }
      })
   
  return uniqueCart
}