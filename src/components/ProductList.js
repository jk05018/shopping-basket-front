import React from "react";
import {Product} from "./Product";

export function ProductList({products = [], onAddClick}) {
    return (
        <React.Fragment>
            <h5 className="flex-grow-0"><b>상품 목록</b></h5>
            <ul className="list-group products">
                {products.map(v =>
                    <li key={v.id} className="list-group-item d-flex mt-3">
                        <Product {...v} onAddClick={onAddClick}/>
                        {/*productName={v.productName} category={v.category} price={v.price} 이것을 -> {...v} 로 대체 가능*/}
                    </li>)}
            </ul>
        </React.Fragment>
    )
}
