const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bp = require('body-parser')
const itemSchema = require('./db/itemSchema.js')
const vehiclesSchema = require('./db/vehiclesSchema.js')
const customersSchema = require('./db/customersSchema.js')
const orderSchema = require('./db/orderSchema.js')
require('./db/conn.js')
app.use(bp.urlencoded({extended : false}))
require('dotenv').config()

//////////////////////////////////////////////////////////// For Item API ///////////////////////////////////////////


////////////////////////////// To Insert Item 

app.post('/insertItem', (req, res)=>{
  if(req.body.name && req.body.price && (process.env.ACCESS_TOKEN == req.header('ACCESS_TOKEN')))
  {
    const item = new itemSchema({name: req.body.name, price: req.body.price});
    item.save(item).then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send("some error occoured");
      });
  }
  else
  {
    res.status(500).send('Error Message : Send All Parameters and check your access token also')
  }
})


/////////////////////////////////// To Get All Details of an Items

app.post('/getItem', (req, res)=>{
  if(req.body._id && (process.env.ACCESS_TOKEN == req.header('ACCESS_TOKEN')))
  {
      itemSchema.findOne({_id : req.body._id}).then((data) => { 
        res.send(data)
    })
      .catch((err) => { res.status(500).send("Some Error Occoured") })
  }
  else
  {
    res.status(500).send('Error Message : Send All Parameters')
  }
})
/////////////////////////////// To Delete Item 
app.post('/deleteItem', (req, res)=>{
   if(req.body._id && (process.env.ACCESS_TOKEN == req.header('ACCESS_TOKEN')))
   {
       itemSchema.deleteOne({_id : req.body._id}).then((data) => { 
           res.send(`_id ${req.body._id} Items Deleted`)
        })
         .catch((err) => { res.status(500).send("Some Error Occoured") })
   }
   else
   {
    res.status(500).send('Error Message : Send All Parameters')
   }
})
/////////////////////////////// To Update Item
app.post('/updateItem', async (req, res)=>{
   let trigger = true
   if(req.body._id && (process.env.ACCESS_TOKEN == req.header('ACCESS_TOKEN')))
   {    let n;
        let p;
        try
        {
            data = await itemSchema.findOne({_id : req.body._id})
            n = req.body.name  ? req.body.name  : data.name
            p = req.body.price ? req.body.price : data.price
        }
        catch(err){ trigger = false; res.status(500).send("Some Error Occoured")}
        if(trigger)
        {
            try{
              data =  await itemSchema.updateOne({_id : req.body._id}, {name : n, price : p})
              res.send(data)
            }
            catch(err) { res.status(500).send("Some Error Occoured")}
        }
   }
   else
   {
    res.status(500).send('Error Message : Send All Parameters')
   }
})

//////////////////////////////////////////////////////////// For Customers API ////////////////////////////////////


////////////////////////////// To Insert Customers 

app.post('/insertCustomers', (req, res)=>{
  if(req.body.name && req.body.city && (process.env.ACCESS_TOKEN == req.header('ACCESS_TOKEN')))
  {
    const item = new customersSchema({name: req.body.name, city: req.body.city});
    item.save(item).then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({err});
      });
  }
  else
  {
    res.send('Error Message : Send All Parameters')
  }
})

////////////////////////////////// To Get All Details of an Customers

app.post('/getCustomers', (req, res)=>{
  if(req.body._id && (process.env.ACCESS_TOKEN == req.header('ACCESS_TOKEN')))
  {
        customersSchema.findOne({_id : req.body._id}).then((data) => { 
        res.send(data)
    })
      .catch((err) => { res.status(500).send("Some Error Occoured") })
  }
  else
  {
    res.status(500).send('Error Message : Send All Parameters')
  }
})

/////////////////////////////// To Delete Customer 
app.post('/deleteCustomers', (req, res)=>{
  if(req.body._id && (process.env.ACCESS_TOKEN == req.header('ACCESS_TOKEN')))
  {
      customersSchema.deleteOne({_id : req.body._id}).then((data) => { 
          res.send(`_id ${req.body._id} Customers Deleted`)
       })
        .catch((err) => { res.status(500).send("Some Error Occoured") })
  }
  else
  {
    res.status(500).send('Error Message : Send All Parameters')
  }
})

/////////////////////////////// To Update Customer
app.post('/updateCustomers', async (req, res)=>{
  if(req.body._id && (process.env.ACCESS_TOKEN == req.header('ACCESS_TOKEN')))
  {    let n;
       let p;
       let trigger = true;
       try 
       {
          data = await customersSchema.findOne({_id : req.body._id})
          n = req.body.name  ? req.body.name  : data.name
          p = req.body.city ? req.body.city : data.city        
       }
       catch(err){ trigger = false; res.status(500).send("Some Error Occoured") }
       if(trigger)
       {
              try{
                data = await customersSchema.updateOne({_id : req.body._id}, {name : n, city : p})
                  res.send(data)
            }
            catch(err){ res.status(500).send("Some Error Occoured")}
       }
  }
  else
  {
    res.status(500).send('Error Message : Send All Parameters')
  }
})


