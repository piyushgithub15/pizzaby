const User = require("../../Models/User");
const jwtt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const parser = require("cookie-parser");


const createUser = async (req, res) => {
  try {
    const { name, email, mobilenumber, usertype, password } = req.body;

    if (!name || !email || !mobilenumber || !password)
      return res.status(402).send("Required all the details");

    const user = await User.findOne({ email });

    if (user) return res.status(401).send("Email Already Exist");

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
   
    const newUser = await User.create({
      name,
      email,
      mobilenumber,
      usertype,
      password: hashedPassword,
     
    });

    const payload = {
      id: newUser.id,
      email: newUser.email,
    };

    const token = jwtt.sign({ payload }, process.env.REACT_APP_JWT_SECRET_KEY);
    res.cookie("jwt", token, {
      maxAge: 36000000, // 1 hour in milliseconds
      httpOnly: true,
    });

    res.status(201).json({success:true , name:newUser.name, id:newUser.id});
  } catch (error) {
    console.log(error);
    res.status(501).send(error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email);
    console.log(password);

    const user = await User.findOne({ email });
    console.log(user.password);

    if (!user) return res.status(403).send("PLEASE REGISTER FIRST");

    const userPassword = user.password;

    const passwordMatches = await bcrypt.compare(password, userPassword);
    console.log(passwordMatches);

    if (passwordMatches) {
      const payload = {
        id: user.id,
        email: user.email,
      };

      const token = jwtt.sign(
        { payload },
        process.env.REACT_APP_JWT_SECRET_KEY
      );
      res.cookie("jwt", token, {
        maxAge: 36000000, // 1 hour in milliseconds
        httpOnly: true,
      });

      return res.status(201).json({ success: true, name: user.name, id:user.id });
    } else res.status(402).send("TRY WITH CORRECT CREDENTIALS");
  } catch (error) {
    res.status(501).send(error.message);
  }
};

const autoLogin = async (req, res) => {
  const token = req.cookies;
  console.log(token.jwt);
  if (!token) return res.status(401).json({ success: false });

  try {
    const decoded = jwtt.verify(
      token.jwt,
      process.env.REACT_APP_JWT_SECRET_KEY
    ).payload;

    console.log(decoded);
    const userEmail = decoded.email;

    const username = await User.findOne({ email: userEmail });
    console.log(username);

    res.json({ success: true, name: username.name, id:username.id  });
  } catch (error) {
    // res.clearCookie("jwt");
    console.log(error.message);
  }
};

const logout = (req, res) => {
  res.clearCookie("jwt", { path: "/" });
  res.send({ success: true });
};

//UPDATING A USER ENDPOINT
const updateUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.send("ENTER VALID ID");

    const checkUser = await User.findOne({ email });

    if (!checkUser) return res.send("User DOES NOT EXIST");

    const updatedUser = await User.findAndUpdate({ email }, req.body);

    if (!updatedUser) return res.send("User NOT DELETED");

    res.status(201).send("User UPDATED SUCCESSFULLY");
  } catch (error) {
    res.status(401).send(error.message);
  }
};

//DELETING A USER ENDPOINT
const deleteUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.send("ENTER VALID ID");

    const checkUser = await User.findOne({ email });

    if (!checkUser) return res.send("User DOES NOT EXIST");

    const deletedUser = await User.findAndDelete({ email });

    if (!deletedUser) return res.send("USER NOT DELETED");

    res.status(201).send("USER DELETED SUCCESSFULLY");
  } catch (error) {
    res.status(401).send(error.message);
  }
};

//GETTING DATA OF A USER
const getUser = async (req, res) => {
  try {
    const userId = req.body;
    if (!userId) return res.send("ID IS REQUIRED");
    const user = await User.findById(userId);

    if (!user) return res.send("SEND VALID ID");

    res.json();
    user;
  } catch (error) {
    res.status(401).send(error.message);
  }
};

//GET ALL THE USERS
const getAllUsers = async (req, res) => {
  try {
    const Users = await User.findAll();

    if (!Users) return res.send("USERS DO NOT EXIST");

    res.status(201).send(Users);
  } catch (error) {
    res.status(401).send(error.message);
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  loginUser,
  autoLogin,
  logout,
};
