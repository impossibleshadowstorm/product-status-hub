# Product Status Hub

A Next.js application that allows users to track the status of their projects. This app uses Next.js with the App Router, Prisma as an ORM, and SQLite as the database. Users can easily add, edit, and delete projects, as well as update project statuses. This project is an efficient tool for managing projects and keeping track of progress.

## Features

- **Project Management**: Add, edit, and delete project entries.
- **Status Tracking**: Update the status of each project to track progress.
- **Persistent Storage**: Project data is stored in an SQLite database, managed with Prisma ORM.
- **Next.js App Router**: Utilizing Next.js App Router for clean, efficient navigation and routing.

## Built With

- [Next.js](https://nextjs.org/) - The React framework for production
- [Prisma](https://www.prisma.io/) - Next-generation ORM for Node.js and TypeScript
- [SQLite](https://www.sqlite.org/index.html) - Lightweight, serverless database

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Prisma CLI (installed with `npm install prisma` or `yarn add prisma`)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/project-management-app.git
   cd project-management-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up Prisma and SQLite:
  * Run the following command to initialize Prisma and set up the SQLite database:
    ```bash
    npx prisma migrate dev --name init
    ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open http://localhost:3000 in your browser to see the app.

### Usage

- Adding a Project: The "Add Project" button creates a new project entry.
- Editing a Project: To edit the details, click on a project entry.
- Deleting a Project: Use the delete button on any project to remove it.
- Updating Project Status: Each project can update its status as per the progress made.

### Database Schema

The app's data structure is defined in the schema.prisma file. This includes fields for:

- id: Unique identifier for each product, automatically generated.
- brandName: The brand name of the product.
- genericName: The generic name of the product.
- partyName: Name of the associated party.
- packing: Details about the product's packing.
- boxSize: Size of the box.
- foilSize: Size of the foil.
- designDate: Date when the product design was finalized.
- approvalDate: Date when the product was approved (optional).
- boxCdrSent: Date when the box CDR was sent (optional).
- labelCdrSent: Date when the label CDR was sent (optional).
- cylinderCdrSent: Date when the cylinder CDR was sent (optional).


This README should help others quickly understand your app and set it up if needed. Let me know if you'd like any changes!
