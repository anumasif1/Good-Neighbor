<img src="./public/assets/img/favicon.ico" align="right" width="160px" height="180px"/>

# Good Neighbor ![iTh1nkBadge](https://img.shields.io/badge/-iTh1nk-blue?logo=visual-studio-code) [![HitCount](http://hits.dwyl.com/iTh1nk/project-2.svg)](http://hits.dwyl.com/iTh1nk/project-2) 

* This app is developed by using ***Model–View–Controller(MVC)*** structure: 
* The app interface is designed resolution responsively;
* User can input burger name and data will be stored to ***MySQL*** database;
* There are two cards shows on page: left card shows burgers that user puts in, and right card shows burgers that are devoured; 
* User can use button by each burger to either ***devour*** burger or ***remove*** devoured burger;
* After remove burger, data will be eliminated from database;
* User also has option to update burger name that shows on left card; 
* ***New:*** when devouring a burger, user has to input customer name to specify who will eat the burger; on devoured burger list, app will show devoured burger and customer name below; 
* Link to heroku: ***https://dry-brook-41903.herokuapp.com/***
---
* ***Sequelize*** is used for developing this app; 
* The app use ***handlebars*** dynamically display page: ```main.handlebars```, ```index.handlebars```, ```burger-devoured.handlebars```, ```burger-tobedevour.handlebars```, ```customer.handlebars```, and ```customerDevoured.handlebars```;
* In this app, all functions are separated by different ```.js``` files: ```burger_controller.js```, ```server.js```, ```burger.js```, ```customer.js```, ```view.js```(separate JS from ```index.handlebars```);
* To deploy on Heroku, the app uses heroku add-on jawsDB to handle MySQL database by config ```config.json```: 
     ```javascript
          "production": {
               ......
               "use_env_variable": "JAWSDB_URL"
          }
     ```
* Sync sequelize: 
     ```javascript
          db.sequelize.sync({ force: true }).then(function () {
               app.listen(PORT, function () {
               console.log("App listening on PORT " + PORT);
               });
          });
     ```
* Two tables are created: ***Burgers*** and ***Customers***: 
     ```javascript
          module.exports = function(sequelize, DataType) {
               var Customer = sequelize.define("Customer", {
                    customer_name: {
                         type: DataType.STRING,
                    }
               });
               //add association between Customers and Burgers
               Customer.associate = function (models) {
                    Customer.belongsTo(models.Burger, {
                         onDelete: "CASCADE",
                         foreignKey: {
                              allowNull: false
                         }
                    })
               }
               return Customer;
          };
          
          module.exports = function(sequelize, DataTypes) {
               var Burgers = sequelize.define("Burgers", {
                    burger_name: {
                         type: DataTypes.STRING,
                         allowNull: false,
                    },
                    devoured: {
                         type: DataTypes.BOOLEAN,
                         defaultValue: false,
                    }
                    });
               return Burgers;
          };
     ```
* Methods used in controller: 
     ```javascript
          findAll().then((result) => {});
          create({..., ...});
          destroy({where: {}});
          findOne({where: {}});
          update({}, {where: {}});
     ```
* Include ***Burgers*** in ***Customers***: 
     ```javascript
          db.Customer
               .findAll({
                   order: [
                       ['customer_name', 'ASC']
                   ],
                   include: [db.Burger]
               })
               .then()
               ......
     ```
* When create Customers table, insert BurgerId column in ```create()``` method: 
     ```javascript
          db.Customer
               .create({ customer_name: customerName, BurgerId: id})
               .then()
               ......
     ```
* Uses ***Modal*** to alert user that customer name are required: 
     ```javascript
          if (customerName) {
               ......
          } else {
               $('#exampleModal').modal('show');
          }
     ```
* To grab input customer name: 
     ```javascript
          var customerName = $("#leftList [data-customerid=" + devourBurger.id + "]").val().trim();
     ```

> **Notes for setting up **sequelize****: 

               npm install -g sequelize-cli;
               npm install mysql2;
               sequelize init:config & sequelize init:models;
> **Notes for deploying heroku**: 
          
               heroku login;
               git remote -v;
               heroku create;
               git remote -v;
               git push heroku master;
          
