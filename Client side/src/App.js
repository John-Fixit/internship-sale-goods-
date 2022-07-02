import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
function App() {
  useEffect(() => {
    getApi()
  }, [])
  const [quantity, setquantity] = useState([])
  const [customername, setcustomername] = useState('')
  const [numberOfGood, setnumberOfGood] = useState('')
  const [itemIndex, setitemIndex] = useState('')
  const [message, setmessage] = useState('')
  const [status, setstatus] = useState('')
  const [qtyRemains, setqtyRemains] = useState()
  const [disable, setdisable] = useState('d-block')
  const apiLink = 'http://localhost:4000'
  const priceLink = 'http://localhost:4000/price'
  const getApi = (() => {
    axios.get(apiLink).then((res) => {
      let goods = res.data.quantity
      setquantity(goods)
      console.log(quantity);
    }).catch((err) => {
      console.log(`there's an error`);
    })
  })
  const modal = (index) => {
    setitemIndex(index);
  }
  const purchase = () => {
    let index = itemIndex
    let userQuantity = quantity[index].name
    let qtyAvailable = quantity[index].qty
    let goodPrice = quantity[index].price
    let userDetail = { customername, userQuantity, qtyAvailable, numberOfGood }
    axios.post(priceLink, userDetail).then((res) => {
      const responseFromServer = res.data
      setmessage(responseFromServer.message)
      setstatus(responseFromServer.status)
      setcustomername('')
      setnumberOfGood('')
    })
  }
  return (
    <>
      <div className='container mt-5'>

        <table className='table table-bordered'>
          <tr>
            <th>Name of quantity</th>
            <th>quantity available</th>
            <th>Price of quantity</th>
            <th className='text-center'>Buy</th>
          </tr>
          {
            quantity.map((items, index) => (
              <tr key={index}>
                <td>
                  {items.name}
                </td>
                <td>
                  {items.qty}
                </td>
                <td>
                  {items.price}
                </td>
                <td>
                  <button type="button" class="btn bg-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => modal(index)}>
                    Buy
                  </button>
                  <div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">Please fill in the below fields </h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          <div className='form'>
                            <input type='number' className='form-control mt-3 py-2' placeholder='How many quantity do you want to purchase' onChange={(e) => setnumberOfGood(e.target.value)} />
                            <input type='text' className='form-control mt-3 py-2' placeholder='Please supply your name here' onChange={(e) => setcustomername(e.target.value)} />
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                          <button type="button" class="btn btn-primary" onClick={() => purchase(index)}>purchase</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))
          }
        </table>
        {
         status ? <div >{message}</div> : <div >{message}</div>

       }
      </div>
    </>
  )
}

export default App