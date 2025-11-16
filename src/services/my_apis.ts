import axios from "axios";

const getBreeds = async () => {
  const response = await axios.get("https://dogapi.dog/api/v2/breeds");
  return response.data; 
};

export  {getBreeds}

