const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const ProductSchema = new mongoose.Schema({
    title: String,
    slug: { type: String, slug: "title",unique: true },
    description: String,
    product_category_id: {
      type: String,
      default: ""
    },
    price: Number,
    discountPercentage: Number,
    feature: String,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: {
      type: Boolean,
      default: false
    },
    createdBy: {
      account_id: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
    },
    deletedBy:{
      account_id: String,
      deletedAt: Date
    },
    updatedBy:[
      {
        account_id: String,
        updatedAt: Date
      }
    ]
  });
const Product = mongoose.model('Product', ProductSchema,"products");
module.exports = Product;