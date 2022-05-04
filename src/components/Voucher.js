import React from "react";

export function Voucher(props) {
    const {voucherId, value, type, description} = props;

    // 밑에 onclick 내부에 함수를 작성해도 되지만 보통 위에다 많이 작성한다
    const handleAddBtnClicked = e => {
        props.onAddClick(voucherId);
    };


    return (
        <React.Fragment>
            <div className="col-2">
                <img className="img-fluid" src="https://i.imgur.com/HKOFQYa.jpeg" alt=""/>
            </div>
            <div className="col">
                <div className="row text-muted">{type}</div>
            </div>
            <div className="col">
                <div className="col text-center"> {description}</div>
            </div>

            <div className="col text-end action">
                <button onClick={handleAddBtnClicked} className="btn btn-small btn-outline-dark">선택</button>
            </div>
        </React.Fragment>
    )

}
