# Have to make sure what the port is
curl -X POST http://localhost:3000/gradeupdate -H "Content-Type: application/json" -d '{"json":{"isAdmin": true},"fileName":"123"}'