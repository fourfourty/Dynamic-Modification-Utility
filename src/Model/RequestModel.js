'use strict';
import {getFrameEl} from '../Support/editingMenuOtherFunc';
import '../assets/css/style.css';

const RequestModel = (function(){
    const listStyle = {};
    const newElement = '';
    const changeStyleControllerUrl = './ChangeStyleController.php';
    const newElControllerUrl = './AddNewElementOnPage.php';
    const frame = getFrameEl;
    function setNewElement(elem) {
        return newElement = elem;
    }
    function cleanQueryObj() {
        for(let prop in listStyle) delete listStyle[prop];
    }
    async function send() {
    const dataBody = JSON.stringify(listStyle);
    await fetch(changeStyleControllerUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: dataBody,
    }).then(response => {
        const statusEl = document.querySelector('.js-save-status');
        const waitResponseEl = document.querySelector('.js-wait-response');
        waitResponseEl.removeAttribute('hidden');
        if (response.status === 200) {
            waitResponseEl.setAttribute('hidden','hidden');
            statusEl.removeAttribute('hidden');
            statusEl.textContent ="OK";
            statusEl.classList.add('success');
            setTimeout(() => {
                statusEl.setAttribute('hidden','hidden');
                statusEl.classList.remove('success')},3000);
            cleanQueryObj();
        }
        else {
            statusEl.removeAttribute('hidden');
            statusEl.textContent ="Error";
            statusEl.classList.add('error-input');
            setTimeout(() => {
                statusEl.setAttribute('hidden','hidden');
                statusEl.classList.remove('error-input')
            },3000)
        }
    })
    }
    async function sendNewObj() {
        const dataBody = JSON.stringify(newElement);
    await fetch(newElControllerUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: dataBody,
        }).then(response => {
            console.log(response)
        })
    }
    function getCurrentSlide() {
        const dirPos = frame('frame').src.indexOf('presentations');
        const srcStr = frame('frame').src.slice(dirPos,frame('frame').src.length);
        const srcArr = srcStr.split('/');
        srcArr.shift();
        srcArr.pop();
        const crtDirStr = srcArr.join('/');
        listStyle['folderDir'] = crtDirStr;
    }
    function createJsonQuery(id, style, trigger){
        let setTrigger = null;
        let selector = null;
        let strStyle = style.toString();
        const replaceId = '#' + id;
        const elem = frame('frameBody').querySelector(replaceId) || frame('frameDoc').querySelector('body');
        // const TRANSFORM_PREFIX_WEBKIT = '-webkit-transform';
        // const TRANSFORM_PREFIX_MOZ = '-moz-transform';
        const FILTER_PREFIX_WEBKIT = '-webkit-filter';
        const FILTER_PREFIX_MOZ = '-moz-filter';
        if (typeof trigger !== 'undefined' && typeof trigger === 'string') {
            (trigger === 'background') ? setTrigger = 'background-color' : false;
            (trigger === 'color') ? setTrigger = 'color' : false;
            (trigger === 'transform') ? setTrigger = {
                "top": "top",
                "left": "left",
                "width": "width",
                "height": "height",
                "fontSize": "font-size"
            } : false;
            (trigger === 'fill') ? setTrigger = 'fill' : false;
            (trigger === 'filter') ? setTrigger = 'filter' : false;
            if(elem.childElementCount > 0 && elem.tagName !== 'BODY') {
                selector = (elem.children[0].tagName === 'svg') ? 'path' : 'img';
                    if(typeof listStyle[id] === 'undefined') {
                        if(trigger === 'filter') {
                            listStyle[id] = {
                                // selector: selector,
                                [`${setTrigger}`]: `${strStyle}`,
                                [`${FILTER_PREFIX_WEBKIT}`]: `${strStyle}`,
                                [`${FILTER_PREFIX_MOZ}`]: `${strStyle}`,
                            }
                        }
                        if(trigger === 'transform') {
                            strStyle = style;
                            let {top,left,width,height,fontSize} = strStyle;
                            listStyle[id] = {
                                [`${setTrigger.top}`]: `${top}`,
                                [`${setTrigger.left}`]: `${left}`,
                                [`${setTrigger.width}`]: `${width}`,
                                [`${setTrigger.height}`]: `${height}`,
                                [`${setTrigger.fontSize}`]: `${fontSize}`,
                                // [`${setTrigger.transform}`]: `${transform}`,
                                // [`${TRANSFORM_PREFIX_WEBKIT}`]: `${transform}`,
                                // [`${TRANSFORM_PREFIX_MOZ}`]: `${transform}`,
                            }
                        }
                        else {
                            listStyle[id] = {
                                    [`${selector}`]: {
                                        [`${setTrigger}`]: `${strStyle}`
                                    }
                                }
                        }
                    }
                    if(typeof listStyle[id] !== 'undefined') {
                        if(trigger === 'filter') {
                            listStyle[id][setTrigger] = `${strStyle}`;
                            listStyle[id][FILTER_PREFIX_WEBKIT] = `${strStyle}`;
                            listStyle[id][FILTER_PREFIX_MOZ] = `${strStyle}`;
                        }
                        if(trigger === 'transform') {
                            strStyle = style;
                            let {top,left,width,height,fontSize} = strStyle;
                                
                            listStyle[id][setTrigger.top] = `${top}`;
                            listStyle[id][setTrigger.left] = `${left}`;
                            listStyle[id][setTrigger.width] = `${width}`;
                            listStyle[id][setTrigger.height] = `${height}`;
                            listStyle[id][setTrigger.fontSize] = `${fontSize}`;
                            // listStyle[id][setTrigger.transform] = `${transform}`;
                            // listStyle[id][TRANSFORM_PREFIX_WEBKIT] = `${transform}`;
                            // listStyle[id][TRANSFORM_PREFIX_MOZ] = `${transform}`;
                            }
                        // else listStyle[id][setTrigger] = `${strStyle}`;
                        else {
                            listStyle[id][selector] = {
                                [setTrigger]: `${strStyle}`
                            }
                        }   
                    }
            }
            else {
                if (typeof listStyle[id] === 'undefined') {
                    if(trigger === 'filter') {
                        listStyle[id] = {
                            [`${setTrigger}`]: `${strStyle}`,
                            [`${FILTER_PREFIX_WEBKIT}`]: `${strStyle}`,
                            [`${FILTER_PREFIX_MOZ}`]: `${strStyle}`,
                        }
                    }
                    if(trigger === 'transform') {
                        strStyle = style;
                        let {top, left, width, height, fontSize} = strStyle;
                        listStyle[id] = {
                            [`${setTrigger.top}`]: `${top}`,
                            [`${setTrigger.left}`]: `${left}`,
                            [`${setTrigger.width}`]: `${width}`,
                            [`${setTrigger.height}`]: `${height}`,
                            [`${setTrigger.fontSize}`]: `${fontSize}`,
                            // [`${setTrigger.transform}`]: `${transform}`,
                            // [`${TRANSFORM_PREFIX_WEBKIT}`]: `${transform}`,
                            // [`${TRANSFORM_PREFIX_MOZ}`]: `${transform}`,
                        }
                    }
    
                    else {
                        listStyle[id] = {[`${setTrigger}`]: `${strStyle}`};
                    }
                }
                if (typeof listStyle[id] !== 'undefined') {
                    if(trigger === 'filter') {
                        listStyle[id][setTrigger] = `${strStyle}`;
                        listStyle[id][FILTER_PREFIX_WEBKIT] = `${strStyle}`;
                        listStyle[id][FILTER_PREFIX_MOZ] = `${strStyle}`;
                    }
                    if(trigger === 'transform') {
                        strStyle = style;
                        let {top,left,width,height, fontSize} = strStyle;
    
                        listStyle[id][setTrigger.top] = `${top}`;
                        listStyle[id][setTrigger.left] = `${left}`;
                        listStyle[id][setTrigger.width] = `${width}`;
                        listStyle[id][setTrigger.height] = `${height}`;
                        listStyle[id][setTrigger.fontSize] = `${fontSize}`;
                        // listStyle[id][setTrigger.transform] = `${transform}`;
                        // listStyle[id][TRANSFORM_PREFIX_WEBKIT] = `${transform}`;
                        // listStyle[id][TRANSFORM_PREFIX_MOZ] = `${transform}`;
                    }
                    else listStyle[id][setTrigger] = `${strStyle}`;
                }
            }
        }
    }
    
    function handlerSend (ev) {
        const confirmMsg = confirm('Применить стили?'); 
        console.log(listStyle)
        if(confirmMsg) {
                if (Object.keys(listStyle).length > 0){
                    send();
                }
                else alert('нет стилей');
        }    
    }
    return {
        set: setNewElement,
        clean: cleanQueryObj,
        add: getCurrentSlide,
        creat: createJsonQuery,
        send: send,
        createElement: sendNewObj,
        handler: handlerSend
    }
}())

