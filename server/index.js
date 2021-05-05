const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

var bodyParser = require("body-parser");

// form payment

const cors = require("cors");
const db = require("../database/index.js");
const { router } = require("../database/router/products.js");
const { routerAdmin } = require("../database/router/admin.js");
app.use(cookieParser());
const path = require("path");
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  }),
);
app.set("port", 3333);
app.use(express.json());

// app.use('/api/admin',routerAdmin)
app.use("/", routerAdmin); //aminside

app.use("/", router); //extra work if i need it later
app.use("/api/poducts", router); //croud for the products

// passport middelware
const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

// calling and using  routers here
// const { router } = require("../database/router/products.js");
// app.use("/api/poducts", router);

const userRouter = require("../database/router/users");
app.use("/api/users", userRouter);

const userAuthRouter = require("../database/router/user-auth");
app.use("/api/auth", userAuthRouter);

const mailRouter = require("../database/router/nodeMail");
app.use("/api", mailRouter);

const paymentRouter = require("../database/router/payment");
app.use("/api", paymentRouter);

//

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// port
app.set("port", 3333);
// app.post("/sendmail", async (req, res)=> {

// res.send('well recive')
// let text = req.body.text
// let email = req.body.email
//   // ****************************** NODE MAIL **************************
// let transporter = nodemailer.createTransport({
//   service:'hotmail',
//   port: 587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: 'msjdevelopper2021@hotmail.com', // generated ethereal user
//     pass: 'rmadi12345', // generated ethereal password
//   },
//   tls:{
//     rejectUnauthorized:false
//   }
// });

// // send mail with defined transport object
// let info =  await transporter.sendMail({
//   from: `"Fred Foo 👻" <msjdevelopper2021@hotmail.com>`, // sender address
//   to: email, // list of receivers
//   subject: "Hello ✔", // Subject line
//   text: text, // plain text body
//   html: text, // html body
// }).then((res)=> {console.log(res);})
// .catch((e)=>{console.log(e)});

// console.log("Message sent: %s", info.messageId);
// // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

// // Preview only available when sending through an Ethereal account
// console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
// // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

// // ****************************** NODE MAIL **************************
// })
// ******************************* payement *****************************

// app.post("/payment", async (req, res, next) => {
//   const { email, product, authToken } = req.body;
//   console.log("########### req body ############", req.body);
//   console.log("************************* PRODUCT ", product);
//   const { token } = authToken;
//   const { card } = token;
//   console.log("111111111", card);
//   console.log(
//     "============================================== payment initiate =======================",
//   );
//   // const userProduct = {

//   // };
//   // unique ID generated by client
//   const idempotencyKey = uuidv4();
//   try {
//     const customer = await stripe.customers.create({
//       email: email,
//       source: token.id,
//     });
//     console.log("Customer Created.....");
//     console.log(customer);
//     const response = await stripe.charges.create(
//       {
//         amount: product.amount * 100,
//         currency: "INR",
//         customer: customer.id,
//         receipt_email: email,
//         description: product.description,
//         shipping: {
//           name: card.name,
//           address: {
//             line1: "MAHDIA",
//             country: card.address_country,
//           },
//         },
//       },
//       { idempotencyKey: idempotencyKey },
//     );
//     console.log("charge response");
//     console.log(response);
//     res.json(response);
//   } catch (err) {
//     console.log(
//       "=========================================== error ==========================",
//     );
//     console.log(err);
//     res.json(err);
//   }
// });

// ******************************* payement *****************************

// app.get("/", function (req, res) {
//   res.send("SERVER IS RUNNING! ");
// });

module.exports = app;
