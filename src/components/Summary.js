import React, {useState} from "react";
import {SummaryItem} from "./SummaryItem";
import {SummaryVoucher} from "./SummaryVoucher";

export function Summary({items = [], voucher_item= [], onOrderSubmit}) {
    // summaryeh form에 대한 상태를 가져가야 한다?
    // email, address, postcode가 orderFormData이기 때문에 타이핑 치는 것에 대한 상태를 관리해 줘야 한다.
    const totalPrice = items.reduce((prev, curr) => prev + (curr.price * curr.count), 0)
    const value = voucher_item.map(v => v.value);
    const discount = voucher_item.map(v => v.type).pop() === 'FIXED_AMOUNT_VOUCHER' ?
    totalPrice - value : totalPrice * (100 - value) / 100;
    const afterDiscount = discount < 0 ? 0 : discount;

    const [order, setOrder] = useState({
        email: "", address: "", postcode : ""
    });
    const handleEmailInputChanged = (e) => setOrder({...order, email: e.target.value})
    const handleAddressInputChanged = (e) => setOrder({...order, address: e.target.value})
    const handlePostcodeInputChanged = (e) => setOrder({...order, postcode: e.target.value})
    const handleSubmit = (e) => {
        if (order.address === "" || order.email === "" || order.postcode === ""){
            alert("입력값을 확인해 주세요!")
        }else{
            onOrderSubmit(order);
        }
    }


    return (
        <React.Fragment>
            <div>
                <h5 className="m-0 p-0"><b>Summary</b></h5>
            </div>
            <hr/>
            {items.map(v => <SummaryItem key={v.id} productName={v.name} count={v.count} price = {v.price}/>)}
            {voucher_item.map(v => <SummaryVoucher key={v.voucherId} type = {v.type} value = {v.value}/>)}
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">이메일</label>
                    <input type="email" className="form-control mb-1" value={order.email} onChange={handleEmailInputChanged}
                           id="email"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">주소</label>
                    <input type="text" className="form-control mb-1" value={order.address} onChange={handleAddressInputChanged}
                           id="address"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="postcode" className="form-label">우편번호</label>
                    <input type="text" className="form-control" value={order.postcode} onChange={handlePostcodeInputChanged}
                           id="postcode"/>
                </div>
                <div>당일 오후 2시 이후의 주문은 다음날 배송을 시작합니다.</div>
            </form>
            <h5 className="m-0 p-0"><b>총 금액</b></h5>
            <div className="row pt-2 pb-2 border-top">
                <h5 className="col text-start">{totalPrice} - {totalPrice - afterDiscount} </h5>
                <h5 className="col text-end">{afterDiscount}</h5>
            </div>
            <button className="btn btn-dark col-12" onClick={handleSubmit}>결제하기</button>
        </React.Fragment>
    )
}
