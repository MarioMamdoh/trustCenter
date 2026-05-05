# Users Module

This module handles user management and authentication for the Care Center application.

## Features

- User registration with email and password
- Password hashing using bcrypt
- User authentication with JWT tokens
- Role-based user management
- Employee department categorization

## API Endpoints

### Authentication

- `POST /api/users/login` - User login
  - Body: `{ "email": "user@example.com", "password": "password123" }`
  - Returns: JWT token and user data

### User Management

- `POST /api/users` - Create new user
- `GET /api/users` - Get all users (filtered by role if query parameter provided)
- `GET /api/users/:id` - Get user by ID
- `PATCH /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## User Schema

The user schema includes:

- `email` (required, unique) - User's email address
- `password` (required) - Hashed password
- `role` (required) - User role (teamUser, admin, moderator)
- `fullName` (required) - User's full name
- `age` (required) - User's age
- `salary` (required) - User's salary
- `area` (required) - User's area
- `image` (required) - User's profile image
- `department` (required) - Employee department
- `salaryPerDay` (auto-calculated) - Daily salary
- `deduction` (default: 0) - Salary deductions
- `totalSalary` (auto-calculated) - Final salary after deductions

## Authentication Flow

1. User provides email and password
2. System validates credentials
3. If valid, returns JWT token and user data
4. Token can be used for subsequent authenticated requests

## Security Features

- Passwords are automatically hashed using bcrypt (10 salt rounds)
- Email addresses are unique across the system
- JWT tokens expire after 24 hours
- Password field is excluded from all GET responses
