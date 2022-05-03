import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import React, {useEffect, useState} from 'react';
import {ProductList} from "./components/ProductList";
import {Summary} from "./components/Summary";
import axios from "axios";

function App() {
  // 왼쪽 -> 초기값을 담고 있는 state 변수, 오른쪽 -> state 값을 업데이트 해주는 함
  const [products, setProducts] = useState([
      // 초기값 설정
    {productId: 'uuid-1', productName: '콜롬비아 커피 1', category: 'zjvlqls', price: 5000},
    {productId: 'uuid-2', productName: '아싸라비아 커피', category: '에하라디야!', price: 6000},
    {productId: 'uuid-3', productName: '메잌미 해피 커피 1', category: '우호호호하ㅇ', price: 8000}
  ]);

  const [items, setItems] = useState([]);

  const handleAddClicked = productId => {
    const product = products.find(v => v.productId === productId)
    const found = items.find(v => v.productId === productId);
    const updatedItems =
        found ? items.map(v => (v.productId === productId) ? {
          ...v,
          count: v.count + 1
        } : v) : [...items, {...product, count: 1}]
    // setItems state 함수를 처리하는 것은 비동기적 함수가 끝나면 모든 state 함수를 모아 실행
    // state 값을 update 할 때마다 컴포넌트를 새로 실행 시키면서 UI를 업데이트한다. 다시 실행시키면 변수 초기화 지역변수 같은것은 초기화됨? state 말고
    setItems(updatedItems);
  }

  // 렌더링이 끝난 이후에 이게 실행된다.
  // component가 렌더링 될때마다 react에게 어떤 일을 실행시켜 달라고 할 수 있다.
  useEffect(() => {
    // 비동기 작업들은 다 여기서 해야한다.
    //    이때 서버에서 뭘 가져오든지 한다.
    axios.get('http://localhost:8080/api/v1/products')
        .then(v => setProducts((v.data)))
  }, []);


  const handleOrderSubmit = (order) => {
    if (items.length === 0) {
      alert("아이템을 추가해 주세요!")
    } else {
      axios.post("http://localhost:8080/api/v1/orders", {
        email: order.email,
        address: order.address,
        postcode: order.postcode,
        orderItems: items.map(v => ({
          productId: v.productId,
          category: v.category,
          price: v.price,
          quantity: v.quantity
        }))
      }).then(v => alert("주문이 정상적으로 접수되었습니다"
          , e => {
            alert("서버 장애");
            console.error(e);
          }))
    }
  }

  return (
      <div className="App">
        <div className="container-fluid">
          <div className="row justify-content-center m-4">
            <h1 className="text-center">Grids & Circle</h1>
          </div>
          <div className="card">
            <div className="row">
              <div className="col-md-8 mt-4 d-flex flex-column align-items-start p-3 pt-0">
                <ProductList products={products} onAddClick={handleAddClicked}/>
              </div>
              <div className="col-md-4 summary p-4">
                <Summary items={items} onOrderSubmit={handleOrderSubmit}/>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
