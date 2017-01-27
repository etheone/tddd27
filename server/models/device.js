module.exports = function (sequelize, DataTypes) {
    var Device = sequelize.define('Device', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        device_name: {
            type: DataTypes.STRING,
            field: 'deviceName',
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        classMethods: {
            associate: function (models) {
                Device.belongsTo(models.User, {
                    onDelete: 'CASCADE',
                    foreignKey: {
                        allowNull: false
                    }

                });
                Device.hasMany(models.Data)
            },
            add: function (deviceId, name, type, userId, uniqueId) {
                Device.sync({}).then(function () {
                    Data.findOne({
                        where: { device_id: deviceId }
                    }).then(function (data) {
                        if (data == null) {
                            return Device.create({
                                id: deviceId,
                                device_identifier: uniqueId,
                                device_name: name,
                                type: type,
                                user_id: userId
                            });
                        } else {
                            return "Device with ID " + deviceId + " already exists!"
                        }
                    }).catch(function (error) {
                        console.err("An error occured while finding data by deviceId, timeStart and timeEnd");
                    });
                });
            },

        },

        freezeTableName: true // Model tableName will be the same as the model name
    });

    return Device;
};

/*
var Device = sequelize.define('device', {
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
}); */

function addDevice(deviceId, name, type, userId, added, uniqueId) {
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
};