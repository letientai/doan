import "./card.scss";
import { Button, Icon, Header, Image, Modal } from "semantic-ui-react";
import React from "react";

const Card = (props) => {
  const item = props.product;
  const [open, setOpen] = React.useState(false)
  return (
    <div className="card-container" onClick={() => {}} key={item.id}>
      <img className="image" src={item.images[0]} />
      <h4 className="name">{item.name}</h4>
      <p className="email d-flex">
        Hãng:{" "}
        <span className="ml-1 text-success font-weight-bold">{item.brand}</span>
      </p>
      <p className="email d-flex name">
        Chip xử lý:{" "}
        <span className="ml-1 text-success font-weight-bold ">{item.cpu}</span>
      </p>
      <p className="email d-flex">
        Price:{" "}
        <span className="ml-1 text-success font-weight-bold">
          {item.price} VND
        </span>
      </p>
      {/* <Button onClick={() => {}} className="custom-btn btn-3">
        <span>
          <Icon name="eye" /> Xem sản phẩm
        </span>
      </Button> */}


      <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button onClick={() => {}} className="custom-btn btn-3">
        <span>
          <Icon name="eye" /> Xem sản phẩm
        </span>
      </Button>}
    >
      <Modal.Header>Chi tiết sản phẩm</Modal.Header>
      <Modal.Content image>
        <Image size='medium' src={item.images[1]} wrapped />
        <Modal.Description>
          <Header>Name: {item.name}</Header>
          <p>Brand: {item.brand}</p>
          <p>Price: {item.price} đ</p>
          <p>Cpu: {item.cpu}</p>
          <p>Ram: {item.ram}</p>
          <p>Disk: {item.disk}</p>
          <p>Card: {item.card}</p>
          <p>Monitor: {item.monitor}</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Close"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
    </div>
  );
};

export default Card;
