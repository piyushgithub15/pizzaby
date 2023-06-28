 const itemRoutes = require('./Routes/Fooditem');
 const userRoutes = require('./Routes/User')
 const cartRoutes = require('./Routes/Cart')
 const paymentRoutes =require('./Routes/Payments')

function setupRoutes(app) {
  
  app.use('/items', itemRoutes);
  app.use('/users',userRoutes)
  app.use('/cart',cartRoutes)
  app.use('/payment',paymentRoutes)


}

module.exports = setupRoutes;