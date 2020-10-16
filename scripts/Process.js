const childProcess = require('child_process');

// We can use __dirname
childProcess.exec("C:/Program Files/Epic Games/Spellbreak/Launch_Spellbreak.exe", (err, stdout, stderr) =>{
    console.log(stdout)
});
