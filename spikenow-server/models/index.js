import { DataTypes } from "sequelize";

export default (sequelize) => {
  const User = sequelize.define("User", {
    gId: DataTypes.STRING(),
    email: DataTypes.STRING,
    status: DataTypes.STRING,
  });

  sequelize.sync();
};
