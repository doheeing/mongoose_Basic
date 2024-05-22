const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/mongoose-test");

const validator = require("validator");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true, // 무조건 들어가야 하는 필수값
    validate: {
      validator: function (value) {
        if (!validator.isEmail(value)) throw new Error("This is not email");
      },
    },
  },
  password: {
    type: String,
    required: true,
    trim: true, //공백은 없어짐
  },
  age: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", userSchema);

// const newUser = new User({
//   name: "철수",
//   email: "철수@gmail.com",
//   password: "789456",
//   //   age: "25",
// });

// newUser.save().then((value) => console.log("value is", value));

User.find({name:"철수"}).select("name -_id")
.then((value)=>console.log("all data", value))
