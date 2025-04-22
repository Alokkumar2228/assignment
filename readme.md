# 📚 School Management API

A Node.js and Express.js-based RESTful API to manage school data, allowing users to **add new schools** and **retrieve a list of schools sorted by proximity** to a given location. Data is stored in a MySQL database.

## 🚀 Live Endpoints

- **Add School:** `https://assignment-38yh.onrender.com/addSchool`  
- **List Schools:** `https://assignment-38yh.onrender.com/listSchools?latitude=user_latitude&longitude=user_longitude`

---

## 🎯 Objective

Develop a backend system that:
- Allows users to add new school records.
- Retrieves schools sorted by geographic distance to a user-provided location.

---

## 🧱 Technologies Used

- **Node.js**
- **Express.js**
- **MySQL**
- **REST API**

---

## 🗃️ Database Setup

Create a table named `schools` in your MySQL database with the following schema:

```sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);
