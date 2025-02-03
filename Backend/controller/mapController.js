import addressModel from "../models/addressModel.js";
import restroModel from "../models/restroModel.js";
import fetch from "node-fetch";

const api_key = process.env.apiKey;
const url = "https://api.openrouteservice.org/v2/matrix/driving-car";

const calculateDistance = async (origin, destination) => {
  const requestBody = {
    locations: [origin, ...destination.map((i) => i.coordinates)], // Add origin first, followed by destinations
    metrics: ["distance", "duration"], // Get distance and duration
    sources: [0], // Index of the origin (first coordinate)
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: api_key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    // Distances from origin to destinations
    const proceededData = data.distances[0]
      .slice(1)
      .filter((v) => v <= 1000000)
      .map((itr, index) => ({
        name: destination[index].name,
        _id: destination[index]._id,
        address: destination[index].address,
        image: destination[index].image,
        distance: Math.floor(itr / 100) / 10,
      }));
    return proceededData;
  } catch (error) {
    console.error("Error calculating distance:", error);
    return null;
  }
};

// const nearRestro = async (req, res) => {
//     try{
//     const userAddress = await addressModel.findOne({ userId: req.body.userId });
//     const origin = [userAddress.longi, userAddress.lati];
//     const restros = await restroModel.find({ 'address.district': userAddress.district, status: 3 });
//     if(restros.length === 0){
//         console.log(restros)
//         res.json({success:false,message:"no restro found"})
//     }
//     else{
//     const coordinatesArray = await restros.map((restros) => ({
//         coordinates: [restros.address.longi, restros.address.lati],
//         name: restros.name
//     }))
//     const data = await calculateDistance(origin, coordinatesArray);
//     const dataSorted = data.sort((a, b) => b.distance - a.distance).reverse();

//     res.json({ success: true, data: dataSorted });}
// }catch{
//     res.json({success:false,message:"something went wrong"})
// }

// }

const nearRestro = async (req, res) => {
  try {
    const origin = [req.body.longi, req.body.lati];
    const district = req.body.district;
    console.log(req.headers);
    const restros = await restroModel.find({
      "address.district": district,
      status: 3,
    });
    if (restros.length === 0) {
      console.log(restros);
      res.json({ success: false, message: "no restro found" });
    } else {
      const coordinatesArray = await restros.map((restros) => ({
        coordinates: [restros.address.longi, restros.address.lati],
        name: restros.name,
        _id: restros._id,
        address: restros.address,
        image: restros.image,
      }));
      const data = await calculateDistance(origin, coordinatesArray);
      const dataSorted = data.sort((a, b) => b.distance - a.distance).reverse();

      res.json({ success: true, data: dataSorted });
    }
  } catch {
    res.json({ success: false, message: "something went wrong" });
  }
};

export { nearRestro };
