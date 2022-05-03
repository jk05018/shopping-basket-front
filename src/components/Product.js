import React from "react";
import {click} from "@testing-library/user-event/dist/click";

export function Product(props) {
    const productId = props.productId;
    const productName = props.productName;
    const category = props.category;
    const price = props.price;

    // 밑에 onclick 내부에 함수를 작성해도 되지만 보통 위에다 많이 작성한다
    const handleAddBtnClicked = e => {
        props.onAddClick(productId);
    };

    return (
        <React.Fragment>
            <div className="col-2">
                <img className="img-fluid" src="https://i.imgur.com/HKOFQYa.jpeg" alt=""/>
            </div>
            <div className="col">
                <div className="row text-muted">{productName}</div>
                <div className="row">{category}</div>
            </div>
            <div className="col text-center price">{price}</div>
            <div className="col text-end action">
                <button onClick={handleAddBtnClicked} className="btn btn-small btn-outline-dark">추가</button>
            </div>
        </React.Fragment>
    )
}
