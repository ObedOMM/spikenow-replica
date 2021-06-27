import models from "../models";

class UserController {
  constructor(sequelize) {
    models(sequelize);
    this.client = sequelize;
    this.models = sequelize.models;
  }

  async getUsers() {
    return this.models.User.findAll({
      where: {},
    });
  }

  async getUser(id) {
    return this.models.User.findOne({ where: { gId: id } });
  }

  async saveUser({ email, id }) {
    const [user, created] = await this.models.User.findOrCreate({
      where: { gId: id },
      defaults: {
        email: email,
        gId: id,
      },
    });
    if (created) {
      return user;
    }
  }
}

export default UserController;
