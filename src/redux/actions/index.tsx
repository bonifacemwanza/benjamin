export const ADD_FILTER = (data:any) => {
  return { type: "ADD_FILTER", payload: data };
};
export const ADD_PRICE = (data:any) => {
  return { type: "ADD_PRICE", payload: data };
};
export const SORT= (data:any) => {
  return { type: "SORT", payload: data };
};
export const ORDER= () => {
  return { type: "ORDER"};
};
export const PAGE = (data:any) => {
  return { type: "PAGE", payload: data};
};
export const ADD_CART = (data:any) => {
  return { type: "ADD_CART", payload: data};
};
export const REMOVE_CART = (data:any) => {
  return { type: "REMOVE_CART", payload: data};
};
export const CLEAR_CART = () => {
  return { type: "CLEAR_CART"};
};
export const CART = () => {
  return { type: "CART"};
};