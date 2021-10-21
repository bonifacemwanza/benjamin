import { combineReducers } from "redux";
import axios from "axios"
var data = '';

var config = {
  method: 'get',
  url: 'https://guiding-bedbug-17.hasura.app/api/rest/data',
  headers: { 
    'x-hasura-admin-secret': '2ac68j0hu6al8oZ7ljvdf2u1VImmsyTNGf2B9FkZzgnTPRFfYPBpkAeh4Jhd3f8K'
  },
  data : data
};
axios(config)
.then(function (response) {
  localStorage.setItem("PROD", JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

const API_DATA = JSON.parse(localStorage.getItem("PROD"))
console.log("CHECK", API_DATA)
if(API_DATA === null) setInterval(function(){ window.location.reload(); }, 2000);

let showcase = []
for (let index = 0; index < 4; index++) {
  let i = (Math.floor(Math.random() * API_DATA.data.length))
  showcase.push(API_DATA.data[i])
}



let shopState = {
  categoryFilter: [],
  products: getFeatured(API_DATA.data),
  priceLimit: "",
  renderList: [],
  showcase:showcase,
  cart: [],
  sort: "P",
  order: "A",
  page: 1,
  cartOut: false
};
const reducer = (state = shopState, action) => {
  if (action.type === "ADD_FILTER") {
    let newArray = state.categoryFilter;
    if (action.payload[0]) {
      newArray.push(action.payload[1]);
    } else {
      newArray = [];
      state.categoryFilter.forEach((element) => {
        if (action.payload[1] !== element) {
          newArray.push(element);
        }
      });
    }
    let stateProducts = priceLevels(state.priceLimit, API_DATA.data);
    let newProductList = productList(newArray, stateProducts);
    let pageList = renderList(1, newProductList);
    return {
      ...state,
      categoryFilter: newArray,
      products: newProductList,
      renderList: pageList,
      page:1
    };
  }

  if (action.type === "ADD_PRICE") {
    let price = ""
    if(action.payload[0]) price = action.payload[1]
    let stateProducts = productList(state.categoryFilter, API_DATA.data);
    
    let newList = priceLevels(price, stateProducts)
    let pageList = renderList(1, newList);
    return {
      ...state,
      priceLimit: price,
      products: newList,
      renderList: pageList,
      page:1
    };
  }

  if (action.type === "SORT") {
    let stateProducts = sortProducts(action.payload, state.products);
    let pageList = renderList(1, stateProducts);
    return {
      ...state,
      sort: action.payload,
      products: stateProducts,
      renderList: pageList,
      page:1
    };
  }

  if (action.type === "ORDER") {
    let order = state.order;
    if (order === "A") order = "D";
    else order = "A";

    let stateProducts = orderProducts(order, state.products);
    let pageList = renderList(1, stateProducts);
    return {
      ...state,
      order: order,
      products: stateProducts,
      renderList: pageList,
      page: 1
    };
  }
  if (action.type === "PAGE") {
    console.log(action.payload);
    let pageList = renderList(action.payload, state.products);
    return { ...state, page: action.payload, renderList: pageList };
  }

  if (action.type === "ADD_CART") {
    let cartList = state.cart
    let found = false


    cartList.forEach(element => {
      if(element.name === action.payload.data.name) found = true
    })
    if(!found) cartList.push(action.payload.data)

    return { ...state, cart: cartList, cartOut: true};
  }

  if (action.type === "REMOVE_CART") {
    let cartList = []
    state.cart.forEach(element=>{
      if(element.name !== action.payload.name) cartList.push(element)
    })
    return { ...state, cart: cartList};
  }

  if (action.type === "CLEAR_CART") {
    let cartList = []
    return { ...state, cart: cartList, cartOut:false};
  }

  if (action.type === "CART") {
    return { ...state, cartOut: !(state.cartOut)};
  }


  let pageList = renderList(state.page, state.products);
  return { ...state, renderList: pageList };
};

function renderList(page, products) {
  let RenderList = [];
  let index = (page - 1) * 6;
  for (let i = index; i < index + 6; i++) {
    if (i < products.length) RenderList.push(products[i]);
  }
  return RenderList;
}
function orderProducts(type, products) {
  let List = [];
  if (type === "D") {
    for (let i = products.length - 1; i >= 0; i--) List.push(products[i]);
  } else {
    for (let i = 0; i < products.length; i++) List.push(products[i]);
  }

  return List;
}
function sortProducts(type, products) {
  let stateProducts = products;
  if (type === "N") stateProducts = stateProducts.sort(dynamicSort("name"));
  else stateProducts = stateProducts.sort(dynamicSort("price"));
  return stateProducts;
}
function dynamicSort(property) {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}
function productList(filterArray, products) {
  let newProductList = [];
  filterArray.forEach((element) => {
    products.forEach((item) => {
      if (element === item.category) newProductList.push(item);
    });
  });

  return filterArray < 1 ? products : newProductList;
}
function priceLevels(priceLevel, products) {
  
  let newList = [];
  products.forEach(element => {
    if(priceLevel === "L1" && element.price < 20){
      newList.push(element)
    }
    if(priceLevel === "L2" && element.price >= 20 && element.price < 100){
      newList.push(element)
    }
    if(priceLevel === "L3" && element.price >= 100 && element.price <= 200){
      newList.push(element)
    }
    if(priceLevel === "L4" && element.price > 200){
      newList.push(element)
    }
    if(priceLevel === ""){
      newList.push(element)
    }
  })

  return newList;
}
function getFeatured(products){
  let Featured = []
  products.forEach(element => {
    if(element.featured)Featured.push(element)
  })
  let noFeatured = []
  products.forEach(element =>{
    if(!element.featured)noFeatured.push(element)
  })
  let finalList = []
  Featured.forEach(element=>{
    finalList.push(element)
  })
  noFeatured.forEach(element=>{
    finalList.push(element)
  })
  return finalList
}
const allReducers = combineReducers({
  reducer,
});

export default allReducers;
