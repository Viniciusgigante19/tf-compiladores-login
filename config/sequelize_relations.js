import TodoModel from '../app/Models/TodoModel.js';
import UserModel from '../app/Models/UserModel.js';

export default () => {

    UserModel.hasMany(TodoModel, {
        foreignKey: 'id_user',
        as: 'todos'
    });

    TodoModel.belongsTo(UserModel, {
        foreignKey: 'id_user',
        as: 'user'
    });


}