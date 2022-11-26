var express = require("express");
const ProduitModel = require("../models/Produit");
var router = express.Router();




router.get("/addProduct",  function (req, res, next) {

    res.render("form");
 
});
 

router.get("/", async function (req, res, next) {
  try {
    const Products = await ProduitModel.find({});
    res.render("list", { title: "Products list", cont: Products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post("/addProduct", async function (req, res, next) {

  try {
    const { Libelle, Prix,Description,Quantite } = req.body;
    const checkIfUserExists = await ProduitModel.findOne({
      Libelle: Libelle,
    
    });
    if (checkIfUserExists) {
      res.send("Produit already exists");
    } else {
      const newUser = new ProduitModel({
        Libelle : Libelle,
      Prix : Prix,
      Description:Description,
      Quantite: Quantite,
      });
      await newUser.save();
      res.redirect("/products");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});








router.get("/delete/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const checkIfExist = await ProduitModel.findById(id);
    if (!checkIfExist) {
      throw new Error("product not found");
    }
    await ProduitModel.findByIdAndDelete(id);
    res.redirect("/products");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/edit/:id", async function (req, res, next) {
    try {
        const { id } = req.params;
        const product = await ProduitModel.findById(id);
        if (!product) {
            throw new Error("product not found");
        }
        res.render("edit", { title: "Edit product", cont: product });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.post("/edit/:id", async function (req, res, next) {
    try {
        const { id } = req.params;
        const { Libelle, Prix,Description,Quantite } = req.body;
        const product = await ProduitModel.findByIdAndUpdate(id, { Libelle, Prix,Description,Quantite });
        if (!product) {
            throw new Error("Error while updating product");
        }
        res.redirect("/products");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/search", async function (req, res, next) {
    try {
        //object destructuring
        const { search } = req.query;
        const contacts = await ProduitModel.find({ Libelle: { $regex: search, $options: "i" } });
        res.status(200).json({contacts});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
