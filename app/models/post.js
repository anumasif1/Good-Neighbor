module.exports = function (sequelize, DataTypes) {
    var Post = sequelize.define('post', {
        member_post: {
            type: DataTypes.STRING
        },
        userId: {
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'), defaultValue: 'active'
        }
    });
    Post.associate = function (models) {
        Post.belongsTo(models.user, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        })
    }

    return Post;
}