import React, { useContext, useState, useEffect } from "react";
import "./PlaceOrder.css";
import { Storecontext } from "../../src/context/Storecontext";
import axios from "axios";

const PlaceOrder = () => {
  const { amount, cartItem, url } = useContext(Storecontext);
  let restroId = null;
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });

  // ✅ Load Razorpay script once when component mounts
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  // ✅ Get the last restroId from cartItems
  cartItem.map((item) => {
    restroId = item.restroId;
  });

  const token = localStorage.getItem("token");

  const placeholder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    cartItem.map((items) => {
      orderItems.push(items);
    });

    try {
      const orderData = await axios.post(
        url + "/api/order/new",
        {
          restroId: restroId,
          items: orderItems,
          amount: amount,
          address: data,
        },
        {
          headers: { token: token },
        }
      );

      if (orderData.data.success) {
        const razorpayOrder = orderData.data.razorpayOrder;

        const options = {
          key: orderData.data.key,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          name: "Zaykaxpress order",
          order_id: razorpayOrder.id,
          handler: function (response) {
            verifyPayment(response);
          },
        };

        // ✅ Check if Razorpay is loaded
        if (typeof window.Razorpay !== "undefined") {
          const rzp = new window.Razorpay(options);
          rzp.open();
        } else {
          alert("Razorpay SDK failed to load. Please refresh and try again.");
        }
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const verifyPayment = async (response) => {
    try {
      console.log(response);
      const verificationResponse = await axios.post(
        url + "/api/order/verify",
        {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        },
        {
          headers: { token: token },
        }
      );

      const data = verificationResponse.data;
      if (data.success) {
        alert("Payment verified successfully!");
      } else {
        alert("Payment verification failed!");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <form onSubmit={placeholder} className="place-oder">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input
              onChange={onChangeHandler}
              value={data.firstName}
              name="firstName"
              type="text"
              placeholder="First Name"
              required
            />
            <input
              onChange={onChangeHandler}
              value={data.lastName}
              name="lastName"
              type="text"
              placeholder="Last Name"
              required
            />
          </div>
          <input
            onChange={onChangeHandler}
            value={data.email}
            name="email"
            type="email"
            placeholder="E-mail address"
          />
          <input
            onChange={onChangeHandler}
            value={data.street}
            name="street"
            type="text"
            placeholder="Street"
            required
          />
          <div className="multi-fields">
            <input
              onChange={onChangeHandler}
              value={data.city}
              name="city"
              type="text"
              placeholder="City"
              required
            />
            <input
              onChange={onChangeHandler}
              value={data.state}
              name="state"
              type="text"
              placeholder="State"
              required
            />
          </div>
          <div className="multi-fields">
            <input
              onChange={onChangeHandler}
              value={data.pincode}
              name="pincode"
              type="text"
              placeholder="Zip(Pin) code"
              required
            />
            <input
              onChange={onChangeHandler}
              value={data.country}
              name="country"
              type="text"
              placeholder="Country"
              required
            />
          </div>
          <input
            onChange={onChangeHandler}
            value={data.phone}
            name="phone"
            type="text"
            placeholder="Phone"
            required
          />
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>&#x20B9; {amount}</p>
              </div>
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>Free</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>&#x20B9; {amount}</b>
              </div>
            </div>
            <button type="submit">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PlaceOrder;
