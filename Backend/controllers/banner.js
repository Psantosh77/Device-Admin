import banner_setting from "../models/bannerModel.js";

export const postBanner = async (req, res) => {
  const { image, position, status } = req.body;



  try {
  
    const banner = await banner_setting.findAll();
    if (banner.length > 0) {
      await banner_setting.update(
        {
          image: image,
          position: position,
          status: status,
        },
        {
          where: {},
        }
      );
      return res
        .status(200)
        .send({ msg: "image loaded successfully", status: status });
    } else {
      await banner_setting.create({
        image: image,
        position: position,
        status: status,
      });
    }
    return res
      .status(200)
      .send({ msg: "image loaded successfully", status: status });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

export const getBanner = async (req, res) => {
  try {
    const banner = await banner_setting.findAll();
    if (banner) {
      res
        .status(200)
        .send({ status: true, msg: "send successfully", data: banner });
    }
  } catch (err) {
    res.status(500).send({ status: false, msg: "something wrong " });
  }
};
