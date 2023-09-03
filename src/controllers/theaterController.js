const { Op } = require("sequelize");
const CustomError = require("../helpers/CustomError");
const { db } = require("../models/index");
const catchAsync = require("../utils/catchAsync");
const {
  checkInRangeWeek,
} = require("../helpers/generateShowTimeforNext7Days");

const Theater = db.theater;
const City = db.city;
const Show = db.show;
const Movie = db.movie;
const Seat = db.seat;
const ShowSeat = db.showSeat;
const Booking = db.booking;

const getTheaterHelper = async (query, next) => {
  const theaterQuery = await Theater.findOne({
    where: {
      [Op.or]: [{ name: query.toLowerCase() }, { id: query }],
    },
  });
  if (!theaterQuery) {
    return next(new CustomError("No Theater data found", 400));
  }
  return theaterQuery;
};

const getShow = catchAsync(async (req, res, next) => {
  const { name } = req.params;
  console.log(name);
  const theater = await Theater.findOne({
    where: {
      [Op.or]: [{ name: name.toLowerCase() }, { id: name }],
    },
  });
  if (!theater) {
    return next(new CustomError("No Theater data found", 400));
  }
  const theaterQuery = Theater.findByPk(theater.id, {
    include: {
      model: Show,
      include: [Movie],
    },
  });
  await theaterQuery
    .then((success) => {
      if (success.get("Shows").length > 0) {
        res.status(200).json({ result: "success", data: success.get("Shows") });
      } else {
        res.status(200).json({ result: "success", data: "No shows available" });
      }
    })
    .catch((error) => res.status(404).json(error));
});

const getTheater = catchAsync(async (req, res, next) => {
  const { name } = req.params;
  console.log(name);
  const city = await City.findOne({ where: { name: name.toLowerCase() } });
  if (!city) {
    return next(new CustomError("No city data found", 400));
  }
  const theater = City.findByPk(city.id, {
    include: {
      model: Theater,
    },
  });
  await theater
    .then((success) => {
      res.status(200).json(success.get("Theaters"));
    })
    .catch((error) => res.status(404).json(error));
});

const bookTicket = catchAsync(async (req, res, next) => {
  const { name, show_time_id } = req.params;
  const { seatNumber, customerName, bookingDate } = req.body;
  console.log("here=>", new Date(bookingDate));
  if (!checkInRangeWeek(bookingDate)) {
    return next(new CustomError("Enter valid date details", 400));
  }

  const theaterQuery = await getTheaterHelper(name, next);
  const seatDetails = await Seat.findOne({
    where: { number: seatNumber },
  });
  if (!seatDetails) {
    return next(new CustomError("Enter valid seat details", 400));
  }
  const shows = await Show.findOne({
    where: { id: show_time_id, TheaterId: theaterQuery.id },
    include: [
      {
        model: Theater,
      },
      {
        model: Movie,
      },
    ],
  });
  if (!shows) {
    return next(new CustomError("No show available", 400));
  }
  const seat = await ShowSeat.findOne({
    where: { showId: show_time_id, seatId: seatDetails.id, isBooked: false },
  });
  if (!seat) {
    return next(new CustomError("No seat available", 400));
  }
  const bookUpdate = Booking.create({
    name: customerName,
    bookingDate,
    ShowId: show_time_id,
    SeatId: seatDetails.id,
  });
  const seatUpdate = await seat.update({ isBooked: true });
  Promise.all([bookUpdate, seatUpdate])
    .then((response) => {
      const payload = {
        name: customerName,
        seat: seatNumber,
        date: response[0].get("bookingDate"),
        movie: shows.get("Movie").name,
        theater: name,
        time: shows.time,
      };
      res
        .status(200)
        .json({ result: "Ticket booked successfully", data: payload });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
module.exports = {
  getTheater,
  getShow,
  bookTicket
};
