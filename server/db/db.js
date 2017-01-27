var Sequelize = require('sequelize');
var sequelize = new Sequelize('mysql://Emil:kAi98v9l@localhost:3306/joemini');
var fs = require('fs'); 
var path = require('path'); 
var db = {};

fs.readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js')
    })
    .forEach(function (file) {
        var model = sequelize.import(path.join(__dirname, file))
        db[model.name] = model
    })

Object.keys(db).forEach(function (modelName) {
    if (db[modelName].options.hasOwnProperty('associate')) {
        db[modelName].options.associate(db)
    }
});

exports.sequelize = sequelize;

/*var User = sequelize.define('user', {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    freezeTableName: true // Model tableName will be the same as the model name
});*/

/*var Device = sequelize.define('device', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    device_name: {
        type: Sequelize.TEXT,
        field: 'deviceName',
        allowNull: false,
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    added: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        field: 'added'
    },
    user_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
            model: User,
            key: 'id'
        }

    },

    freezeTableName: true // Model tableName will be the same as the model name
});*/

/*var Data = sequelize.define('data', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    data: {
        type: Sequelize.STRING,
        allowNull: false

    },
    time: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        field: 'time'
    },
    device_id: {
        type: Sequelize.UUID,
        references: {
            model: Device,
            key: 'id'
        }
    },


    freezeTableName: true // Model tableName will be the same as the model name
});*/


/*
function createPost(postText, imgName) {
    Post.sync({}).then(function () {
        // Table created
        return Post.create({
            postText: postText,
            img: ('img/' + imgName)
        }).catch(function(error) {
            console.log("Error saving post... postText: " + postText);
        });
    });

};



exports.Post = Post;
exports.sequelize = sequelize;
exports.createPost = createPost;*/


/*function addUser(userId) {
    User.sync({}).then(function () {
        //Table created or synched
        return User.create({
            id: userId
        }).catch(function (error) {
            console.log("Error creating user, userId: " + userId);
        });
    });
};*/

/*function addDevice(deviceId, name, type, userId, added, uniqueId) {
    Device.sync({}).then(function () {
        return Device.create({
            id: deviceId,
            device_identifier: uniqueId,
            device_name: name,
            type: type,
            added: added,
            user_id: userId
        });
    });
};*/

/*function addData(dataId, deviceId, data, time) {
    Device.sync({}).then(function () {
        return Device.create({
            id: dataId,
            data: data,
            time: time,
            device_id: deviceId
        });
    });
};*/

/*function findData(args) {*/
    /*                   combinations
    *   args = { deviceId = x, timeStart = a, timeEnd = b}
    *   args = { deviceId }
    *   args = { timeStart, timeEnd}
    *   
    */

  /*  switch (args.length()) {
        case 1:
            //deviceId
            Data.findAll({
                where: { device_id: args[0] }
            }).then(function (data) {
                return data
            }).catch(function (error) {
                console.err("An error occured while finding data by deviceId");
            });

            break;
        case 2:
            //timeStart and timeEnd
            Data.findAll({
                where: { time: { $between: [args[0], args[1]] } }
            }).then(function (data) {
                return data
            }).catch(function (error) {
                console.err("An error occured while finding data by timeStart and timeEnd");
            });
            break;
        case 3:
            //deviceId, timeStart and timeEnd
            Data.findAll({
                where: { time: { $between: [timeStart, timeEnd], $and: [{ device_id: args[0] }] } }
            }).then(function (data) {
                return data
            }).catch(function (error) {
                console.err("An error occured while finding data by deviceId, timeStart and timeEnd");
            });
            break;
    }
};*/

/*function removeData(args) {*/
    /*                   combinations
    *   args = { deviceId = x, timeStart = a, timeEnd = b}
    *   args = { deviceId }
    *   args = { dataId }
    *   args = { timeStart, timeEnd}
    *   
    */

/*    switch (args.length()) {
        case 1:
            //deviceId
            if (args[0] == 'dataId') {
                //Remove a single data entry
                Data.destroy({
                    where: { data_id: args[0] }
                }).then(function (deleted) {
                    return (deleted != null);
                }).catch(function (error) {
                    console.err("An error occured while deleting Data by data_id");
                });
            } else if (args[0] == 'deviceId') {
                //Remove all data for a device
                Data.destroy({
                    where: { device_id: args[0] }
                }).then(function (deleted) {
                    return (deleted != null);
                }).catch(function (error) {
                    console.err("An error occured while deleting Data by data_id");
                });
            }
            break;
        case 2:
            //timeStart and timeEnd
            Data.destroy({
                where: { $between: [timeStart, timeEnd] }
            }).then(function (deleted) {
                return (deleted != null);
            }).catch(function (error) {
                console.err("An error occured while deleting Data by data_id");
            });
            break;
        case 3:
            //deviceId, timeStart and timeEnd
            Data.destroy({
                where: { time: { $between: [timeStart, timeEnd], $and: [{ device_id: args[0] }] } }
            }).then(function (deleted) {
                return (deleted != null);
            }).catch(function (error) {
                console.err("An error occured while deleting Data by deviceId, timeStart and timeEnd");
            });
            break;
    }
};*/



