import PackageModel from "../models/packageModel.js";

export const packages = async (req, res) => {
  const { title, price, mpp, desc, status } = req.body;
  try {
    await PackageModel.create({
      title: title,
      price: price,
      mpp: mpp,
      description: desc,
      status:status,
    });

    return res.status(200).send({ status: true, msg: "package created" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};


export const getpackages = async (req, res) => {
  try {
    const packages = await PackageModel.findAll();
    if (packages) {
      res
        .status(200)
        .send({ status: true, msg: "send successfully", data: packages });
    }
  } catch (err) {
    res.status(500).send({ status: false, msg: "something wrong " });
  }
};

export const updatePackage =async (req, res) => {
     const { id, title, price, mpp, desc , status } = req.body;
    
    try{
         await PackageModel.update({
            title: title,
            price: price,
            mpp: mpp,
            description: desc,
            status: status
        },{
            where:{
                id:id
            }
        }
        )
        return res.status(201).send({status: true , message: 'Package updated successfully'})
    }
    catch(err){
        res.status(500).json({ message: "something went wrong" });
        console.log(err);
    }


}

