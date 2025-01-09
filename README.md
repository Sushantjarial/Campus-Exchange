# Campus Exchange

**Campus Exchange** is a lightweight and fast web application for college students to buy, sell, and exchange items like textbooks, gadgets, and other essentials. The platform leverages the speed and scalability of Cloudflare Workers, React, and Tailwind CSS.

---

## Features

- **User Authentication**: Secure login and signup using JWT.
- **Product Listings**: Add, edit, and delete personal product listings.
- **Search & Filter**: Search for items by name, category, or price range.
- **Categories**: Organize products into categories like books, electronics, etc.
- **Image Uploads**: Enhance listings with product images.
- **Cloudflare Hosting**: Lightning-fast performance with serverless backend and CDN.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.

---

## Tech Stack

### **Frontend**
- React.js
- Tailwind CSS
- React Router
- Axios for API requests

### **Backend**
- **[Hono](https://hono.dev/)** - A lightweight web framework for Cloudflare Workers
- Cloudflare Workers (Serverless Backend)

### **Hosting**
- **Frontend**: Cloudflare Pages
- **Backend**: Cloudflare Workers

---

## Demo

Check out the live demo: [Campus Exchange](#)  
*(campusexchange.pages.dev)*

---

## Installation

### Prerequisites
- Node.js installed
- Cloudflare account (optional for local development)

### Steps

#### **Clone the Repository**
bash
git clone https://github.com/Sushantjarial/Campus-Exchange.git
cd Campus-Exchange


#### **Frontend Setup**
1. Navigate to the `frontend` directory:
   bash
   cd client
   
2. Install dependencies:
   bash
   npm install
   
3. Start the development server:
   bash
   npm start
   
4. Visit the app at `http://localhost:3000`.

#### **Backend Setup**
1. Navigate to the `backend` directory:
   bash
   cd server
   
2. Install dependencies:
   bash
   npm install
   
3. Start the local development server for Cloudflare Workers:
   bash
   npm run dev
   
4. Deploy the backend to Cloudflare Workers:
   bash
   npm run deploy
   

---

## Folder Structure


campus-exchange/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── handlers/
│   │   ├── routes/
│   │   ├── index.ts
│   └── package.json
├── README.md
└── .env


---

## API Endpoints

### Base URL: `<YOUR_BACKEND_URL>`
| Endpoint                        | Method | Description                      |
|---------------------------------|--------|----------------------------------|
| `/auth/signup`                  | POST   | User registration               |
| `/auth/login`                   | POST   | User login                      |
| `/products/listings`            | GET    | Get all product listings        |
| `/products/myListings`          | GET    | Get user's own listings         |
| `/products/add`                 | POST   | Add a new product listing       |
| `/products/delete/:id`          | DELETE | Delete a product listing        |
| `/products/search?query={text}` | GET    | Search for products             |

---

## Deployment

### Frontend Deployment (Cloudflare Pages)
1. Build the frontend:
   bash
   npm run build
   
2. Deploy the `frontend` build folder to Cloudflare Pages via your Cloudflare dashboard.

### Backend Deployment (Cloudflare Workers)
1. Navigate to the `backend` directory.
2. Deploy the backend to Cloudflare Workers:
   bash
   npm run deploy
   

---

## Future Enhancements

- Add payment integration for secure transactions.
- Push notifications for messages or offers.
- Product recommendations using AI/ML.
- User reviews and ratings.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add feature-name'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For any queries, feel free to reach out:

- **Name**: Rohit Somvanshi   
- **Email**: rohitsomvanshi1109@gmail.com  
- **GitHub**: [My GitHub Profile](https://github.com/Skky-dev)

- - **Name**: Amrit Kumar   
- **Email**: amritkumar2005btw@gmail.com  
- **GitHub**: [My GitHub Profile](https://github.com/amrit-GH23)

- - **Name**: Sushant Jarial   
- **Email**:   
- **GitHub**: [My GitHub Profile](https://github.com/Sushantjarial)

- **Name**: Wasim Khan   
- **Email**:   
- **GitHub**: [My GitHub Profile](https://github.com/)
---
