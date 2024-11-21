import React, { useContext } from "react";
import "./foodDisplay.css";
import { Storecontext } from "../../context/Storecontext";
import FoodItem from "../foodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(Storecontext);
  return (
    <>
      <div className="food-display" id="food-display">
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
          {food_list.map((item, index) => {
            if (category === "All" || category === item.category) {
              return (
                <>
                  <FoodItem
                    key={index}
                    name={item.name}
                    img={item.image}
                    price={item.price}
                    des={item.description}
                    category={index.category}
                  />
                </>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default FoodDisplay;