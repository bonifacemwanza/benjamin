import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { ADD_CART } from "../redux/actions";
// import Image from "../assets/pet4.jpeg"
const ProductCard = (data: any) => {
    const dispatch = useDispatch();
    const { name, category, price, bestseller, featured, image} = data.data

    const [message, setmessage] = useState("ADD TO CART")
    const addToCart = () => {
        setmessage("ADDED !!!")
        setTimeout(function () { setmessage("ALREADY IN CART") }, 3000);
        dispatch(ADD_CART(data))
    }

    return (
        <div className="ProductCard">
            <div className="product-card-image" 
            // eslint-disable-next-line no-useless-concat
            style={{ backgroundImage: `url(${require("../assets/" + image).default})` }}>
                {bestseller ? <p className="font2 bestseller-tag">Bestseller</p> : featured ? <p className="font2 bestseller-tag">Featured</p> : <p></p>}
                <button className="font2 addToCartBtn" onClick={addToCart}>{message}</button>
            </div>
            <p className="product-category font2">{category}</p>
            <p className="product-name bold600 font3">{name}</p>
            <p className="product-price font3">${price}</p>
        </div>
    )
}

export default ProductCard
