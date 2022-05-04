import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import React, {useEffect, useState} from 'react';
import {ProductList} from "./components/ProductList";
import {Summary} from "./components/Summary";
import {VoucherList} from "./components/VoucherList";
import axios from "axios";

function App() {
    // 왼쪽 -> 초기값을 담고 있는 state 변수, 오른쪽 -> state 값을 업데이트 해주는 함
    // state 값이 update되면 UI도 update해주자 -> UI를 바꾸는 작업은 비쌈 변수가 바뀔때 UI를 바꾸는게 아니라 State가 바뀔때 update 된다.
    // 잠깐 값을 들고 있기 좋다 -> 변수 , UI rendering 하기 좋은 변수 State 스테이츠!
    // state가 바뀌면 모든 UI가 바뀌는 함수를들 전부 다 실행한 다음에 update한다 -> log 출력값과 다를 수 있다. -> 비동기적이다.
    // UI를 update할 때 마다 function App을 다시 그리는 것이다. 변수들은 값을 유지하지 못ㅎ나다. 변수의 값은 초기화된다 -> 잠깐 저장해두는 값들

    // 클래스 만이 State를 가질 수 있따? => Compo
    const [products, setProducts] = useState([
        // 초기값 설정
        {id: 'uuid-1', name: '콜롬비아 커피 1', price: 5000, remainQuantity: 20},
        {id: 'uuid-2', name: '아싸라비아 커피', price: 6000, remainQuantity: 30},
        {id: 'uuid-3', name: '메 해피 커피 1', price: 8000, remainQuantity: 40}
    ]);
    const[vouchers, setVouchers] = useState([
        {voucherId : 'voucher_uuid_1', value : 10000, type : 'FIXED_AMOUNT_VOUCHER', description : "10000원 할인권"},
        {voucherId : 'voucher_uuid_2', value : 30, type : 'PERCENT_DISCOUNT_VOUCHER', description : "30% 할인권"},
        {voucherId : 'voucher_uuid_3', value : 20000, type : 'FIXED_AMOUNT_VOUCHER', description : "20000원 할인권"}
    ])

    const [items, setItems] = useState([]);
    const [voucher_item, setVoucherItem] = useState([]);


    // 렌더링이 끝난 이후에 이게 실행된다.
    // component가 렌더링 될때마다 react에게 어떤 일을 실행시켜 달라고 할 수 있다.
    useEffect(() => {
        // 비동기 작업들은 다 여기서 해야한다. 이때 서버에서 뭘 가져오든지 한다.
        axios.get('http://localhost:8080/api/v1/products')
            .then(v => setProducts((v.data)))
        axios.get('http://localhost:8080/api/v1/vouchers')
            .then(v => setVouchers((v.data)))
    }, []);

    const handleSelectClicked = voucherId => {
        const voucher = vouchers.find(v => v.voucherId === voucherId)
        setVoucherItem([voucher]);
    }

    const handleAddClicked = id => {
        const product = products.find(v => v.id === id)
        const found = items.find(v => v.id === id);
        const updatedItems =
            found ? items.map(v => (v.id === id) ? {
                ...v,
                count: v.count + 1
            } : v) : [...items, {...product, count: 1}]
        setItems(updatedItems);
    }

    const handleOrderSubmit = (order) => {
        if (items.length === 0) {
            alert("아이템을 추가해 주세요!")
        } else {
            axios.post("http://localhost:8080/api/v1/orders", {
                voucherId: voucher_item.map(v => v.voucherId),
                email: order.email,
                address: order.address,
                postcode: order.postcode,
                orderItems: items.map(v => ({
                    productId: v.id,
                    price: v.price,
                    quantity: v.count
                }))
            }).then(v => {
                alert("주문이 정상적으로 접수되었습니다");
                setItems([]);
                setVoucherItem([]);
                window.location.replace("/")
            })
                .catch(e => alert(e.message))
        }
    }

    // props component에 값을 주입해 주는 것? -> 매개변수라 생각하면 되겠는데?
    // 만약에 클래스 base로 props를 어떻게 사용할까? this.props.필드명 해야된다. 나는 클래스까지는 알 필요 없을 것 같아....
    return (
        <div className="App">
            <div className="container-fluid">
                <div className="row justify-content-center m-4">
                    <h1 className="text-center">Seunghan's Shop</h1>
                </div>
                <div className="card">
                    <div className="row">
                        <div className="col-md-8 mt-4 d-flex flex-column align-items-start p-3 pt-0">
                            <ProductList products={products} onAddClick={handleAddClicked}/>
                            <VoucherList vouchers = {vouchers} onAddClick={handleSelectClicked}/>
                        </div>

                        <div className="col-md-4 summary p-4">
                            <Summary items={items} voucher_item = {voucher_item} onOrderSubmit={handleOrderSubmit}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
