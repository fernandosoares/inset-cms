const database = require('../config/database')
const DataType = database.Sequelize

const bcrypt = require('bcryptjs')

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
            msg: 'E-mail is address already taken. Please choose another one.',
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
                    if (error) {
                        console.log(error.errors[0].message)
                    }
                })
            })
        })
    })

}

User.add = function (userData) {
    if (userData) {
        User.create(userData).then(function (data) {
            return data
        }).catch(function (error) {
            return error
        })
    }
}

User.hashPassword = async function (password) {
    
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return err
        } else {
            bcrypt.hash(password, salt, function (err, hash) {
                if (!err) {
                    return hash
                } else {
                    throw err
                }
            })
        }
    })
}

module.exports = User