const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const permissionRoutes = require("./routes/permissionRoutes");
const Role = require("./models/role");
const Menu = require("./models/menu");
const Permission = require("./models/permission");
var cors = require('cors');
const User = require("./models/User");


const app = express();
app.listen(9000);
app.use(cors());

app.use(express.json());
app.use(cookieParser());
const dbURI = 'mongodb://localhost:27017/new_app';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));



app.get("/", (req, res) => {
  console.log('hi');
  res.send("Hi vignesh")
});
app.post("/role/add", (req, res) => {
  console.log("hii");
  const { role_name, status, role_id } = req.body;
  console.log(req.body);
  try {
    const role = new Role({
      role_name: role_name,
      status: status,
      role_id: role_id
    });
    role.save();
    res.status(200).json({ message: "Success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }

});
app.post("/menu/add", (req, res) => {
  const { menu_name,
    menu_url,
    parent_menu_id,
    sort_order,
    status,
    created_by } = req.body;
  console.log(req.body);
  try {
    const menu = new Menu({
      menu_name,
      menu_url,
      parent_menu_id,
      sort_order,
      status,
      created_by
    });
    menu.save();
    res.status(200).json({ message: "added successfully" });
  } catch (err) {
    console.log(err);
  }
});

app.post("/permission/add", (req, res) => {
  const { role_id, menu_id, read, write, download, overall, del } = req.body;
  const permission = new Permission({
    role_id,
    menu_id,
    read,
    write,
    download,
    del,
    overall
  });
  permission.save();
  res.status(200).json({ message: "successfully created" });

})

app.get("/permission", async (req, res) => {
  const rd = "61431d1eb46e70443609e27d";
  const data = await Permission.aggregate([{
    $match: {
      role_id: rd
    }

  },
  {
    $project: {
      menu_id: {
        $toObjectId: "$menu_id"
      },
      del: {
        $cond: { if: { $eq: ["$del", "Allow"] }, then: 1, else: "$false" }
      },
      read: {
        $cond: { if: { $eq: ["$read", "Allow"] }, then: 1, else: "$false" }
      },
      write: {
        $cond: { if: { $eq: ["$write", "Allow"] }, then: 1, else: "$false" }
      },
      overall: {
        $cond: { if: { $eq: ["$overall", "Allow"] }, then: 1, else: "$false" }
      },
      download: {
        $cond: { if: { $eq: ["$download", "Allow"] }, then: 1, else: "$false" }
      },

    }
  },
  {
    $lookup: { 
    from: "menus",
    as: "user",
    let:{menu_id:"$menu_id"},
    pipeline:[
        {
          $match:{
            $expr:{$eq:["$$menu_id","$_id"]},
          }
        },
        {
          $project:{
            created_by:0,
            createdAt:0,
            updatedAt:0,
          }
        }
    ]
  }
  },
  ])
  res.status(200).json(data);
})


// app.post("/create/user",(req,res)=>{
//     const {fname,lname,email,password,role_id,role_name,location_id,created_by}=req.body;
//     const user=new User({
//       fname,
//       lname,
//       email,
//       password,
//       location_id,
//       created_by,
//       role_id,
//       role_name
//     })
//     user.save();

// })



app.use("/user", authRoutes);

app.use("/permissions", permissionRoutes);