/////////////////////////////////////////////////// For Delivery Vehicle API  ////////////////////////////////////



////////////////////////////// Insert Delivery Vehicles
app.post('/insertVehicles', (req, res)=>{
  if(req.body.registrationNumber && req.body.vehicleType && req.body.city && req.body.activeOrderCount && (process.env.ACCESS_TOKEN == req.header('ACCESS_TOKEN')) && (req.body.vehicleType == 'bike' || req.body.vehicleType == 'truck'))
  {
    const item = new vehiclesSchema({registrationNumber: req.body.registrationNumber, vehicleType: req.body.vehicleType, city: req.body.city, activeOrderCount: req.body.activeOrderCount});
    item.save(item).then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({err});
      });
  }
  else
  {
    res.status(500).send('Error Message : Send All Parameters')
  }
})

////////////////////////////////// To Get All data of a Vechiles

app.post('/getVechiles', (req, res)=>{
  if(req.body._id && (process.env.ACCESS_TOKEN == req.header('ACCESS_TOKEN')))
  {
        vehiclesSchema.findOne({_id : req.body._id}).then((data) => { 
        res.send(data)
    })
      .catch((err) => { res.status(500).send("Some Error Occoured") })
  }
  else
  {
    res.status(500).send('Error Message : Send All Parameters')
  }
})

/////////////////////////////// To Delete Vehicles
app.post('/deleteVechiles', (req, res)=>{
  if(req.body._id && (process.env.ACCESS_TOKEN == req.header('ACCESS_TOKEN')))
  {
    vehiclesSchema.deleteOne({_id : req.body._id}).then((data) => { 
          res.send(`_id ${req.body._id} Items Deleted`)
       })
        .catch((err) => { res.status(500).send("Some Error Occoured") })
  }
  else
  {
    res.status(500).send('Error Message : Send All Parameters')
  }
})

///////////////////////////////////////Update Vehicles
app.post('/updateVehicles', async (req, res)=>{
  if(req.body._id && (process.env.ACCESS_TOKEN == req.header('ACCESS_TOKEN')))
  {   
       let r;
       let t;
       let c;
       let count;
       let trigger = true;
       try
       {
          data = await vehiclesSchema.findOne({_id : req.body._id}) 
          r = req.body.registrationNumber  ? req.body.registrationNumber  : data.registrationNumber
          t = req.body.vehicleType ? req.body.vehicleType : data.vehicleType
          c = req.body.city ? req.body.city : data.city
          count = req.body.activeOrderCount ? req.body.activeOrderCount : data.activeOrderCount
       }
       catch(e){ trigger = false; res.status(500).send("Some Error Occoured") }
       if(trigger)
       {
            if(count<=2 && count>=0)
            {
              try
              {
                  data = await vehiclesSchema.updateOne({_id : req.body._id}, {registrationNumber : r ,vehicleType : t ,city : c ,activeOrderCount : count}) 
                  res.send(data)
              }
              catch(err){ res.status(500).send("Some Error Occoured") }
            }
            else
            {
                res.status(500).send("Order Count Could't be greater than 2 and less than 0")
            }
       }
  }
  else
  {
            res.status(500).send("Order Count Could't be greater than 2 and less than 0")
  }      
})

/////////////////////////////////////////// Order API ///////////////////////////////////////////////////////////

