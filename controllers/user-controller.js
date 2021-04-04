const Users = require("../models/users");
const { registerValidation, loginValidation } = require("./validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUser = (req, res) => {
  Users.find()
    .then((users) => res.json(users.filter((user) => user._id == req.user.id)))
    .catch((err) => res.status(400).json("Error: " + err));
};

const addUser = async (req, res, next) => {
  
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  const emailExists = await Users.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).send("User has already registered");
  }

  const hashedPassword = await bcrypt.hash(
    req.body.password,
    await bcrypt.genSalt(10),
  );

  const name = req.body.name;
  const email = req.body.email;
  const password = hashedPassword; 

  const newUser = new Users({
    name,    
    email,
    password
  });
  newUser
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error: " + err));
};

const getUserById = (req, res) => {
  const id = req.body.id;
  Users.find({ _id: id }).then((data) => {
    res.status(200).send(data);
  });
};


const userLogin = async (req, res, next) => {
  // console.log("asdas", req.body);
  const email = req.body.email;
  const password = req.body.password;

  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = await Users.findOne({ email: email });
  if (!user) {
    return res.status(400).send("User not registered");
  }
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  const userinfo = {
    name: user.name,
    email: user.email,
    id: user._id,
  };
  const accesstoken = jwt.sign(userinfo, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
  res.status(200).send({ accesstoken: accesstoken });
};

const updateFavList = async (req, res) => {
  // console.log(req.body.mediaId);
  let id = req.body.id;
  let mediaId = req.body.mediaId;
  let temp = [];
  await Users.findOne({ _id: id }, { fav: 1, _id: 0 }).then((data) => {
    // console.log(data.fav);
    temp = data.fav;
  });
  let count = 0;
  temp = temp.filter((el) => {
    // console.log("el", el);
    if (el._id == mediaId._id) {
      count += 1;
    } else {
      return el;
    }
  });
  // console.log("count", count);
  if (count == 0) {
    temp.push(mediaId);
  }
  // console.log("temp", temp);
  Users.findOneAndUpdate({ _id: id }, { fav: temp }).then((data) =>
    res.status(200).json(data.fav),
  );
};


module.exports = { getUser, addUser, userLogin, updateFavList ,getUserById};

