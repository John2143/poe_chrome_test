const robot = require("robotjs");
const clipboardy = require("clipboardy");
const data = require("./const.js");
const fs = require("fs");

// Speed up the mouse.
robot.setMouseDelay(data.delay);

function moveTo(pos){
    robot.moveMouse(pos.x, pos.y);
}

const socketsRegex = /Sockets: ([RGBW\- ]+)/;
function parseColor(){
    let text = clipboardy.readSync();
    let result = socketsRegex.exec(text);

    if(!result || !result[0]) return console.log("idk");

    result = result[1];
    result = result.replace(/[\- ]/g, "");

    return result;
}

let file;
function writeColor(col){
    if(!file) throw Error("Not sure what file to write to");
    if(file !== "-"){
        fs.appendFileSync(file, "\n" + col);
    }else{
        console.log(col);
    }
}

function chromeTab(){
    let d = data.ctab;
    moveTo(d.chrome);
    robot.mouseClick("right");
    moveTo(d.slot);
    robot.mouseClick("left");
}

let chromeBenchPos;
function chromeBench(){
    let d = data.cbench;
    moveTo(chromeBenchPos);
    robot.mouseClick("left");
    moveTo(d.button);
    robot.mouseClick("left");
    moveTo(d.item);
}

//see readme.txt for usage
let type = Number(process.argv[2]);
let times = Number(process.argv[3]);
file = process.argv.slice(4).join(" ");

if(!times || !file || file.length == 0){
    console.log("Could not discern times or file correctly");
    console.log(`times: ${times}, file: ${file}`);
    return;
}

if(file !== "-"){
    console.log("Times left: ");
}

let chromeFunc;
if(type === 1){
    chromeFunc = chromeTab;
}else if(type === 2){
    chromeBenchPos = data.cbench.option
    chromeFunc = chromeBench;
}else if(type === 3){
    chromeBenchPos = robot.getMousePos()
    chromeFunc = chromeBench;
}else{
    console.log(`Unknown type ${type}`);
}

while(times--){
    chromeFunc();

    if(file !== "-"){
        process.stdout.write(`\r${times} `);
    }

    robot.keyTap("c", "control");
    let color = parseColor();
    writeColor(color);
}
