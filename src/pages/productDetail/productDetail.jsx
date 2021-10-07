import React, { useState, useEffect } from "react";
import "./productDetail.scss";
import Navbar from "../../components/navbar/navbar";
import { Segment, Button, Table } from "semantic-ui-react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
// import 'react-multi-carousel/lib/styles.css';

const axios = require("axios");


const ProductDetail = (props) => {
  const [data, setData] = useState([]);
  const [sameProduct, setSameProduct] = useState([]);
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const location = useLocation();
  const id = location.pathname?.split("product/")[1];
  // const id = location.pathname?.replace('product/', '');

  const moveToBuy = () => {
    history.push(`/buy/${id}`);
  };

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
        console.log("data detail", data);
        setData(data);
        setImage(data.images[0]);
        fetchSameProduct(data);
      })
      .catch(function (error) {
        setLoading(false);
        console.log("Error: ", error);
      });
  };
  const fetchSameProduct = (data) => {
    axios
      .get(
        `https://lap-center.herokuapp.com/api/product?productBrand=${data?.brand}&pageSize=10&pageNumber=1`
      )
      .then(function (response) {
        console.log("product more: ", response.data.products);
        setSameProduct(response.data.products);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };
  const onChooseImage = (image) => {
    setImage(image);
  };

  return (
    <div>
      <Navbar />
      <Segment className="detail-segment-container">
        <div className="detail-product-name">{data.name} tên</div>
        <div className="detail-status">
          <p>Tình trạng: Còn hàng</p>
          <p style={{ marginLeft: "20px" }}>Bảo hành: 24 tháng</p>
        </div>
        <hr style={{ width: "80%" }} />
        <div className="detail-container">
          <div className="detail-left">
          <img
              className="detail-image"
              src={image}
              alt={image}
            />
            <div className="detail-list-images">
              {data?.images?.map((item) => (
                <img className="detail-image-small" src={item} alt="" onClick={() => onChooseImage(item)} />
              ))}
            </div>
          </div>
          <div className="detail-main">
            <p>
              Giá bán: <span>{data.price} VND</span>
            </p>
            <div className="detail-discount">
              <div className="discount-top">
                <p>Khuyến mãi - Quà tặng</p>
              </div>
              <div className="discount-content">something</div>
            </div>
            <div className="detail-buy">
              <Button color="red">MUA NGAY</Button>
              <p>
                GỌI NGAY <a href="tel:+84969442510"> 0969 44 2510 </a> ĐỂ GIỮ
                HÀNG
              </p>
            </div>
          </div>
          <div className="detail-right">
            <div>
              <span>Điện thoại tư vấn - Đặt hàng</span>
              <ul>
                <li>Kim Lý - 0904 555 666</li>
                <li>Huỳnh Lệ - 0345 789 789</li>
                <li>Văn Dũng - 0876 567 678</li>
              </ul>
            </div>
            <div>
              <span>Địa chỉ mua hàng</span>
              <ul>
                <li>152 ABC, Thanh Khê, TP. Đà Nẵng</li>
                <li>162 ABC, Thanh Khê, TP. Đà Nẵng</li>
                <li>172 ABC, Thanh Khê, TP. Đà Nẵng</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="specifications">
        <Table celled fixed singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Phần cứng</Table.HeaderCell>
                <Table.HeaderCell>Thông số kĩ thuật</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>Model</Table.Cell>
                <Table.Cell>{data?.model}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>CPU</Table.Cell>
                <Table.Cell>{data?.cpu}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>RAM</Table.Cell>
                <Table.Cell>{data?.ram}</Table.Cell> 
              </Table.Row>
              <Table.Row>
                <Table.Cell>Ổ cứng</Table.Cell>
                <Table.Cell>{data?.disk}</Table.Cell> 
              </Table.Row>
              <Table.Row>
                <Table.Cell>Card đồ họa</Table.Cell>
                <Table.Cell>{data?.card}</Table.Cell> 
              </Table.Row>
              <Table.Row>
                <Table.Cell>Màn hình</Table.Cell>
                <Table.Cell>{data?.monitor}</Table.Cell> 
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </Segment>
    </div>
  );
};
export default ProductDetail;
