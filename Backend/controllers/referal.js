import referralSetting from "../models/ReferalModel.js";

export const updatereferal = async (req, res) => {
  try {
    const referral = await referralSetting.findAll();
      if (referral.length > 0) {
        for (var key in req.body) {
          const referral = await referralSetting.update(
            { level: key, value: req.body[key] },
            { where: { level: key } }
          );
        }
        res.status(201).send({ status: true, msg: "referral updated" });
      } else {
        for (var key in req.body) {
          const referral = await referralSetting.create({
            level: key,
            value: req.body[key],
          });
        }
        res.status(200).send({ status: true, msg: "referral created" });
      }
    
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

export const getReferral = async(req, res) => {
try{
    const referral = await referralSetting.findAll();
    if(referral){
        res.status(200).send({ status: true, msg: "send successfully" ,data: referral})
    }
}catch(err){
    res.status(500).send({ status: false, msg: "something wrong "})
}
   

}