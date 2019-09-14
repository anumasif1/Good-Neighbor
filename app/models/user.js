module.exports = function (sequelize, DataTypes) {
	var User = sequelize.define('user', {
		name: {
			type: DataTypes.TEXT
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		address: {
			type: DataTypes.STRING
		},
		status: {
			type: DataTypes.ENUM('active', 'inactive'), defaultValue: 'active'
		}
	});
	return User;
}