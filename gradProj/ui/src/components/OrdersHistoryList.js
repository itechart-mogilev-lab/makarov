import React from "react";
import OrderFromHistoryContainer from "../containers/OrderFromHistoryContainer";

const OrdersHistoryList = ({ bookings }) => {
  if (!bookings["0"]) {
    return <p>Bookings is not found</p>;
  } else {
    return bookings.map(booking => (
      <OrderFromHistoryContainer booking={booking} key={booking._id} />
    ));
  }
};

export default OrdersHistoryList;