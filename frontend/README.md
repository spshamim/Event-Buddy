# Event Booking System Frontend

A Next.js-based frontend application for managing events and bookings with a modern, responsive user interface.

## Features

-   User Authentication (Sign In/Sign Up)
-   Event Browsing and Management
-   Booking System
-   Admin Dashboard
-   User Dashboard
-   Responsive Design
-   Toast Notifications
-   Cookie-based Authentication

## Prerequisites

-   Node.js (v14 or higher)
-   npm or yarn
-   Backend API running (see backend README for setup)

## Installation

1. Clone the repository
2. Install dependencies:

```bash
# Install main dependencies
npm install js-cookie axios react-icons react-hot-toast

# Install dev dependencies
npm install --save-dev @types/js-cookie
```

2.1. Create an Account on ImgBB, then get the API key. It is cruicial as it's used in createEvent/UpdateEvent feature

3. Create a `.env` file in the root directory with the following content:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_IMGBB_API_KEY="your_api_key_of_imgbb"
```

4. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
frontend/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard pages
│   ├── dashboard/         # User dashboard pages
│   ├── events/            # Event-related pages
│   ├── signin/            # Sign in page
│   ├── signup/            # Sign up page
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
├── public/               # Static assets
└── styles/              # Global styles
```

## Features in Detail

### Authentication

-   User registration and login
-   JWT token management using cookies
-   Protected routes for authenticated users

### Event Management

-   Browse all events
-   View event details
-   Book events (for authenticated users)
-   Manage bookings

### Admin Features

-   Create, edit, and delete events
-   View all bookings
-   Manage users

### User Dashboard

-   View personal bookings
-   Cancel bookings
-   Update profile information

## Development

```bash
# Development mode
npm run dev

# Production build
npm run build
npm run start

# Lint
npm run lint
```

## Dependencies

### Main Dependencies

-   `js-cookie`: Cookie management
-   `axios`: HTTP client for API requests
-   `react-icons`: Icon library
-   `react-hot-toast`: Toast notifications

### Dev Dependencies

-   `@types/js-cookie`: TypeScript types for js-cookie

## API Integration

The frontend integrates with the backend API endpoints as documented in the backend README. All API calls are made using axios and include proper error handling and loading states.

## Error Handling

-   Form validation
-   API error handling
-   Toast notifications for user feedback
-   Loading states for better UX

## Security

-   JWT token stored in HTTP-only cookies
-   Protected routes
-   Input validation
-   XSS prevention

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## Stay in touch

-   Developer - [Shamim](https://github.com/spshamim)

## License

This project is licensed under the MIT License.
