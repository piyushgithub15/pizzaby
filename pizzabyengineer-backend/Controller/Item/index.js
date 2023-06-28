const Item = require("../../Models/Fooditem");



//GETTING A PARTICULAR ITEM
const getItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    if (!itemId) return res.send("ID IS REQUIRED");
    const item = await Item.findById(itemId);

    if (!item) return res.send("SEND VALID ID");

    res.json(item);
  } catch (error) {
    res.status(401).send(error.message);
  }
};

//CREATING A FOOD ITEM IN THE STORE
const createItem = async (req, res) => {
  try {
    const {name, price, imageurl, description, category} = req.body;
    if (!name || !price || !imageurl || !description || !category)
      return res.send("All the details not mentioned");

    const item = await Item.find({ name });

    if (item.length > 0) {
      return res.status(409).send("FOOD ITEM ALREADY INCLUDED");
    }

    const newItem = await Item.create({
      name,
      price,
      imageurl,
      description,
      category,
    });

    res.send(newItem);
  } catch (error) {
    console.log(error)
    res.status(401).send(error.message);
  }
};

//Deleting a FOOD ITEM IN THE STORE
const deleteItem = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) return res.send("ENTER VALID ID");

    const checkItem = await Item.findOne({ name });

   if (items.length > 0) {
    return res.status(409).send("FOOD ITEM ALREADY INCLUDED");
  }

    const deletedItem = await Item.findAndDelete({ name });

    if (!deletedItem) return res.send("ITEM NOT DELETED");

    res.status(201).send("ITEM DELETED SUCCESSFULLY");
  } catch (error) {
    res.status(401).send(error.message);
  }
};

//Updating A FOOD ITEM IN THE STORE
const updateItem = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) return res.send("ENTER VALID ID");

    const checkItem = await Item.findOne({ name });

    if (!checkItem) return res.send("ITEM DOES NOT EXIST");

    const updatedItem = await Item.findAndUpdate({ name });

    if (!updatedItem) return res.send("ITEM NOT DELETED");

    res.status(201).send("ITEM UPDATED SUCCESSFULLY");
  } catch (error) {
    res.status(401).send(error.message);
  }
};

//GET ALL THE ITEMS OF THE PARTICULAR CATEGORY
const getCategoryItems = async (req, res) => {
  try {
    const { category } = req.query;

    console.log(category);

     if (!category) return res.send("ENTER VALID CATEGORY");

     const checkItem = await Item.findOne({ category });

    if (!checkItem) return res.send("CATEGORY DOES NOT EXIST");

    const Items = await Item.find({ category });

    if (!Items) return res.send("ITEMS NOT PRESENT OF THE SPECIFIC CATEGORY");

    res.status(201).send(Items);
  } catch (error) {
    res.status(401).send(error.message);
  }
};

const getAllItems = async (req, res) => {
  try {
    const Items = await Item.find();

    if (Items.length<1) return res.send("USERS DO NOT EXIST");

    res.status(201).send(Items);
  } catch (error) {
    res.status(401).send(error.message);
  }
};

module.exports = {
  getItem,
  createItem,
  deleteItem,
  updateItem,
  getCategoryItems,
  getAllItems
};
