import React, { useContext } from "react";
import "./foodDisplay.css";
import { Storecontext } from "../../context/Storecontext";
import FoodItem from "../foodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(Storecontext);

  // const { restaurantId } = useParams();
  // const [menu, setMenu] = useState(null);

  // useEffect(() => {
  //   axios.get(`http://localhost:5000/api/menu/${restaurantId}`)
  //     .then(response => setMenu(response.data))
  //     .catch(error => console.error(error));
  // }, [restaurantId]);

  // if (!menu) return <div>Loading...</div>;

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
                    id={item.id}
                    name={item.name}
                    img={item.image}
                    price={item.price}
                    des={item.description}
                    category={item.category}
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
