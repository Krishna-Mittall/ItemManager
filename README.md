# Item Management REST API (Spring Boot)

A simple **Spring Boot REST API project** that demonstrates CRUD-style operations using an in-memory data structure (ArrayList).
This project focuses on **clean architecture, validation, global exception handling, and RESTful API design**, making it suitable for Java backend interview preparation.

---

## Project Overview

This application allows users to:

* Create new items/tasks
* Fetch item details by ID
* Validate request input
* Handle errors using a Global Exception Handler

The project does not use a database; instead, it stores data temporarily in memory using Java collections (ArrayList) as instructed in Gmail.
It is designed to showcase backend fundamentals such as Controller-Service structure and API handling.

---

## 🏗️ Tech Stack

* Java
* Spring Boot
* Spring Web
* Jakarta Validation
* Maven
* REST API
* HTML / CSS / JS (Basic UI)

---

## 📁 Project Structure

```
src/main/java/org/cfs/smarttaskmanager
│
├── Controller        → REST Controllers
├── Service           → Business Logic
├── Model             → Entity Classes
├── Exception         → Custom & Global Exceptions
└── SmartTaskManagerApplication.java
```

```
src/main/resources
└──  static            → CSS, JS, Html
```

---

## 🔌 API Endpoints

### ➜ Add Item

```
POST /items
```

Request Body:

```json
{
  "name": "Laptop",
  "description": "Gaming Laptop"
}
```

---

### ➜ Get Item by ID

```
GET /items/{id}
```

Example:

```
GET /items/1
```

---

## 🛠️ How to Run

1. Clone the repository:

```
git clone https://github.com/Krishna-Mittall/ItemManager.git
```

2. Open in IntelliJ IDEA

3. Run:

```
mvn spring-boot:run
```

4. Open in browser:

```
http://localhost:8080
```

---

## 🧪 Validation & Error Handling

* Input validation handled using `@Valid`
* Global errors handled via `GlobalExceptionHandler`
* Returns proper HTTP status codes like **404** and **400**

Example Error Response:

```
Item Not Found
```

---


## 👨‍💻 Author

**krishna Mittal**
Java Backend Developer (Spring Boot | DSA | Microservices)

---

⭐ If you like this project, give it a star on GitHub!
