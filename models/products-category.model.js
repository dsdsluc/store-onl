const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const ProductCategorySchema = new mongoose.Schema({
    title: String,
    slug: { type: String, slug: "title",unique: true },
    parent_id: {
      type: String,
      defaut: ""
    },
    description: String,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: {
      type: Boolean,
      default: false
    },
  },{ timestamps: true });
const ProductCategory = mongoose.model('ProductCategory', ProductCategorySchema,"products-category");
module.exports = ProductCategory;