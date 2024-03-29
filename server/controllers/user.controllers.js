import UserModel from "../models/user.models.js";

export const userRegisterController = async (req, res, next) => {
  try {
    const file = req.file.filename;
    const { fname, lname, mobile, gender, status, location, email } = req.body;
    if (fname || lname || mobile || status || location || gender || file) {
    } else {
      return res.status(401).json("All inputs are required!");
    }

    const preuser = await UserModel.findOne({ email: email });
    if (preuser) {
      return res.status(403).json("This User already exists in our database");
    } else {
      const user = new UserModel({
        fname,
        lname,
        mobile,
        gender,
        status,
        location,
        email,
        profile: file,
      });
      await user.save();
      res.status(201).json(user);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserController = async (req, res, next) => {
  try {
    const usersData = await UserModel.find({});
    res.status(200).json(usersData);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSingleUserController = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const userEditController = async (req, res, next) => {
  try {
    const { fname, lname, email, mobile, profile, gender, location, status } =
      req.body;
    const file = req.file ? req.file.filename : profile;

    const updatedUser = await UserModel.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      { fname, lname, email, mobile, gender, location, status, profile: file },
      { new: true }
    );
    await updatedUser.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
