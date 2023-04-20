import CountriesSelect from "../models/CountriesModel.js";
import StateSelect from "../models/StateModel.js"
import CitySelect from "../models/CityModel.js"

export const Countries = async(req, res) => {

  try {
      const countries = await CountriesSelect.findAll();

      res.status(200).send(countries);
  } catch (error) {
      console.log(error);
      res.status(500).send({ msg:"sever error"})
  }

}

export const State = async(req, res) => {

  try {
      const state = await StateSelect.findAll({
        where:{
         country_id : req.params.country_id
      }
      });
      
      res.status(200).send(state);
  } catch (error) {
      console.log(error);
      res.status(500).send({ msg:"sever error"})
  }

}

export const City = async(req, res) => {

  try {
      const city = await CitySelect.findAll({
        where:{
         state_id : req.params.state_id
      }
      });
      
      res.status(200).send(city);
  } catch (error) {
      console.log(error);
      res.status(500).send({ msg:"sever error"})
  }

}
