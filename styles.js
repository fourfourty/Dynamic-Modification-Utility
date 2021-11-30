//const axios = require('axios');
const fs = require('fs');
const path = require('path');
const util = require('util');


const url='https://indd.adobe.com/view/32f4d6f5-da78-49e2-a7bf-bf58ed01b901';
const classId = '01';   //Номер класса
const subjId = '01';    //Номер предмета
const weekId = '01';    //Номер недели
const lessonId = '2';  //Номер урока
const oneSlideOnly = null;  //const oneSlideOnly = 15; - выгрузится только 15й слайд (если считать с 0)


const subjects = ['math', 'rus', 'rit', 'okr'];
const subjNames = ['Математика', 'Русский язык', 'Риторика', 'Окружающий мир'];
const mainFolder = `${subjects[parseInt(subjId) - 1]}${weekId}0${lessonId}`;
const title = `${subjNames[parseInt(subjId) - 1]} ${weekId}.0${lessonId}`;


/*const mkdir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile);
const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const appendFile = util.promisify(fs.appendFile);*/


function main() {
//    console.log(`rename to ${mainFolder}`);
    console.log("Script working in directory " + __dirname);

    let idGeneratedStyles = fs.readFileSync("lib/idGeneratedStyles.css","utf8");

    console.log("end of reading idGeneratedStyles");



/*    nsynjs.run(fs.readFile,{},"lib/idGeneratedStyles.css","utf8",function(data){
        idGeneratedStyles = data;
        console.log(idGeneratedStyles);
    });*/

/*    fs.readFile("lib/idGeneratedStyles.css","utf8", (err, data) =>{
           if (err) throw err;
           idGeneratedStyles = data;
           console.log(idGeneratedStyles);
    });*/


 /*   readFile("lib/idGeneratedStyles.css","utf8")
        .then((data) => {
            idGeneratedStyles = data;
            console.log(idGeneratedStyles);
        })
        .catch((err) => {
             if (err) throw err;
         });*/

    const curDir = __dirname;

    var old_slides = fs.readdirSync(curDir, "utf8");
     // array of old_slides in current folder

    for (var i = 0; i < old_slides.length; i++) {
        if (old_slides[i].substr(0,2) != "01"){
            old_slides.splice(i,1);
            --i;
        }

    }


    for (var i = 0; i < old_slides.length; i++) {
        console.log(old_slides[i]);
    }



    for (var k = 0; k < old_slides.length; k++)  //reading slide html
    {

       // console.log(`${curDir}/${old_slides[k]}/deck/styles.css`);

        fs.writeFileSync(`${curDir}/${old_slides[k]}/deck/styles.css`, "/*"+`${old_slides[k]}`+"*/", "utf8");

      //  console.log("after writeFileSync " + `${curDir}/${old_slides[k]}/deck/styles.css`);

        let slide_k = fs.readFileSync(`${curDir}/${old_slides[k]}/${old_slides[k]}.html`, "utf8");

       // console.log("after readFileSync " + `${curDir}/${old_slides[k]}/${old_slides[k]}.html`);

            let objName;
            let pos;
            let slide_style;

            for (var j = 0; ; j++) {

                // searching idContainer's in slide
                const idx = slide_k.indexOf('id="_', pos);
                if (idx < 0) break;
                const idxEnd = slide_k.indexOf('"', idx + 5);
                if (idxEnd < 0) break;
                pos = idxEnd + 1;
                objName = slide_k.substring(idx + 4, idxEnd);

                //console.log("after searching idContainer's");

                //searching styles for the object
                const stPos = idGeneratedStyles.indexOf(`#${objName}`);
                if (stPos < 0) break;
                const stPosStart = idGeneratedStyles.indexOf('{', stPos);
                if (stPosStart < 0) break;
                const stPosEnd = idGeneratedStyles.indexOf('}', stPosStart);
                if (stPosEnd < 0) break;
                slide_style = "\n#" + `${objName}` + idGeneratedStyles.substring(stPosStart, stPosEnd + 1);

                //console.log("slide_style: " + slide_style);

                fs.appendFileSync(`${curDir}/${old_slides[k]}/deck/styles.css`, slide_style, "utf8");

                console.log("write to file #" + objName);
            }

            let add_styles = `\nimg._idGenObjectAttribute-1 {
            height:100.00%;
            min-width:100%;
            width:100.00%;
        }
        img._idGenObjectAttribute-2 {
            left:0px;
            position:absolute;
            top:0px;
        }
        div._idGenObjectStyle-Disabled {
            background-color:transparent;
            border-width:0px;
        }
        body, div, dl, dt, dd, h1, h2, h3, h4, h5, h6, p, pre, code, blockquote {
            margin:0;
            padding:0;
            border-width:0;
            text-rendering:optimizeSpeed;
        }
        div > svg {
            position:absolute;
        }
        div.Basic-Graphics-Frame {
            border-color:#000000;
            border-width:1px;
            border-style:solid;
        }
        div.Basic-Text-Frame {
            border-style:solid;
        }`;

        fs.appendFileSync(`${curDir}/${old_slides[k]}/deck/styles.css`, add_styles, "utf8");
    }

    for (var j = 0; j < old_slides.length; j++)
    {
        const slideName=`${classId}${subjId}${weekId}${lessonId}${j < 10 ? `0${j}` : j}0`;

        console.log("slidename: " + slideName);

        fs.renameSync(`${curDir}/${old_slides[j]}`, slideName);

        console.log("rename dir slide " + `${old_slides[j]}` + " to " + slideName);


        fs.renameSync(`${curDir}/${slideName}/${old_slides[j]}.html`, `${slideName}/${slideName}.html`);
        fs.renameSync(`${curDir}/${slideName}/${old_slides[j]}.js`, `${slideName}/${slideName}.js`);
        fs.renameSync(`${curDir}/${slideName}/${old_slides[j]}.json`, `${slideName}/${slideName}.json`);rgb(52,105,130)
        console.log("end of rename files in dir: " + slideName);

    }

    var slides = fs.readdirSync(curDir, "utf8");

    for (var i = 0; i < slides.length; i++) {
        if (slides[i].substr(0,2) != "01"){
            slides.splice(i,1);
            --i;
        }

    }


    for (var i = 0; i < slides.length; i++) {
        console.log(slides[i]);
    }

    let slidesObj = {
        slides,
        title
    };

//   let old_slidesObjString = JSON.stringify(old_slidesObj);

 //  console.log(old_slidesObjString);

    fs.writeFileSync(`${curDir}/${mainFolder}.json`, JSON.stringify(slidesObj),"utf8");

    console.log("write json file");

}

main();