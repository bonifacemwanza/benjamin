import React from 'react'
import { FiShoppingCart } from "react-icons/fi"
import { AiOutlineClose } from "react-icons/ai"
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineFileSearch} from "react-icons/ai"
import { REMOVE_CART, CLEAR_CART, CART } from "../redux/actions";

const Cart = () => {
    const dispatch = useDispatch();
    const ProductList = (useSelector((state: any) => state.reducer)).cart;
    const CartOut = (useSelector((state: any) => state.reducer)).cartOut;

    return (
        <div className="cart">
            <div className="cart-logo" onClick={() => dispatch(CART())}>
                <FiShoppingCart className="font3"/>
                <p className="font1 cart-bubble">{ProductList.length}</p>
            </div>
            
            <div className="cart-list" style={!CartOut ? {display:"none"}:{display:"block"}}>
                <div className="top-cart">
                    <AiOutlineClose className="font3" onClick={() => dispatch(CART())}/>
                </div>
                <div className="cart-body">
                    {ProductList.length <1  ? 
                    <div className="cart-empty">
                        <AiOutlineFileSearch className="font5"/>
                        <p>Cart Empty</p>
                    </div>
                    : 
                    ProductList.map((element:any) => {
                        return <div key={(element.name)} className="cart-row"> 
                            <div className="cart-details">
                                <p className="font2 cart-name">{element.name}</p>
                                <p className="font2 gray-text bold700">${element.price}</p>
                                <p className="font1 remove-cart bold700"  onClick={() => dispatch(REMOVE_CART(element))}>remove</p>
                            </div>
                            <div className="cart-image" style={{ backgroundImage: `url(${require("../assets/" + element.image).default})` }}>

                            </div>
                        </div>
                    })}
                </div>
                <div className="cart-bottom">
                    <button onClick={() => dispatch(CLEAR_CART())}>Clear</button>
                </div>
            </div>
        </div>
    )
}

export default Cart
