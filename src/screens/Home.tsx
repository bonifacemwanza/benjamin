import React, {useState} from 'react'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import Header from "../components/Header"
import { MdOutlineSwapVert, MdArrowForwardIos, MdArrowBackIos } from "react-icons/md"
import { AiOutlineFileSearch} from "react-icons/ai"
import { GoSettings} from "react-icons/go"
import Filter from '../components/Filter'
import { useSelector, useDispatch } from "react-redux";
import { SORT, ORDER, PAGE, ADD_CART } from "../redux/actions";

const Home = () => {
    const [hideFilter, sethideFilter] = useState(true)
    const dispatch = useDispatch();
    const ProductList: string[] = (useSelector((state: any) => state.reducer)).products;
    const RenderList: string[] = (useSelector((state: any) => state.reducer)).renderList;
    const showcase = (useSelector((state: any) => state.reducer)).showcase;
    const page = (useSelector((state: any) => state.reducer)).page;

    let pages = (Math.ceil(ProductList.length / 6))
    let pageNums = []
    for (let index = 1; index <= pages; index++) {
        pageNums.push(index)
    }
    
    // let showcase = JSON.parse(localStorage.getItem("SHOWCASE"))

    // for (let index = 0; index < 4; index++) {
    //     let i = (Math.floor(Math.random() * Data.products.length))
    //     showcase.push(Data.products[i])
    // }
    

    const [message, setmessage] = useState("ADD TO CART")
    const addToCart = (data:any) => {
        setmessage("ADDED !!!")
        setTimeout(function () { setmessage("ALREADY IN CART") }, 3000);
        let obj = {
            data:showcase[0]
        }
        dispatch(ADD_CART(obj))
    }

    return (
        <div className="Home">
            <Header />
            <div className="showcase">
                <div className="showcase-header">
                    <p className="bold700 font4">{showcase[0].name}</p>
                    <button className="font2" onClick={addToCart}>{message}</button>
                </div>
                <div className="showcase-image" style={{ backgroundImage: `url(${require("../assets/" + showcase[0].image).default})` }}>
                    <p className="bold600 font2">Photo of the Day</p>
                </div>
                <div className="showcase-bottom">
                    <div className="showcase-desc">
                        <p className="showcase-desc-head bold600 font3">About {showcase[0].name}</p>
                        <p className="showcase-desc-cat font3">{showcase[0].category}</p>
                        <p className="showcase-desc-para font2">{showcase[0].details}</p>
                    </div>
                    <div className="showcase-other">
                        <p className="showcase-other-header bold600 font3">People also buy</p>
                        <div className="showcase-other-images">
                            <div style={{ backgroundImage: `url(${require("../assets/" + showcase[1].image).default})` }}></div>
                            <div style={{ backgroundImage: `url(${require("../assets/" + showcase[2].image).default})` }}></div>
                            <div style={{ backgroundImage: `url(${require("../assets/" + showcase[3].image).default})` }}></div>
                        </div>
                        <p className="showcase-head-bold bold600 font2">Details</p>
                        <p className="showcase-size-small font2">Size: 1020 x 1020 pixel</p>
                        <p className="showcase-size-small font2">Size: 15mb</p>
                    </div>
                </div>
            </div>
            <div className="main-body">
                <div className="main-body-header">
                    <div>
                        <span className="nav-lead bold600 font3">Photography /</span > <span className="nav-sub font2">Premium photos</span>
                    </div>
                    <div className="main-body-header-right">
                        <MdOutlineSwapVert className="font3 order-switch" onClick={() => dispatch(ORDER())} />
                        <p className="gray-text font2">Sort by: </p>
                        <select name="" id="" className="font2" onChange={(e: any) => dispatch(SORT(e.target.value))}>
                            <option value="P">Price</option>
                            <option value="N">Name</option>
                        </select>
                    </div>
                    <GoSettings className="toggle-filter font3" onClick={()=> sethideFilter(!hideFilter)}/>

                </div>
                <div className="main-body-cols">
                    <div className={hideFilter ? "hideFilter" : ""}>
                    <Filter/>
                    </div>

                    <div className="gallery">
                        <div className="gallary-photos">
                            {RenderList.length < 1 ? 
                            <div className="empty-div">
                                <AiOutlineFileSearch className="bold700 font8"/>
                                <p className="bold700 font3">No Results</p>
                            </div>
                            :
                            RenderList.map((element: any) => {
                                return <ProductCard key={element.name} data={element} />
                            })
                        }
                        </div>
                        <div className="gallary-pages font2">
                            {page === 1 ? "" :
                            RenderList.length < 1 ? "" :
                            <p onClick={() => dispatch(PAGE(page - 1))}><MdArrowBackIos /></p>
                            }
                            {
                                pageNums.map(element => {
                                    return <p key={element} onClick={() => dispatch(PAGE(element))} className={page === element ? "bold700 font3" : ""}>{element}</p>
                                })
                            }
                            {page === pages ? "" : 
                             RenderList.length < 1 ? "" :
                            <p onClick={() => dispatch(PAGE(page + 1))}><MdArrowForwardIos /></p>}

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home



// {
//     "name": "Samurai King Restling",
//     "category": "landmarks",
//     "price": 101,
//     "currency": "USD",
//     "image": {
//         "src": "",
//         "alt": ""
//     },
//     "bestseller": false,
//     "featured": true,
//     "details": {
//         "dimmentions": {
//             "width": 1020,
//             "height": 1020
//         },
//         "size": 15000,
//         "description": "So how did the classical Latin become so incoherent? According to McClintock, a 15th century typesetter likely",
//         "recommendations": [
//             {
//                 "src": "",
//                 "alt": ""
//             },
//             {
//                 "src": "",
//                 "alt": ""
//             },
//             {
//                 "src": "",
//                 "alt": ""
//             }
//         ]
//     }
// }