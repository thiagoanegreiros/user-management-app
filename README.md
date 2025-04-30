# ⚛️ React Frontend for FastAPI Hexagonal App

This is a **React frontend** built with **Create React App (CRA)** and **TypeScript**, designed to work with the backend API:

- **REST API**: [https://python-studies.onrender.com/docs](https://python-studies.onrender.com/docs)
- **GraphQL API**: [https://python-studies.onrender.com/graphql](https://python-studies.onrender.com/graphql)

It serves as the user interface for the [FastAPI Hexagonal Project](https://github.com/thiagoanegreiros/fastapi-project), implementing authentication, data visualization, and API interaction.
---

## 🚀 Features

- ✅ React 18 + TypeScript  
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