export default RequestModel;

// const listStyle = {
        
// }; // Обьект куда засовываем стили

// const onSendStylesBtnClick = (ev) => {
//     const confirmMsg = confirm('Применить стили?'); 
//     if(confirmMsg) {
//             if (Object.keys(listStyle).length > 0) send(listStyle);
//             else alert('нет стилей');
//     }    
// }


// createJsonQuery = function (id, style, trigger){
//     let setTrigger = null;
//     let selector = null;
//     let strStyle = style.toString();
//     const replaceId = '#' + id;
//     const frame = document.getElementById('mainFrame');
//     const elem = frame.contentDocument.body.querySelector(replaceId) || frame.contentDocument.querySelector('body');
//     const TRANSFORM_PREFIX_WEBKIT = '-webkit-transform';
//     const TRANSFORM_PREFIX_MOZ = '-moz-transform';
//     const FILTER_PREFIX_WEBKIT = '-webkit-filter';
//     const FILTER_PREFIX_MOZ = '-moz-filter';
//     if (typeof trigger !== 'undefined' && typeof trigger === 'string') {
//         (trigger === 'background') ? setTrigger = 'background-color' : false;
//         (trigger === 'color') ? setTrigger = 'color' : false;
//         (trigger === 'transform') ? setTrigger = {
//             "top": "top",
//             "left": "left",
//             // "transform": "transform"
//             "width": "width",
//             "height": "height"
//         } : false;
//         (trigger === 'fill') ? setTrigger = 'fill' : false;
//         (trigger === 'filter') ? setTrigger = 'filter' : false;
//         if(elem.childElementCount > 0 && elem.tagName !== 'BODY') {
//             selector = (elem.children[0].tagName === 'svg') ? 'path' : 'img';
//                 if(typeof listStyle[id] === 'undefined') {
//                     if(trigger === 'filter') {
//                         listStyle[id] = {
//                             // selector: selector,
//                             [`${setTrigger}`]: `${strStyle}`,
//                             [`${FILTER_PREFIX_WEBKIT}`]: `${strStyle}`,
//                             [`${FILTER_PREFIX_MOZ}`]: `${strStyle}`,
//                         }
//                     }
//                     if(trigger === 'transform') {
//                         strStyle = style;
//                         let {top,left,width,height} = strStyle;
//                         listStyle[id] = {
//                             [`${setTrigger.top}`]: `${top}`,
//                             [`${setTrigger.left}`]: `${left}`,
//                             [`${setTrigger.width}`]: `${width}`,
//                             [`${setTrigger.height}`]: `${height}`,
//                             // [`${setTrigger.transform}`]: `${transform}`,
//                             // [`${TRANSFORM_PREFIX_WEBKIT}`]: `${transform}`,
//                             // [`${TRANSFORM_PREFIX_MOZ}`]: `${transform}`,
//                         }
//                     }
//                     else {
//                             listStyle[id] = {
//                                 [`${selector}`]: {
//                                     [`${setTrigger}`]: `${strStyle}`
//                                 }
//                             }
//                     }
//                 }
//                 if(typeof listStyle[id] !== 'undefined') {
//                     if(trigger === 'filter') {
//                         listStyle[id][setTrigger] = `${strStyle}`;
//                         listStyle[id][FILTER_PREFIX_WEBKIT] = `${strStyle}`;
//                         listStyle[id][FILTER_PREFIX_MOZ] = `${strStyle}`;
//                     }
//                     if(trigger === 'transform') {
//                         strStyle = style;
//                         let {top,left,width,height} = strStyle;
                            
