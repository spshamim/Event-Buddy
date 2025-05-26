<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Event Booking System

A NestJS-based backend system for managing events and bookings with JWT authentication and role-based access control.

## Features

- JWT Authentication
- Role-Based Access Control (RBAC)
- Event Management
- Booking System
- User Management
- PostgreSQL Database Integration

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:

```bash
# Install main dependencies
npm install @nestjs/config @nestjs/common @nestjs/typeorm typeorm pg dotenv class-validator class-transformer @nestjs/passport passport-jwt @nestjs/core @nestjs/jwt bcrypt cookie-parser

# Install dev dependencies
npm install --save-dev @types/passport @types/passport-jwt @types/bcrypt
```

3. Create a PostgreSQL database named `event_booking`

4. Create a `.env` file in the root directory with the following content:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your-pg-username
DB_PASSWORD=your-pg-password
DB_DATABASE=event_booking

# JWT Configuration
JWT_SECRET=your-super-secret-key

# Application Configuration
PORT=4000
NODE_ENV=development
```

5. Start the application:

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## Database Seeding

You can populate your database with sample data in two ways:

1. Using the provided SQL query in pgAdmin:
   - Open pgAdmin
   - Connect to your database
   - Open the Query Tool
   - Paste and run the following SQL query:

```sql
INSERT INTO events (title, description, date, location, total_seats, available_seats, created_at, updated_at, time, tags, image) VALUES
('Algorithm', 'Test data', '2025-05-28 00:00:00', 'Dhaka', 23, 23, '2025-05-24 21:36:51.231731', '2025-05-24 21:36:51.231731', '9:00 AM - 5:00 PM', 'art,exhibition,culture', 'https://i.ibb.co/8ndSxNyx/test.jpg'),
('Comedy Night', 'Stand-up comedy show', '2024-07-10 00:00:00', 'Comedy Club, Las Vegas', 100, 100, '2025-05-24 11:28:32.756423', '2025-05-24 11:28:32.756423', '8:00 PM - 10:00 PM', 'comedy,entertainment,nightlife', 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800'),
('Summer Science Expo', 'Showcasing summer scientific innovations', '2025-08-18 18:00:00', 'Science Center, Washington DC', 250, 250, '2025-05-24 20:05:14.780502', '2025-05-24 20:05:14.780502', '9:00 AM - 4:00 PM', 'science,education,innovation', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800'),
('Summer Startup Showcase', 'Innovative startups present their summer projects', '2025-08-10 18:00:00', 'Innovation Hub, Seattle', 150, 150, '2025-05-24 20:05:14.780502', '2025-05-24 20:05:14.780502', '6:00 PM - 9:00 PM', 'startup,pitch,entrepreneurship', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800'),
('Summer Food & Wine Festival', 'Experience the finest summer cuisines and premium wines', '2025-08-04 18:00:00', 'Expo Center, Chicago', 300, 300, '2025-05-24 20:05:14.780502', '2025-05-24 20:05:14.780502', '11:00 AM - 8:00 PM', 'food,wine,expo', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800'),
('Fitness Bootcamp', 'Intensive fitness training program', '2024-06-01 00:00:00', 'Sports Complex, Miami', 50, 50, '2025-05-24 11:28:32.756423', '2025-05-24 11:28:32.756423', '7:00 AM - 9:00 AM', 'fitness,training,health', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800'),
('Summer Comedy Festival', 'Summer stand-up comedy extravaganza', '2025-08-22 18:00:00', 'Comedy Club, Las Vegas', 100, 100, '2025-05-24 20:05:14.780502', '2025-05-25 20:31:25.604412', '8:00 PM - 10:00 PM', 'comedy,entertainment,nightlife', 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800'),
('Science Fair', 'Showcasing scientific innovations', '2024-06-30 00:00:00', 'Science Center, Washington DC', 250, 250, '2025-05-24 11:28:32.756423', '2025-05-24 11:28:32.756423', '9:00 AM - 4:00 PM', 'science,education,innovation', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800'),
('Film Festival', 'International film screening event', '2024-08-20 00:00:00', 'Cinema Complex, Los Angeles', 400, 400, '2025-05-24 11:28:32.756423', '2025-05-24 11:28:32.756423', '7:00 PM - 11:00 PM', 'film,festival,entertainment', 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800'),
('Summer Art Showcase', 'Contemporary summer art exhibition', '2025-08-20 18:00:00', 'Modern Art Museum, San Francisco', 200, 200, '2025-05-24 20:05:14.780502', '2025-05-24 20:05:14.780502', '10:00 AM - 6:00 PM', 'art,exhibition,culture', 'https://images.unsplash.com/photo-1722501106012-d581cee4e545?q=80&w=800'),
('hello test', 'fdsfdsfsdfsdf', '2025-05-19 00:00:00', 'Banani', 23, 23, '2025-05-24 12:14:58.318028', '2025-05-24 12:14:58.318028', '2:00 PM - 10:00 PM', 'technology,conference,networking', 'https://images.unsplash.com/photo-1733506260573-2ddbf1db9b1a?q=80&w=800'),
('Summer Film Festival', 'International summer film screening event', '2025-08-25 18:00:00', 'Cinema Complex, Los Angeles', 400, 400, '2025-05-24 20:05:14.780502', '2025-05-24 20:05:14.780502', '7:00 PM - 11:00 PM', 'film,festival,entertainment', 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800'),
('Summer Fitness Challenge', 'Intensive summer fitness training program', '2025-08-15 18:00:00', 'Sports Complex, Miami', 50, 43, '2025-05-24 20:05:14.780502', '2025-05-24 21:55:01.865735', '7:00 AM - 9:00 AM', 'fitness,training,health', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800'),
('Startup Pitch Night', 'Entrepreneurs pitch their ideas', '2024-05-25 00:00:00', 'Innovation Hub, Seattle', 150, 150, '2025-05-24 11:28:32.756423', '2025-05-24 11:28:32.756423', '6:00 PM - 9:00 PM', 'startup,pitch,entrepreneurship', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800'),
('Summer Business Summit', 'Essential summer business skills workshop', '2025-08-12 18:00:00', 'Business Center, Boston', 100, 100, '2025-05-24 20:05:14.780502', '2025-05-25 20:30:00.586233', '9:00 AM - 4:00 PM', 'business,workshop,learning', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800'),
('Art Exhibition', 'Contemporary art showcase', '2024-07-15 00:00:00', 'Modern Art Museum, San Francisco', 200, 200, '2025-05-24 11:28:32.756423', '2025-05-24 11:28:32.756423', '10:00 AM - 6:00 PM', 'art,exhibition,culture', 'https://images.unsplash.com/photo-1722501106012-d581cee4e545?q=80&w=800'),
('Food & Wine Expo', 'Taste the finest cuisines and wines', '2024-08-05 00:00:00', 'Expo Center, Chicago', 300, 300, '2025-05-24 11:28:32.756423', '2025-05-24 11:28:32.756423', '11:00 AM - 8:00 PM', 'food,wine,expo', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800'),
('Business Workshop Beta', 'Learn essential business skills', '2024-05-09 00:00:00', 'Business Center, Boston', 100, 100, '2025-05-24 11:28:32.756423', '2025-05-24 12:21:14.062743', '9:00 AM - 4:00 PM', 'business,workshop,learning', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800'),
('Hello Shamim', 'asfsafsaas', '2025-08-12 00:00:00', 'Kuril, Dhaka', 13, 13, '2025-05-24 20:21:35.104161', '2025-05-25 20:26:47.295028', '10:00 AM - 6:00 PM', 'music,festival', 'https://i.ibb.co/p6qYtFgt/test.jpg');
```

2. Using the application's seeding functionality:
   - The application includes a seeding mechanism that can be triggered through the API
   - This will automatically populate your database with sample events and users

The sample data includes a variety of events with different categories, dates, and locations to help you test the application's features.

## API Endpoints

### Authentication

#### Login

- **POST** `/auth/login`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "access_token": "jwt_token",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user"
    }
  }
  ```

### Users

#### Register New User

- **POST** `/users`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }
  ```

#### Get User Profile (Authenticated)

- **GET** `/users/profile`
- **Headers:** `Authorization: Bearer <jwt_token>`

#### Get All Users (Admin Only)

- **GET** `/users`
- **Headers:** `Authorization: Bearer <jwt_token>`

### Events

#### Get All Events

- **GET** `/events`
- **Response:** List of all active events

#### Get Upcoming Events

- **GET** `/events/upcoming`
- **Response:** List of future events

#### Get Past Events

- **GET** `/events/past`
- **Response:** List of past events

#### Get Event Details

- **GET** `/events/:id`
- **Response:** Detailed information about a specific event

#### Create Event (Admin Only)

- **POST** `/events`
- **Headers:** `Authorization: Bearer <jwt_token>`
- **Body:**
  ```json
  {
    "title": "Event Title",
    "description": "Event Description",
    "date": "2024-03-20T10:00:00Z",
    "location": "Event Location",
    "totalSeats": 100
  }
  ```

#### Update Event (Admin Only)

- **PATCH** `/events/:id`
- **Headers:** `Authorization: Bearer <jwt_token>`
- **Body:** Partial event data

#### Delete Event (Admin Only)

- **DELETE** `/events/:id`
- **Headers:** `Authorization: Bearer <jwt_token>`

### Bookings

#### Create Booking (Authenticated)

- **POST** `/bookings`
- **Headers:** `Authorization: Bearer <jwt_token>`
- **Body:**
  ```json
  {
    "eventId": "event-uuid",
    "numberOfSeats": 2
  }
  ```

#### Get User's Bookings (Authenticated)

- **GET** `/bookings/my-bookings`
- **Headers:** `Authorization: Bearer <jwt_token>`

#### Get Booking Details (Authenticated)

- **GET** `/bookings/:id`
- **Headers:** `Authorization: Bearer <jwt_token>`

#### Cancel Booking (Authenticated)

- **DELETE** `/bookings/:id`
- **Headers:** `Authorization: Bearer <jwt_token>`

#### Get All Bookings (Admin Only)

- **GET** `/bookings`
- **Headers:** `Authorization: Bearer <jwt_token>`

## Business Rules

### Event Management

- Only admins can create, update, and delete events
- Events have a total number of seats and available seats
- Events can be marked as active or inactive
- Events have a date, location, and description

### Booking System

- Users can book between 1-4 seats per event
- Bookings are not allowed for past events
- Bookings cannot exceed available seats
- Users can view their booking history
- Users can cancel their bookings
- Admins can view all bookings

### User Management

- Two user roles: USER and ADMIN
- Users can register and login
- Users can view their profile
- Admins can view all users

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict
- 500: Internal Server Error

## Security

- JWT-based authentication
- Password hashing using bcrypt
- Role-based access control
- Environment variable configuration
- Input validation using class-validator

## Development

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod

# Testing
npm run test
npm run test:e2e
```

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Developer - [Shamim](https://github.com/spshamim)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
