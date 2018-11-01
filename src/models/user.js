const database = require('../config/database')
const DataType = database.Sequelize

const User = database.define('user', {
    id: {
        type: DataType.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataType.STRING(255),
        allowNull: false
    },
    email: {
        type: DataType.STRING(255),
        allowNull: false,
        unique: {
            args: true,
            msg: 'E-mail address already taken. Please choose another one.',
            fields: [database.fn('lower', database.col('email'))]
        },
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataType.STRING(255),
        allowNull: false
    },
    active: {
        type: DataType.BOOLEAN,
        defaultValue: true
    }
})
if (process.env.NODE_ENV === 'development') {

    const bcrypt = require('bcryptjs')
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash('admin', salt, function (err, hash) {
            database.sync().then(function () {
                User.create({
                    name: 'Administrador',
                    email: 'admin@admin.dev',
                    password: hash
                }).then(function (response) {
                    if (response) {
                        console.log(`ADMIN USER CRATED.`)
                    }
                }).catch(function (error) {
                    if(error) {
                        console.log(error.errors[0].message)
                    }
                })
            })
        })
    })

}

module.exports = User