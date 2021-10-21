import Data from "../data.json"
import { useDispatch } from "react-redux";
import { ADD_FILTER, ADD_PRICE} from "../redux/actions";
import React, { useState } from "react";

const Filter = () => {
    
    const dispatch = useDispatch();
    let categories: any = []
    Data.products.forEach(element => { categories.push(element.category) });
    const unique = (value: any, index: any, self: any) => self.indexOf(value) === index
    const uniqueCats = categories.filter(unique)

    const handleCheck = (e:any) => {
        dispatch(ADD_FILTER([e.checked, e.value]));
    }
    const [L1, setL1] = useState(false)
    const [L2, setL2] = useState(false)
    const [L3, setL3] = useState(false)
    const [L4, setL4] = useState(false)

    const handlePrice = (e:any) => {
        
        if(e.value === "L1"){
            setL1(!L1)
            setL2(false)
            setL3(false)
            setL4(false)

            dispatch(ADD_PRICE([!L1, e.value]))
        }
        if(e.value === "L2"){
            setL2(!L2)
            setL1(false)
            setL3(false)
            setL4(false)

            dispatch(ADD_PRICE([!L2, e.value]))
        }
        if(e.value === "L3"){
            setL3(!L3)
            setL1(false)
            setL2(false)
            setL4(false)

            dispatch(ADD_PRICE([!L3, e.value]))
        }
        if(e.value === "L4"){
            setL4(!L4)
            setL1(false)
            setL2(false)
            setL3(false)

            dispatch(ADD_PRICE([!L4, e.value]))
        }
    }
    
    return (
        <div className="filter">
            <div className="filter-div">
                <p className="filter-header font3">Category</p>
                <div className="filter-body font2">
                    {uniqueCats.map((element: any) => {
                        console.log("FILTER", element)
                        return <div className="filter-row " key={element}>
                            <input type="checkbox" id={element} name={element} value={element} onChange={e => handleCheck(e.target)}/>
                            <label htmlFor={element}>{element}</label>
                        </div>
                    })}
                </div>
            </div>
            <div className="filter-div">
                <p className="filter-header font3">Price</p>
                <div className="filter-body font2">
                    <div className="filter-row ">
                        <input type="checkbox"  value="L1" id="L1" name="price" onChange={e => handlePrice(e.target)} checked={L1}/>
                        <label htmlFor="L1">Lower Than $20</label>
                    </div>
                    <div className="filter-row">
                        <input type="checkbox" value="L2" id="L2" name="price" onChange={e => handlePrice(e.target)} checked={L2}/>
                        <label htmlFor="L2">$20 - $99</label>
                    </div>
                    <div className="filter-row">
                        <input type="checkbox" value="L3" id="L3" name="price" onChange={e => handlePrice(e.target)} checked={L3}/>
                        <label htmlFor="L3">$100 - $200</label>
                    </div>
                    <div className="filter-row">
                        <input type="checkbox" value="L4" id="L4" name="price" onChange={e => handlePrice(e.target)} checked={L4}/>
                        <label htmlFor="L4">More than $200</label>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Filter