//                         listStyle[id][setTrigger.top] = `${top}`;
//                         listStyle[id][setTrigger.left] = `${left}`;
//                         listStyle[id][setTrigger.width] = `${width}`;
//                         listStyle[id][setTrigger.height] = `${height}`;
//                         // listStyle[id][setTrigger.transform] = `${transform}`;
//                         // listStyle[id][TRANSFORM_PREFIX_WEBKIT] = `${transform}`;
//                         // listStyle[id][TRANSFORM_PREFIX_MOZ] = `${transform}`;
//                         }
//                     // else listStyle[id][setTrigger] = `${strStyle}`;
//                     else {
//                         listStyle[id][selector] = {
//                             [setTrigger]: `${strStyle}`
//                         }
//                     }   
//                 }
//         }
//         else {
//             if (typeof listStyle[id] === 'undefined') {
//                 if(trigger === 'filter') {
//                     listStyle[id] = {
//                         [`${setTrigger}`]: `${strStyle}`,
//                         [`${FILTER_PREFIX_WEBKIT}`]: `${strStyle}`,
//                         [`${FILTER_PREFIX_MOZ}`]: `${strStyle}`,
//                     }
//                 }
//                 if(trigger === 'transform') {
//                     strStyle = style;
//                     let {top,left,width, height} = strStyle;
//                     listStyle[id] = {
//                         [`${setTrigger.top}`]: `${top}`,
//                         [`${setTrigger.left}`]: `${left}`,
//                         [`${setTrigger.width}`]: `${width}`,
//                         [`${setTrigger.height}`]: `${height}`,
//                         // [`${setTrigger.transform}`]: `${transform}`,
//                         // [`${TRANSFORM_PREFIX_WEBKIT}`]: `${transform}`,
//                         // [`${TRANSFORM_PREFIX_MOZ}`]: `${transform}`,
//                     }
//                 }

//                 else {
//                     listStyle[id] = {[`${setTrigger}`]: `${strStyle}`};
//                 }
//             }
//             if (typeof listStyle[id] !== 'undefined') {
//                 if(trigger === 'filter') {
//                     listStyle[id][setTrigger] = `${strStyle}`;
//                     listStyle[id][FILTER_PREFIX_WEBKIT] = `${strStyle}`;
//                     listStyle[id][FILTER_PREFIX_MOZ] = `${strStyle}`;
//                 }
//                 if(trigger === 'transform') {
//                     strStyle = style;
//                     let {top,left,width,height} = strStyle;

//                     listStyle[id][setTrigger.top] = `${top}`;
//                     listStyle[id][setTrigger.left] = `${left}`;
//                     listStyle[id][setTrigger.width] = `${width}`;
//                     listStyle[id][setTrigger.height] = `${height}`;
//                     // listStyle[id][setTrigger.transform] = `${transform}`;
//                     // listStyle[id][TRANSFORM_PREFIX_WEBKIT] = `${transform}`;
//                     // listStyle[id][TRANSFORM_PREFIX_MOZ] = `${transform}`;
//                 }
//                 else listStyle[id][setTrigger] = `${strStyle}`;
//             }
//         }
//     }
// }