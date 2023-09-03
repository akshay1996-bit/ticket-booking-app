const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Seat = sequelize.define(
    "Seat",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      isBooked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { tableName: "seat" }
  );
  return Seat;
};
