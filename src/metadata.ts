/* eslint-disable */
export default async () => {
    const t = {};
    return { "@nestjs/swagger": { "models": [[import("./users/dto/create-user.dto"), { "CreateUserDto": {} }], [import("./users/dto/update-user.dto"), { "UpdateUserDto": {} }], [import("./users/entities/user.entity"), { "User": {} }]], "controllers": [[import("./app.controller"), { "AppController": { "root": {}, "readme": {} } }], [import("./users/users.controller"), { "UsersController": { "create": { type: String }, "findAll": { type: String }, "findOne": { type: String }, "update": { type: String }, "remove": { type: String } } }]] } };
};