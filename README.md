# The House Hub App

**House Hub App** is a **full-stack property listing platform** that connects hosts and guests, enabling seamless property management, browsing, and personalized experiences. 
The app demonstrates secure **authentication**, **role-based authorization**, and **personalized favorites**, built using modern web technologies.  

---

## Features

-  **Authentication:** Register, login, and logout using **sessions and cookies**.  
-  **Role-Based Authorization:**  
  - **Hosts** can add, edit, and manage homes.  
  - **Guests** can browse listings, view details, and save favorites.  
-  **Personalization:** Favorites are **user-specific**, offering customized experiences.  
-  **Dynamic Rendering:** Uses **EJS** templates and **partials** for reusable components (headers, navbars).  
-  **Responsive UI:** Styled with **TailwindCSS** for modern and mobile-friendly design.  
-  **Database Management:** **MongoDB** with **Mongoose** for structured, schema-based data.  

---

## Tech Stack

| Layer         | Technologies                                   |
|---------------|----------------------------------------------- |
| **Frontend**  | EJS, HTML, CSS, TailwindCSS                    |
| **Backend**   | Node.js, Express.js                            |
| **Database**  | MongoDB, Mongoose                              |
| **Auth**      | express-session, cookies                       |
| **Templating**| EJS with partials                              |

---

##  Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/house-hub.git
cd house-hub
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Server
```bash
npm start
```
Visit http://localhost:3000 to view the app.

## Folder Structure
```bash
house-hub/
├── public/               # Static assets (CSS, images)
├── partials/             # Header, nav, favourites
├── views/                # EJS templates
│   ├── auth/             # Login & Signup pages
│   ├── host/             # Host-specific views
│   └── store/            # Guest-specific views
├── routes/               # Express route files
├── models/               # Mongoose schemas
├── controllers/          # Request handlers
├── app.js                # Main Express app
└── package.json
```
## Core Functionalities
Authentication & Session Management – secure login/logout with cookies.

Role-Based Access Control – renders pages and routes based on user type (host/guest).

Favorites Management – each guest can save favorites individually.

Dynamic & Responsive UI – EJS partials + TailwindCSS.

Data Persistence – all data stored and managed via MongoDB.


## Author
Vivek Shandilya
B.Tech, Materials Engineering, IIT Jammu
