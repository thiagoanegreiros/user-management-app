# ⚛️ React Frontend for FastAPI Hexagonal App

![CI](https://github.com/thiagoanegreiros/user-management-app/actions/workflows/ci.yml/badge.svg)
![CodeQL](https://github.com/thiagoanegreiros/user-management-app/actions/workflows/codeql.yml/badge.svg)
[![Codecov](https://codecov.io/gh/thiagoanegreiros/user-management-app/branch/main/graph/badge.svg)](https://codecov.io/gh/thiagoanegreiros/user-management-app)
![React](https://img.shields.io/badge/react-19.x-blue)
![TypeScript](https://img.shields.io/badge/typescript-4.x-blue)
![License](https://img.shields.io/github/license/thiagoanegreiros/user-management-app.svg)
![husky](https://img.shields.io/badge/husky-pre--commit%20hook-enabled.svg)

This is a **React frontend** hosted on https://user-management-app-hwjb.onrender.com/ built with **Create React App (CRA)** and **TypeScript**, designed to work with the backend API:

- **REST API**: [https://python-studies.onrender.com/docs](https://python-studies.onrender.com/docs)
- **GraphQL API**: [https://python-studies.onrender.com/graphql](https://python-studies.onrender.com/graphql)

It serves as the user interface for the [FastAPI Hexagonal Project](https://github.com/thiagoanegreiros/fastapi-project), implementing authentication, data visualization, and API interaction.

---

## 🚀 Features

- ✅ React 19 + TypeScript  
- ✅ Integration with REST and GraphQL APIs  
- ✅ Authentication flow (OAuth2, JWT-ready)  
- ✅ Routing with `react-router`  
- ✅ Unit tests with Jest and React Testing Library  
- ✅ Code coverage reports  
- ✅ Clean component and hook-based architecture  
- ✅ Future CI/CD integration  

---

## 🧪 Running Tests with Coverage

To execute all tests and generate a coverage report:

```bash
npm test -- --coverage --watchAll=false
```

## ✅ Next Steps

- 🌐 Use GraphQL for advanced data fetching  
- 🧪 Increase unit test coverage to 100%  
- 🚀 Add GitHub Actions for CI and deployments  
- 🔐 Add authentication guards to routes  
- 🧱 Improve component reusability and modularity  

---

## 📌 Authentication Flow

- After OAuth login, the backend redirects to `/auth?token=...`  
- The React app stores the token in `localStorage`  
- Authenticated requests can then be made to protected backend endpoints  

---

## 🧠 Purpose

This project aims to demonstrate:

- Full integration between frontend and a Python backend  
- A clean and modern frontend codebase using best practices  
- An extensible foundation for real-world applications  

---

## 🤝 Contributing

Contributions and suggestions are welcome! This project is part of an ongoing learning journey and will continue to evolve.

---

## 👨‍💻 Author

Made by **Thiago Ananias**
