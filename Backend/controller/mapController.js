import addressModel from "../models/addressModel.js";
import restroModel from "../models/restroModel.js";
import fetch from "node-fetch";

const api_key = process.env.apiKey;
const url = 'https://api.openrouteservice.org/v2/matrix/driving-car';

const calculateDistance = async (origin, destination) => {
    const requestBody = {
        locations: [origin, ...destination.map((i) => i.coordinates)], // Add origin first, followed by destinations
        metrics: ["distance", "duration"],   // Get distance and duration
        sources: [0]     // Index of the origin (first coordinate)
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': api_key,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();

        // Distances from origin to destinations
        const proceededData = data.distances[0].slice(1).filter((v)=> v <= 11000).map((itr, index) => (
            
            {
                name: destination[index].name,
                distance: Math.floor(itr / 100) / 10
            }))
        return (proceededData);
    }
    catch (error) {
        console.error('Error calculating distance:', error);
        return null;
    }
};

const nearRestro = async (req, res) => {
    const userAddress = await addressModel.findOne({ userId: req.body.userId });
    const origin = [userAddress.longi, userAddress.lati];
    const restros = await restroModel.find({ 'address.district': userAddress.district, status: 3 });

    const coordinatesArray = await restros.map((restros) => ({
        coordinates: [restros.address.longi, restros.address.lati],
        name: restros.name
    }))
    const data = await calculateDistance(origin, coordinatesArray);

    console.log(data);
    const dataSorted = data.sort((a, b) => b.distance - a.distance).reverse();

    res.json({ success: true, data: dataSorted });

}

export { nearRestro };

//const origin = '40.712776,-74.005974'; // Latitude,Longitude of New York
//onst destination = '34.052235,-118.243683'; // Latitude,Longitude of Los Angeles
