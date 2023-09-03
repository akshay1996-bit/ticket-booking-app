const dbConfig = require("../configs/db");

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

const connectToDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to DB");
  } catch (err) {
    console.log("Error connecting to db");
  }
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.city = require("./city")(sequelize);
db.theater = require("./theater")(sequelize);
db.movie = require("./movie")(sequelize);
db.show = require("./show")(sequelize);
db.seat = require("./seat")(sequelize);
db.showSeat = require("./ShowSeat")(sequelize);
db.booking = require("./booking")(sequelize);

db.city.hasMany(db.theater);
db.theater.belongsTo(db.city);
db.theater.hasMany(db.show);
db.show.belongsTo(db.theater, {
});
db.movie.hasMany(db.show);
db.show.belongsTo(db.movie, {
});

const shows = db.show;
const seats = db.seat;

shows.belongsToMany(seats, { through: db.showSeat });
seats.belongsToMany(shows, { through: db.showSeat });

db.showSeat.belongsTo(shows);
db.showSeat.belongsTo(seats);

shows.belongsToMany(seats, { through: db.booking });
seats.belongsToMany(shows, { through: db.booking });

db.booking.belongsTo(shows);
db.booking.belongsTo(seats);

let movie = db.movie;
let theater;

db.sequelize
  .sync({ alter: false })
  .then(() => {
    console.log("Sync DB");
    return db.showSeat.bulkCreate(seats);
  })
  .catch((err) => {
    console.log("Error while sync", err);
  });
module.exports = { connectToDb, db };