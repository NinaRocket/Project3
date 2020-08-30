import axios from "axios";

export default {
  // decodes VIN and returns vehicle information
  getNewVehicle: async function (queryVIN) {
    const queryVehicle = await axios.get(
      `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${queryVIN}?format=json`
    );
    const vehicle = {
      year: queryVehicle.data.ModelYear,
      make: queryVehicle.data.Make,
      model: queryVehicle.data.Model,
      vin: queryVIN,
    };
    return vehicle;
  },

  // gets recall information from NHTSA database and normalized data for front end use
  getRecallInfo: async function (year, make, model) {
    const recallData = await axios.get(
      `https://one.nhtsa.gov/webapi/api/Recalls/vehicle/modelyear/${year}/make/${make}/model/${model}?format=json`
    );
    const recallInfo = {
      recalls: recallData.data.results.map((element) => {
        return {
          NHTSACampaignNumber: element.NHTSACampaignNumber,
          summary: element.Summary,
        };
      }),
    };
    return recallInfo;
  },
  login: (email, password) => {
    return axios.post("/api/user/login", {
      email,
      password,
    });
  },
  signup: (userInfo) => {
    return axios.post("/api/user/signup", userInfo);
  },
  
  // VEHICLE ROUTES
  // get all vehicles by owner
  getVehicle: (id) => {
    return axios.get("/api/vehicle" + id);
  },
  // add a vehicle
  addvehicle: (vehicleInfo) => {
    return axios.post("/api/vehicle");
  },
  // update the vehicle with the given id
  updateVehicle: (id) => {
    return axios.put("/api/vehicle" + id);
  },

  // MAINTENANCE ROUTES:
  getMaintenance: () => {
    
  },
  updateMileage: (mileage) => {
    return axios.put("/api/vehicle", mileage);
  },
  newWarranty: (warrantyInfo) => {
    return axios.post("api/vehicle", warrantyInfo);
  }
};
