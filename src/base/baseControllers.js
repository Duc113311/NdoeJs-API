const BaseServices = require("../../src/base/baseServices.js");

const BaseController = {};


// Get ALl Data entity-"req.param"
BaseController.getAllEntitysContr = async (req, res) => {
  try {
    const entity=req.params.userName
    const listEntitys = await BaseServices.getAllEntitysService(entity);
    console.log(listEntitys);
    res.status(200).json({
        users: [],
      });
  } catch (error) {
    // res.status(400);
  }
};

module.exports = BaseController;
