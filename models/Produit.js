const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProduitSchema = new Schema(
  {
    Libelle: String,
    Prix: Number,
    Description: String,
    Quantite: Number,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Produit", ProduitSchema);
