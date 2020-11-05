/* eslint-disable no-loop-func */

/**
 * Converts csv string to an Object json based
 * @param {String} studentString - File with student grades
 */
export const csvToJson = (studentString) => {
    let lines = studentString.split('\n');
    let output = {};
    let titles = lines[0].split(',').slice(1);

    // For some reason some titles have \r in the name, this removes it
    titles = titles.map(title => title.replace('\r', ''));

    lines = lines.slice(1);
    titles.forEach(title => { output[title] = {} });

    const isValid = val => (val !== "" && val !== " " && val !== undefined && val !== "\r");

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].split(',').slice(1);
        for (let j = 0; j < line.length; j++) {
            if (isValid(line[j])){
                output[titles[j]][i+1] = parseInt(line[j]);
            }
        }
    }

    return output;
}

/**
 * Converts json object to csv string
 * @param {Object} studentObject - File with student grades
 */
export const jsonToCsv = (studentObject) => {
    const keys = Object.keys(studentObject);
    let output = 'Assignment #,'
    let maxGrades = 0;

    keys.forEach(key => {
        const numberOfAssignments = Object.keys(studentObject[key]).length;
        if (maxGrades < numberOfAssignments) maxGrades = numberOfAssignments;
        if (key !== keys[keys.length-1]) {
            output+=`${key},`;
        }else{
            output+=key;
        }
    })

    output+='\n';

    for (let i = 0; i < maxGrades; i++) {
        output += `${i+1},`;
        keys.forEach(title => {
            output += `${studentObject[title][i+1] === undefined ? '' : studentObject[title][i+1]}`;
            output += `${title === keys[keys.length-1] ? '' : ','}`;
        })
        output += '\n';
    }

    return output;
}