import { validationResult } from "express-validator";
import db from "../config/db.js";


// Utility to calculate Haversine distance
const toRadians = (deg) => deg * Math.PI / 180;
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of Earth in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};


// add school
const addSchool = async(req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {name,address,latitude,longitude} = req.body;
    try {
        const [result] = await db.execute('insert into schools (name,address,latitude,longitude) values (?,?,?,?)'
        ,[name,address,latitude,longitude])
        res.status(201).json({message:'School added successfully' , schoolId :result.insertId})
    } catch (error) {
        res.status(500).json({ error: error.message });
        
    }

}

// listing shorted school based on distance
const getNearbySchools = async(req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {latitude:userlat ,longitude:userlong} = req.query;

    try {
        const [result] = await db.execute("select * from schools ");
        const shortedSchool = result.map((school)=>({
            ...school,distance:haversineDistance(userlat,userlong,school.latitude,school.longitude)
        })).sort((a,b)=>a.distance - b.distance);
        
        res.status(200).json({message:'Schools listed successfully',schools_nearest_to_your_location:shortedSchool})
    } catch (error) {
        console.log(error);
        
    }

}

export {addSchool,getNearbySchools}