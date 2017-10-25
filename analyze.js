const fs = require("fs");

let off;
let rt = 0, gt = 0, bt = 0;
let total = 0;
function analyze(it){
    total++;
    if(!off){
        off = Array(it.length + 1).fill(0);
        console.log(off);
    }

    let r = 0, g = 0, b = 0;
    for(let x = 0; x < it.length; x++){
        switch(it[x]){
            case 'R': rt++; r++; break;
            case 'G': gt++; g++; break;
            case 'B': bt++; b++; break;
        }
    }
}

function done(){
    console.log(off);
    console.log(`
r: ${rt}
b: ${bt}
g: ${gt}`);
    console.log(total);
}

fs.readFile(process.argv.splice(2).join(" "), "ascii", (err, data) => {
    if(err) return console.log("couldnt read");

    let str = "";
    for(let x = 0; x < data.length; x++){
        let char = data[x];
        if(char === "\n"){
            analyze(str);
            str = "";
        }else{
            str += char;
        }
    }
    analyze(str);

    done();
});
