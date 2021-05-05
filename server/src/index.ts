import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { Stripe } from 'stripe'
import {v4 as uuidv4} from 'uuid'
 
const stripe = new Stripe('sk_test_51IlZycKBsFdldFb4DFJHVTKxKo0ZmaXBM1IvIGFgUBaYnsIx3MS5l9B8Z34a8qohlzMhUtXBfqyHKZsYSPf43bg000GpJbMLJj',  {
    apiVersion: '2020-08-27',
  })
 
 const app = express()
 app.use(cors())
 app.use(bodyParser.json())


  
interface Product {
    description: string,
    amount: number
}

app.post('/payment', async (req: Request, res: Response, next: NextFunction) => {
    
    const { email,product , authToken } = req.body;
    const { token } = authToken;
    const { card } = token;

    console.log('111111111',card);


  
    console.log("============================================== payment initiate =======================")

 
    const userProduct = product as Product;

    // unique ID generated by client
     const idempotencyKey = uuidv4()

     try {
         const customer = await stripe.customers.create({
             email: email,
             source: token.id
         })

         console.log('Customer Created.....')
         console.log(customer)
         
         const response = await stripe.charges.create({
             amount: userProduct.amount * 100,
             currency: 'INR',
             customer: customer.id,
             receipt_email: email,
             description: userProduct.description,
             shipping: {
                 name: card.name,
                 address: {
                     line1: "MAHDIA",
                     country: card.address_country,
                  }
             }
     
         },{ idempotencyKey: idempotencyKey})

         console.log("charge response")
         console.log(response)
           
         
      
         res.json(response)
         
     } catch (err) {
         console.log("=========================================== error ==========================")
        console.log(err)
        res.json(err)
     }
  
})



app.listen(8000, () => {
    
    console.log('Listening to port 8000')
})