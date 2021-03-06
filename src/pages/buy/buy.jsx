import React, { useState, useEffect } from "react";
import "./buy.scss";
import Navbar from "../../components/navbar/navbar";
import {
  Segment,
  Button,
  Input,
  Label,
  Form,
  TextArea,
} from "semantic-ui-react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Buy = () => {
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [data, setData] = useState([]);
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [totalMoney, setTotalMoney] = useState(data.price);

  const location = useLocation();
  const id = location.pathname?.split("buy/")[1];

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [location]);

  const fetchData = () => {
    setLoading(true);
    let url = `https://lap-center.herokuapp.com/api/product/getProductById/${id}`;
    axios
      .get(url)
      .then(function (response) {
        const data = response.data.response;
        setData(data);
        setImage(data.images[0]);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        console.log("Error: ", error);
      });
  };
  const onChangeQuantity = (method) => {
    if (method === "plus") {
      setQuantity(quantity + 1);
    } else if (quantity === 1) {
      setQuantity(1);
    } else {
      setQuantity(quantity - 1);
    }
  };

  let checkInfo = true;
  if (!customerName || !phoneNumber || !email || !address) checkInfo = true;
  if (customerName && phoneNumber && email && address) checkInfo = false;

  const onChangeInfo = (e, field) => {
    const value = e.target.value;
    switch (field) {
      case "customer":
        setCustomerName(value);
        break;
      case "phone":
        setPhoneNumber(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "address":
        setAddress(value);
        break;
      default:
      // code block
    }
  };

  return (
    <div>
      <Navbar />
      <Segment className="buy-container" loading={loading}>
        <div className="buy-title">
          <p>????? ?????t h??ng</p>
          <span>
            , qu?? kh??ch h??ng vui l??ng ki???m tra s???n ph???m, s??? l?????ng, gi??, m??u s???c
            v?? ??i???n c??c th??ng tin d?????i ????y:
          </span>
        </div>
        <div className="buy-content">
          <div className="buy-header">
            <img className="buy-image" src={image} alt={image} />
            <p>{data.name}</p>
            <div className="quantity">
              <Button icon="minus" onClick={() => onChangeQuantity("minus")} />
              <Input className="inp-quantity" value={quantity} />
              <Button icon="plus" onClick={() => onChangeQuantity("plus")} />
              <h4>{data.price} ??</h4>
            </div>
          </div>
          <hr />
          <div className="buy-total">
            <h3>T???ng ti???n:</h3>
            <p> {data.price * quantity} ??</p>
          </div>
          <div className="user-info">
            <Segment raised>
              <Label as="a" color="red" ribbon>
                Th??ng tin kh??ch h??ng
              </Label>
              <Form className="info-form">
                <Form.Field>
                  <label>T??n kh??ch h??ng</label>
                  <input
                    placeholder="T??n kh??ch h??ng"
                    value={customerName}
                    type="text"
                    onChange={(e) => onChangeInfo(e, "customer")}
                  />
                </Form.Field>
                <Form.Field>
                  <label>S??? ??i???n tho???i</label>
                  <input
                    placeholder="S??? ??i???n tho???i"
                    value={phoneNumber}
                    onChange={(e) => onChangeInfo(e, "phone")}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Email</label>
                  <input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => onChangeInfo(e, "email")}
                  />
                </Form.Field>
                <Form.Field>
                  <label>?????a ch???</label>
                  <TextArea
                    placeholder="?????a ch???"
                  
                    value={address}
                    onChange={(e) => onChangeInfo(e, "address")}
                  />
                </Form.Field>
                <Button color="red" disabled={checkInfo} className="btn-order">
                  ?????t h??ng
                </Button>
              </Form>
            </Segment>
          </div>
        </div>
      </Segment>
    </div>
  );
};
export default Buy;
