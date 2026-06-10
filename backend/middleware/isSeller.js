const isSeller = (req, res, next) => {
  if (req.user.role !== "shopkeeper" && req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access Denied: Shopkeeper role required"
    })
  }
  next()
}

module.exports = isSeller;
