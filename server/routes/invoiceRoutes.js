const express =
  require("express");

const protect =
  require("../middleware/authMiddleware");

const {
  downloadInvoice,
} = require(
  "../controllers/invoiceController"
);

const router =
  express.Router();

router.get(
  "/download",

  protect,

  downloadInvoice
);

module.exports =
  router;