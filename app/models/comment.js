module.exports = function (sequelize, DataTypes) {
    var Comment = sequelize.define('comment', {
        member_comment: {
            type: DataTypes.STRING,
        },
        member_name: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'), defaultValue: 'active'
        }
    });
    Comment.associate = function (models) {
        Comment.belongsTo(models.post, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        })
    }

    return Comment;
}