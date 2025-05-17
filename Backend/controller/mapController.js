// import addressModel from "../models/addressModel.js";
// import restroModel from "../models/restroModel.js";
// import fetch from "node-fetch";

// const api_key = process.env.apiKey;
// const url = "https://api.openrouteservice.org/v2/matrix/driving-car";

// const calculateDistance = async (origin, destination) => {
//   const requestBody = {
//     locations: [origin, ...destination.map((i) => i.coordinates)], // Add origin first, followed by destinations
//     metrics: ["distance", "duration"], // Get distance and duration
//     sources: [0], // Index of the origin (first coordinate)
//   };
//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         Authorization: api_key,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(requestBody),
//     });
//     console.log(response);
//     const data = await response.json();
//     console.log(data);

//     // Distances from origin to destinations
//     const proceededData = data.distances[0].slice(1).filter((v) => v <= 11000).map((itr, index) => ({
//         name: destination[index].name,
//         _id: destination[index]._id,
//         address: destination[index].address,
//         image: destination[index].image,
//         distance: Math.floor(itr / 100) / 10,
//       }));
//     return proceededData;
//   } catch (error) {
//     console.error("Error calculating distance:", error);
//     return null;
//   }
// };

// // const nearRestro = async (req, res) => {
// //     try{
// //     const userAddress = await addressModel.findOne({ userId: req.body.userId });
// //     const origin = [userAddress.longi, userAddress.lati];
// //     const restros = await restroModel.find({ 'address.district': userAddress.district, status: 3 });
// //     if(restros.length === 0){
// //         console.log(restros)
// //         res.json({success:false,message:"no restro found"})
// //     }
// //     else{
// //     const coordinatesArray = await restros.map((restros) => ({
// //         coordinates: [restros.address.longi, restros.address.lati],
// //         name: restros.name
// //     }))
// //     const data = await calculateDistance(origin, coordinatesArray);
// //     const dataSorted = data.sort((a, b) => b.distance - a.distance).reverse();

// //     res.json({ success: true, data: dataSorted });}
// // }catch{
// //     res.json({success:false,message:"something went wrong"})
// // }

// // }

// const nearRestro = async (req, res) => {
//   try {
//     const origin = [req.body.longi, req.body.lati];
//     const district = req.body.district;
//     const restros = await restroModel.find({
//       "address.district": district,
//       status: 3,
//     });
//     if (restros.length === 0) {
//       console.log(restros);
//       res.json({ success: false, message: "no restro found" });
//     } else {
//       const coordinatesArray = await restros.map((restros) => ({
//         coordinates: [restros.address.longi, restros.address.lati],
//         name: restros.name,
//         _id: restros._id,
//         address: restros.address,
//         image: restros.image,
//       }));
//       const data = await calculateDistance(origin, coordinatesArray);
//       const dataSorted = data.sort((a, b) => b.distance - a.distance).reverse();

//       res.json({ success: true, data: dataSorted });
//     }
//   } catch {
//     res.json({ success: false, message: "something went wrong" });
//   }
// };

// export { nearRestro };

// // osrm

import addressModel from "../models/addressModel.js";
import restroModel from "../models/restroModel.js";
import fetch from "node-fetch";

const api_key = process.env.apiKey;
const orsUrl = "https://api.openrouteservice.org/v2/matrix/driving-car"; // OpenRouteService URL
const osrmUrl = "http://router.project-osrm.org/table/v1/driving/"; // OSRM URL

// Function to calculate distance using OpenRouteService (ORS)
const calculateDistanceORS = async (origin, destination) => {
  const requestBody = {
    locations: [origin, ...destination.map((i) => i.coordinates)], // Add origin first, followed by destinations
    metrics: ["distance", "duration"], // Get distance and duration
    sources: [0], // Index of the origin (first coordinate)
  };

  try {
    const response = await fetch(orsUrl, {
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
      .slice(1) // Skip the origin distance (first element)
      .filter((v) => v <= 41000) // Filter distances less than or equal to 11 km
      .map((itr, index) => ({
        name: destination[index].name,
        _id: destination[index]._id,
        address: destination[index].address,
        image: destination[index].image,
        distance: Math.floor(itr / 100) / 10, // Convert meters to kilometers
      }));

    return proceededData;
  } catch (error) {
    console.error("Error calculating distance using ORS:");
    return null;
  }
};

// Function to calculate distance using OSRM
const calculateDistanceOSRM = async (origin, destination) => {
  const coordinates = [origin, ...destination.map((i) => i.coordinates)].join(
    ";"
  );

  try {
    const response = await fetch(
      `${osrmUrl}${coordinates}?annotations=distance&sources=0`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    console.log(data);
    // Check if distance data exists in the response
    if (data.distances && data.distances[0]) {
      const proceededData = data.distances[0]
        .slice(1) // Skip the origin distance (first element)
        .filter((v) => v <= 41000) // Filter distances less than or equal to 11 km
        .map((itr, index) => ({
          name: destination[index].name,
          _id: destination[index]._id,
          address: destination[index].address,
          image: destination[index].image,
          distance: Math.floor(itr / 100) / 10, // Convert meters to kilometers
        }));
      return proceededData;
    } else {
      throw new Error("No distance data found in the OSRM response");
    }
  } catch (error) {
    console.error("Error calculating distance using OSRM:", error);
    return null;
  }
};

// Main function to find nearby restaurants with fallback between ORS and OSRM
const nearRestro = async (req, res) => {
  try {
    console.log(req.body.longi, req.body.lati);
    const origin = [req.body.longi, req.body.lati];
    const district = req.body.district;
    const restros = await restroModel.find({
      "address.district": district,
      status: 3,
    });

    if (restros.length === 0) {
      return res.json({ success: false, message: "No restaurants found" });
    }

    const coordinatesArray = restros.map((restro) => ({
      coordinates: [restro.address.longi, restro.address.lati],
      name: restro.name,
      _id: restro._id,
      address: restro.address,
      image: restro.image,
    }));

    // Try to calculate distances using OpenRouteService first
    let data = await calculateDistanceORS(origin, coordinatesArray);

    if (!data) {
      console.log("ORS failed, trying OSRM...");
      // If ORS fails, try to calculate distances using OSRM
      data = await calculateDistanceOSRM(origin, coordinatesArray);
    }

    if (data) {
      const dataSorted = data.sort((a, b) => a.distance - b.distance); // Sort by ascending distance
      res.json({ success: true, data: dataSorted });
    } else {
      res.json({ success: false, message: "Error calculating distances" });
    }
  } catch (error) {
    console.error("Error in nearRestro:", error);
    res.json({ success: false, message: "Something went wrong" });
  }
};

export { nearRestro };
