const db = require("../config/config.js");

const BaseServices = {};

BaseServices.getAllEntitysService = async (req) => {
  const user = `${req}`;
  console.log("sdsd", user);

  const entitys = db.collection(user.toString());
  const listEntitys = await entitys.get();
  const datas = listEntitys.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  console.log(datas);
  return datas;
};

module.exports = BaseServices;
