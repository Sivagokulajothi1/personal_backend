# Personal Portfolio - Backend Infrastructure

This directory contains the Firebase backend configuration, security rules, and infrastructure setup for the personal portfolio. 

## Structure
- `firebase/`
  - `firestore.rules`: Security rules enforcing read-only access for public users.
  - `firestore.indexes.json`: Composite indexes for ordering published/visible items.
- `seed/`
  - `sample-data/`: Contains sample JSON data you can import into Firestore.
- `scripts/`: Scripts for seeding or managing data (requires Firebase Admin SDK).

## Security Rules
Security is enforced at the database level. The public frontend is **completely read-only**. Public users cannot create, update, or delete any documents. They also cannot modify files.
Only future authorized admin applications (using Firebase Auth) will be granted write access.

## How to Deploy
Ensure you have the Firebase CLI installed:
```bash
npm install -g firebase-tools
firebase login
```

Deploy only the backend rules and indexes:
```bash
firebase deploy --only firestore:rules,firestore:indexes
```

## Future Admin Architecture
A completely separate admin application (`personal_admin`) will be created in the future to manage the portfolio content. It will authenticate via Firebase Auth and utilize secure backend services to perform CRUD operations on these collections.