app.post('/order', async (req, res)=>{
  if(req.body.itemId && req.body.customerId && req.body.deliveryVehicleId && (process.env.ACCESS_TOKEN == req.header('ACCESS_TOKEN')))
  {
     let dataItem;
     let dataCustomer;
     let dataVehicle;
     let orderNum;
     let maxOrdNum;
     let trigger = true;

     //////////// Fetching Item Details by Item Id
     try{
      data =  await itemSchema.findOne({_id : req.body.itemId})
      dataItem = data
     }
     catch(error) {if(error){ 
      trigger = false 
      res.status(500).send("Some Error Occoured")
       }
     }
     
     ///////// Fetching Customer Details by Customer Id
     if(trigger)
     {
          try{
            data =  await customersSchema.findOne({_id : req.body.customerId})
            dataCustomer = data
          }
          catch(error) {if(error){ 
            trigger = false
            res.send("Provided Customer Id is not present")
            }
          }
     }

     ////////// Fetching Vehicle details by Vehicle Id
     if(trigger)
     {
          try{
            data =  await vehiclesSchema.findOne({_id : req.body.deliveryVehicleId})
            dataVehicle = data
          }
          catch(error) {if(err){ 
            trigger = false
            res.status(500).send("Some Error Occoured");
            }
          }
     }


     /////////// Condition to check customer city and vehicle city is same or not

     if(dataCustomer.city != dataVehicle.city && trigger == true)
     {
         res.send("No Vehicle is available in your location")
     }
     /////////// Check Order Count 
     else if((dataVehicle.activeOrderCount == 2 || dataVehicle.activeOrderCount < 0) && trigger == true)
     {
         res.send("Max Limit of Order count 2 of Vehicle has been reached")
     }
     else
     {
         ///////  If all Above Condition is satishfied than order placing

         //////// For First Order Checking
         if(await orderSchema.countDocuments() == 0 && trigger == true)
         {
              orderNum = "001" 
              const item = new orderSchema({orderNumber : orderNum, itemId : req.body.itemId, price : dataItem.price, customerId : req.body.customerId,  deliveryVehicleId : dataVehicle.registrationNumber, isDelivered : false});
              item.save(item).then(data => {
                  res.send({orderNumber : orderNum, Is_Delivered : false, Item_Details : dataItem, Vehicle_Details : dataVehicle, Customer_Details : dataCustomer});
                })
                .catch(err => {
                  trigger = false
                  res.status(500).send({err});
                });
         }
         /////// Condition to fetch last order no and accoring to that order no incrementing order no
         else
         {
              if(trigger)
              {
                  try{
                    data = await orderSchema.find({}, 'orderNumber').sort("-orderNumber").limit(1)
                    maxOrdNum = data
                  }
                  catch(e){
                    if(e) res.status(500).send("Some Error Occoured")
                  }
                  orderNum = String(parseInt(maxOrdNum[0]['orderNumber'])+1)
                  if(orderNum<=9)
                  {
                    orderNum = "00"+orderNum
                  }
                  else if(orderNum<=99)
                  {
                    orderNum = "0"+orderNum
                  }

                  ///////// Insert Data of Order
                  const item = new orderSchema({orderNumber : orderNum, itemId : req.body.itemId, price : dataItem.price, customerId : req.body.customerId,  deliveryVehicleId : dataVehicle.registrationNumber, isDelivered : false});
                  item.save(item).then(data => {
                    res.send({orderNumber : orderNum, Is_Delivered : false, Item_Details : dataItem, Vehicle_Details : dataVehicle, Customer_Details : dataCustomer});
                    })
                    .catch(err => {
                      trigger = false
                      res.status(500).send({err});
                    });
              }
         }
         if(trigger)
         {
             ///// Increasing the vehicle order count
              vehiclesSchema.updateOne({_id : req.body.deliveryVehicleId}, {activeOrderCount : dataVehicle.activeOrderCount+1}).then((data) => { 
                console.log(data)
            })
            .catch((err) => { res.status(500).send("Some Error Occoured") })
         }
     }
  }
})  
///////////////////////////////// To Update Dilivery Status 
app.post('/updateDeliveryStatus', async (req, res)=>{
  if(req.body.orderNumber && (process.env.ACCESS_TOKEN == req.header('ACCESS_TOKEN')))
  {    
         let orderDetails;
         let activeOrder;
         let trigger = true
         try{
             await orderSchema.updateOne({orderNumber : req.body.orderNumber}, {isDelivered : true}) 
         }
        catch(err){ if(err) { trigger = false; res.status(500).send("Some Error Occoured") }}

        if(trigger)
        {
            try{
              data = await orderSchema.findOne({orderNumber : req.body.orderNumber}) 
              orderDetails = data
            }
          catch(err){ if(err) { trigger = false; res.status(500).send("Some Error Occoured") }}
        }
       
        if(trigger)
        {
          try{
            data = await vehiclesSchema.findOne({registrationNumber : orderDetails.deliveryVehicleId}) 
            activeOrder = data
            }
          catch(err){ if(err) { trigger = false; res.status(500).send("Some Error Occoured") }}
        } 
      if(data.activeOrderCount>=1 && trigger == true)
      {
          try{
            await vehiclesSchema.updateOne({registrationNumber : orderDetails.deliveryVehicleId}, {activeOrderCount : data.activeOrderCount-1}) 
            res.send(`Registraion No. ${orderDetails.deliveryVehicleId} order count ${data.activeOrderCount-1}`)
          }
          catch(err){ if(err) { res.status(500).send("Some Error Occoured") }}
      }
      else
      {
        res.status(500).send("Some Error Occoured")
      }
      
     
  }
  else
  {
    res.status(500).send("Some Error Occoured")
  }
})




app.listen(port, ()=>{
    console.log(`Server is listening on the Port No ${port}`)
})