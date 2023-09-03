# Theatre Booking API

The Theatre Booking API provides endpoints to access and manage movie showtimes and seat bookings in various theatres. Users can view showtimes for the next 7 days, select a specific date to see the available movies and their showtimes in a chosen theatre, and book seats for a show.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Database Configuration](#database-configuration)

## Getting Started

### Prerequisites

To run the API, you'll need the following installed on your system:

- Node.js (https://nodejs.org)
- MySQL Server (https://www.mysql.com/)
- Elastic Search

### Installation

1. Clone the repository:

```bash
git clone https://github.com/akshay1996-bit/ticket-booking-app.git
cd ticket-booking-app
```

2. Install the dependencies:

```bash
npm install
```

3. Set up the MySQL and Redis configuration:

   - Open the `.env` file and update the database connection details (`DB_NAME`, `USER`, and `PASSWORD`).

4. Start the API:

```bash
npm start
```

By default, the API will run on http://localhost:3000. You can change the port by setting the `PORT` environment variable.

## API Endpoints

The API provides the following endpoints:

1. **Get Dates for a Theatre**

   - `GET /theatres/:theatre_id/dates`

   - Returns the dates of the next 7 days for a given theatre.

2. **Get Movies and Showtimes**

   - `GET /theatres/:theatre_id/movies/:show_date`

   - Returns the available movies and their showtimes for a specific date and theatre.

3. **Book Seats**

   - `POST /theatres/:theatre_id/movies/:showtime_id/book`

   - Books seats for a given theatre, movie showtime, and selected seats.

## Database Configuration

The API uses MySQL as the database. To set up the database, ensure you have a running MySQL server and update the database connection details in the `models.js` file.

The required database tables and associations will be automatically created and synced when the API starts.
