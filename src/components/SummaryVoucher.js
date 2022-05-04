import React from "react";

export function SummaryVoucher({type, value}) {
    const type_comment = type === 'FIXED_AMOUNT_VOUCHER' ? '원 할인' : '% 할인';

    return (
        <React.Fragment>
            <div className="row">
                <h6 className="p-0"><span className="badge bg-dark text-">{value}{type_comment}</span></h6>
            </div>

        </React.Fragment>
    )
}
