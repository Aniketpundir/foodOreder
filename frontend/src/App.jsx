// import React, { useEffect, useState, useContext } from "react";
// import Layout from "./components/Layout/Layout";
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
//   Navigate,
// } from "react-router-dom";
// import Cart from "../Pages/Cart/Cart";
// import Home from "../Pages/Home/Home";
// import PlaceOrder from "../Pages/Placeorder/PlaceOrder";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import Exploremenu from "./components/Exploremenu/Exploremenu";
// import RestaurentAddF from "./components/RestaurentAdd/RestaurentAddFolder/RestaurentAddF";
// import AddItem from "./components/RestaurentAdd/RestaurentAdminPortal/AddItem/AddItem";
// import Layout1 from "./components/RestaurentAdd/Layoyt1";
// import MenuList from "./components/RestaurentAdd/RestaurentAdminPortal/MenuList/MenuList";
// import OrderList from "./components/RestaurentAdd/RestaurentAdminPortal/OrderList/OrderList";

// import RestaurentAdd from "./components/RestaurentAdd/RestaurentAdd";
// import StoreContextProvider, { Storecontext } from "./context/Storecontext";
// import MenuPage from "./components/MenuPage/MenuPage";
// import MyOrder from "../Pages/Myorder/MyOrder";
// import OutForDelivery from "../src/components/RestaurentAdd/RestaurentAdminPortal/OrderList/OutForDelivery/OutForDelivery";
// import Delivered from "./components/RestaurentAdd/RestaurentAdminPortal/OrderList/Delivered/Delivered";

// const ProtectedRoute = ({ children }) => {
//   const { isLoggedIn } = useContext(Storecontext);

//   return isLoggedIn ? children : <Navigate to="/" />;
// };

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element=<Layout />>
//       <Route path="" element=<Home /> />
//       <Route path="/cart" element={<Cart />} />

//       <Route path="/placeorder" element={<PlaceOrder />} />
//       <Route path="/AddRestaurent" element={<RestaurentAddF />} />
//       <Route path="/AddRestaurent" element={<RestaurentAdd />} />
//       <Route
//         path="Layout1"
//         element={
//           <ProtectedRoute>
//             <Layout1 />
//           </ProtectedRoute>
//         }
//       >
//         <Route path="Add_item" element={<AddItem />} />
//         <Route path="Your_Menu" element={<MenuList />} />
//         <Route path="new_order" element={<OrderList />} />
//         <Route path="order-out-for-delivery" element={<OutForDelivery />} />
//         <Route path="order-Delivered-list" element={<Delivered />} />
//       </Route>
//       <Route path="/menu" element={<MenuPage />}>
//         <Route path="/menu/:id" element={<MenuPage />} />
//       </Route>
//       <Route path="/Your_Order" element={<MyOrder />} />
//     </Route>
//   )
// );

// const App = () => {
//   useEffect(() => {
//     AOS.init({
//       offset: 100,
//       duration: 600,
//       easing: "ease-in-sine",
//       delay: 100,
//     });
//     AOS.refresh();
//   }, []);

//   return (
//     <>
//       <StoreContextProvider>
//         <div className="app">
//           <RouterProvider
//             router={router}
//             future={{ v7_startTransition: true }}
//           />
//         </div>
//       </StoreContextProvider>
//     </>
//   );
// };

// export default App;

import React, { useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AOS from "aos";
import Layout from "./components/Layout/Layout";
import Cart from "../Pages/Cart/Cart";
import Home from "../Pages/Home/Home";
import PlaceOrder from "../Pages/Placeorder/PlaceOrder";
import RestaurentAddF from "./components/RestaurentAdd/RestaurentAddFolder/RestaurentAddF";
import RestaurentAdd from "./components/RestaurentAdd/RestaurentAdd";
import StoreContextProvider, { Storecontext } from "./context/Storecontext";
import MenuPage from "./components/MenuPage/MenuPage";
import MyOrder from "../Pages/Myorder/MyOrder";
import Layout1 from "./components/RestaurentAdd/Layoyt1";
import AddItem from "./components/RestaurentAdd/RestaurentAdminPortal/AddItem/AddItem";
import MenuList from "./components/RestaurentAdd/RestaurentAdminPortal/MenuList/MenuList";
import OrderList from "./components/RestaurentAdd/RestaurentAdminPortal/OrderList/OrderList";
import OutForDelivery from "./components/RestaurentAdd/RestaurentAdminPortal/OrderList/OutForDelivery/OutForDelivery";
import Delivered from "./components/RestaurentAdd/RestaurentAdminPortal/OrderList/Delivered/Delivered";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(Storecontext);
  return isLoggedIn ? children : <Navigate to="/" />;
};

const App = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 600,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <StoreContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="cart/:id" element={<Cart />} />
            <Route path="placeorder" element={<PlaceOrder />} />
            <Route path="AddRestaurent" element={<RestaurentAddF />} />
            <Route path="AddRestaurent" element={<RestaurentAdd />} />
            <Route path="menu" element={<MenuPage />} />
            <Route path="menu/:id" element={<MenuPage />} />
            <Route path="Your_Order" element={<MyOrder />} />

            <Route
              path="Layout1"
              element={
                <ProtectedRoute>
                  <Layout1 />
                </ProtectedRoute>
              }
            >
              <Route path="Add_item" element={<AddItem />} />
              <Route path="Your_Menu" element={<MenuList />} />
              <Route path="new_order" element={<OrderList />} />
              <Route
                path="order-out-for-delivery"
                element={<OutForDelivery />}
              />
              <Route path="order-Delivered-list" element={<Delivered />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </StoreContextProvider>
  );
};

export default App;
