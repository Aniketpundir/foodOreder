import { createContext, useState, useEffect } from "react";
import { food_list } from "../assets/assets";
import axios from "axios";
import { useParams } from "react-router-dom";
import { use } from "react";

export const Storecontext = createContext(null);

const StoreContextProvider = (props) => {
  //Add to cart funtion
  const [district, setDistrict] = useState();
  const [lati, setLatitude] = useState();
  const [longi, setLongitude] = useState();
  const [cartItems, setCartItems] = useState({});
  const [restroRes, setRestroRes] = useState([]);
  const [cartItem, setCartItem] = useState([]);
  // const url = "http://localhost:3000";
  const url = "https://backend-food-order-ige0.onrender.com";
  const [forLoginToken, setForLoginToken] = useState(" ");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [menu, setMenu] = useState([]);
  let amount = 0;

  const addToCart = async (itemId, restroId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [restroId]: { quantity: (prev[itemId]?.[restroId]?.quantity ?? 0) + 1 },
      },
    }));

    // console.log("Updated Cart Items:", updatedCart);
    const tokens = localStorage.getItem("token");

    if (tokens) {
      const res = await axios.post(
        url + "/api/cart/add",
        { itemId: itemId, restroId: restroId },
        { headers: { token: tokens } }
      );
      // console.log(res);
    }
  };

  const removeFromCart = async (itemId, restroId) => {
    setCartItems((prev) => {
      const currentQuantity = prev[itemId]?.[restroId]?.quantity ?? 0;
      const updatedQuantity = Math.max(currentQuantity - 1, 0);

      return {
        ...prev,
        [itemId]: {
          ...prev[itemId],
          [restroId]: { quantity: updatedQuantity },
        },
      };
    });

    const tokens = localStorage.getItem("token");

    if (tokens) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId: itemId },
        { headers: { token: tokens } }
      );
    }
  };

  //End add to cart

  const fetchCart = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(url + "/api/cart/get", null, {
        headers: { token: token },
      });

      setCartItem(res.data.data);
      setMenu(res.data.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  {
    cartItem.map((item, index) => {
      let total = item.price * item.quantity;
      amount = amount + total;
      return amount;
    });
  }

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("tokens")
  );
  const [tokens, setTokens] = useState(localStorage.getItem("tokens") || "");

  const login = (tokens) => {
    localStorage.setItem("tokens", tokens);
    setTokens();
    setIsLoggedIn(true);
  };

  const logout1 = () => {
    localStorage.removeItem("tokens");
    setTokens("");
    setIsLoggedIn(false);
  };

  const location = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLatitude(latitude);
          setLongitude(longitude);
          distr(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    const distr = async (latitude, longitude) => {
      let apiEndPoint = "https://api.opencagedata.com/geocode/v1/json";
      let apikey = "416911d3a90940a6ba7ba4f7aaaa402e";

      const query = `${latitude},${longitude}`;
      const apiUrl = `${apiEndPoint}?key=${apikey}&q=${query}&pretty=1`;

      try {
        const res = await axios(apiUrl);
        const data = res.data;
        const dist = data.results[0].components.state_district;
        setDistrict(dist);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  };

  const userLocation = async (e = null) => {
    if (e) e.preventDefault();
    try {
      let newUrl = url;
      newUrl += "/api/restro/near";

      const dataToSend = {
        district: district,
        lati: lati,
        longi: longi,
      };

      const res = await axios.post(newUrl, dataToSend);
      if (res.data.success) {
        setDistrict("");
        setLatitude("");
        setLongitude("");
      } else {
        // alert(res.data.message);
      }
      setRestroRes(res.data.data);
    } catch {
      setRestroRes([]);
    }
  };
  useEffect(() => {
    location();
  }, []);

  useEffect(() => {
    if (district && lati && longi) {
      userLocation();
    }
  }, [district, lati, longi]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    // getTotalCartAmount,
    url,
    forLoginToken,
    setForLoginToken,
    location,
    userLocation,
    restroRes,
    token,
    setToken,
    setMenu,
    menu,
    cartItem,
    setCartItem,
    fetchCart,
    amount,
    district,

    isLoggedIn,
    tokens,
    setTokens,
    login,
    logout1,
  };

  return (
    <Storecontext.Provider value={contextValue}>
      {props.children}
    </Storecontext.Provider>
  );
};

export default StoreContextProvider;
