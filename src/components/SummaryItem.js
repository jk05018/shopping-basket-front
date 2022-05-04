import React from "react";

export function SummaryItem({productName, count, price}) {
    return (
        <React.Fragment>
            <div className="row">
                <h6 className="col p-0"> {productName} <span className="badge bg-dark text-">{count}개</span> </h6>
                <h5 className="col text-end">total : {count * price}</h5>
            </div>
        </React.Fragment>
    )
}
