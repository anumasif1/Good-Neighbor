<img src="./app/public/assets/img/favicon.ico" align="right" width="160px" height="180px"/>

# Good Neighbor ![iTh1nkBadge](https://img.shields.io/badge/-iTh1nk-blue?logo=visual-studio-code) [![HitCount](http://hits.dwyl.com/iTh1nk/project-2.svg)](http://hits.dwyl.com/iTh1nk/project-2) 

* This app is developed by using ***Model–View–Controller(MVC)*** structure; and interface is designed resolution responsively;
* The purpose of this app is to help user find someone who lives nearby to get food materials;
* User sign-up with address, and other users can visually see it on openMap embedded in main page;
* After one user make post, other people can make comment and get the task done;
* Link to heroku: ***https://safe-mesa-32574.herokuapp.com/***
---
* For developing this app, following main npm packages are used: ***Express.js***, ***Passport.js***, ***Sequelize.js***, ***Express-hanlebars***, ***session***, and ***moment***; database uses ***MySQL***;
* User can sign-up as new user and app direct user to main page ***success.hbs***; 
* After login, if user go back to homepage, app will redirect user to ***success.hbs***; 
* User's password is been encrypted in database; 
* In order to loop posts and comments and format time, app uses ***Hanlebars.registerHelper***: 
    ```javascript
        hbs.registerHelper('if_eq', function (a, b, opts) {
            if (a == b) {
                return opts.fn(this);
            } else {
                return opts.inverse(this);
            }
        });
        hbs.registerHelper('formatTime', function (date, format) {
            var mmnt = moment(date);
            return mmnt.format(format);
        });
    ```
* There are three tables in the app: ***users***, ***posts***, and ***comments***;
* The app uses ***Sequelize** to create tables and make association between: 
    ```javascript
        Post.associate = function (models) {
            Post.belongsTo(models.user, {
                onDelete: "CASCADE",
                foreignKey: {
                    allowNull: false
                }
            })
        };
        Comment.associate = function (models) {
            Comment.belongsTo(models.post, {
                onDelete: "CASCADE",
                foreignKey: {
                    allowNull: false
                }
            })
        };
    ```
* App uses openMap API to retrieve location info in ***map.js**;
* User is able to delete and make changes to own posts; 