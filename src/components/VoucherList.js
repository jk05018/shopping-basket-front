import React, {useEffect, useState} from "react";

import {click} from "@testing-library/user-event/dist/click";
import {Voucher} from "./Voucher";

export function VoucherList({vouchers = [], onAddClick}) {

    return (
        <React.Fragment>
            <h5 className="flex-grow-0"><b>바우처 목록</b></h5>
            <ul className="list-group vouchers">
                {vouchers.map(v =>
                    <li key={v.voucherId} className="list-group-item d-flex mt-3">
                        <Voucher {...v} onAddClick={onAddClick}/>
                        {/*productName={v.productName} category={v.category} price={v.price} 이것을 -> {...v} 로 대체 가능*/}
                    </li>)}
            </ul>
        </React.Fragment>
    )
}
