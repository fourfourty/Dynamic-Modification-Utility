
'use strict';
import {getFrameEl,changeCurrentColor} from '../Support/editingMenuOtherFunc.js';
import RequestModel from '../Model/RequestModel';
import Colors from '../Classes/editingMenuClasses';
let count = 0;
 /* 
    @onListItemColorChangeClick
    Обработчик обрабатывает клики на итемах,
    затем меняет цвет элемента на странице
    затем вызывает ф-цию
    @changeCurrentColor - меняет цвет в элемента в самом меню (на transform , filters стиль применяется без исп ф-ции), 
    затем добавляет стили в обьект 
    @createJsonQuery - для отправки на сервер для сохранения
    (Вот такие вот костыли :))
*/
        export function onListItemColorChangeClick(ev){
            const PREFIX_BEFORE_SELECTOR = '#';
            const BODY_EL_ID_NAME = 'publication';
            const target = ev.target;
            if(target.classList.contains('colors')) {
                const colorChooseEL = target.style.backgroundColor || target.value;
                const isPath = target.closest('.js-editing-menu-content').querySelector('.elem-id').getAttribute('data-path');
                const chooseIdEl = target.closest('.js-editing-menu-content').querySelector('.elem-id').getAttribute('data-name');
                const createSelector = PREFIX_BEFORE_SELECTOR + chooseIdEl;
                const regSelector = createSelector.search(BODY_EL_ID_NAME);
                let currentTargetEl = (regSelector > -1) ? getFrameEl("frameDoc").querySelector(`${createSelector}`) : getFrameEl('frameBody').querySelector(`${createSelector}`);
                if (isPath !== null) {
                    currentTargetEl = getFrameEl('frameBody').querySelector(`${createSelector}`);
                    console.log(currentTargetEl)
                    currentTargetEl.style.setProperty('fill', colorChooseEL, 'important');
                    changeCurrentColor(chooseIdEl, colorChooseEL);
                    RequestModel.creat(chooseIdEl, colorChooseEL, 'fill');
                }
                if(regSelector > -1) { //body
                    currentTargetEl.style.setProperty('background-color', colorChooseEL, 'important');
                    changeCurrentColor(chooseIdEl, colorChooseEL);
                    RequestModel.creat(chooseIdEl, colorChooseEL, 'background');
                }
                if (regSelector === -1 && currentTargetEl.childElementCount > 0) { //paths
                    const pathtList = currentTargetEl.querySelectorAll('path');
                    Array.from(pathtList).forEach(paths => {
                        if (!paths.getAttribute('stroke')) {
                            paths.style.setProperty('fill',colorChooseEL, 'important');
                            changeCurrentColor(chooseIdEl, colorChooseEL );
                            RequestModel.creat(chooseIdEl, colorChooseEL, 'fill');
                        }  
                    });
                }
                if(currentTargetEl.childElementCount  === 0 && !currentTargetEl.getAttribute('data-text') && isPath === null) {
                    currentTargetEl.style.setProperty('background-color', colorChooseEL, 'important');
                    changeCurrentColor(chooseIdEl, colorChooseEL);
                    RequestModel.creat(chooseIdEl, colorChooseEL, 'background');
                }
                if (currentTargetEl.childElementCount  === 0 && currentTargetEl.getAttribute('data-text')) { //divs ,spans ...
                    currentTargetEl.style.setProperty('color', colorChooseEL, 'important');
                    changeCurrentColor(chooseIdEl, colorChooseEL);
                    RequestModel.creat(chooseIdEl, colorChooseEL, 'color');
                }
            }
            if(target.classList.contains('range')) {
                const parentArr = [...target.closest('.transform-content').children];
                const isPath = target.closest('.js-editing-menu-content').querySelector('.elem-id').getAttribute('data-path');
                const dublicateCurrValArr = [...target.closest('.transform-content').closest('.transform').querySelector('.transform-current-value-content').children];
                const chooseIdEl = target.closest('.js-editing-menu-content').children[0].children[0].getAttribute('data-name');
                const createSelector = PREFIX_BEFORE_SELECTOR + chooseIdEl;
                const regSelector = createSelector.match(/publication/);
                let currentTargetEl = (regSelector === null) ? 
                    getFrameEl("frameBody").querySelector(`${createSelector}`) : 
                    getFrameEl("frameDoc").querySelector(`${createSelector}`);


                parentArr.forEach(input => {
                        if(input.getAttribute('data-value') === 'X') {
                            input.setAttribute('data-current-value', input.value);
                            input.setAttribute('value', input.value);
                            dublicateCurrValArr.forEach(el => {
                                (el.getAttribute('data-duplicate-value') === 'left') ? el.setAttribute('value', input.value) : ''
                            })
                            // rangeX = input.value + 'px';
                        }
                        if(input.getAttribute('data-value') === 'Y') {
                            input.setAttribute('data-current-value', input.value);
                            input.setAttribute('value', input.value);
                            dublicateCurrValArr.forEach(el => {
                                (el.getAttribute('data-duplicate-value') === 'top') ? el.setAttribute('value', input.value) : ''
                            })
                            // rangeY = input.value + 'px';
                        }
                        if(input.getAttribute('data-value') === 'Width') {
                            input.setAttribute('data-current-value', input.value);
                            input.setAttribute('value', input.value);
                            dublicateCurrValArr.forEach(el => {
                                (el.getAttribute('data-duplicate-value') === 'width') ? el.setAttribute('value', input.value) : ''
                            })
                            // rangeWh = input.value + 'px';
                        }
                        if(input.getAttribute('data-value') === 'Height') {
                            input.setAttribute('data-current-value', input.value);
                            input.setAttribute('value', input.value);
                            dublicateCurrValArr.forEach(el => {
                                (el.getAttribute('data-duplicate-value') === 'height') ? el.setAttribute('value', input.value) : ''
                            })
                            // rangeHt = input.value + 'px';
                        }
                        if(input.getAttribute('data-value') === 'FontSize') {
                            input.setAttribute('data-current-value', input.value);
                            input.setAttribute('value', input.value);
                            dublicateCurrValArr.forEach(el => {
                                (el.getAttribute('data-duplicate-value') === 'fontSize') ? el.setAttribute('value', input.value) : ''
                            })
                            // rangeHt = input.value + 'px';
                        }
                })
                const duplField = {
                    "left": dublicateCurrValArr[1].value + "px",
                    "top": dublicateCurrValArr[0].value + "px",
                    "width": dublicateCurrValArr[2].value + "px",
                    "height": dublicateCurrValArr[3].value + "px",
                    "fontSize": dublicateCurrValArr[4].value + "px",
                }
                if (isPath !== null) {
                    currentTargetEl = getFrameEl('frameBody').querySelector(`${createSelector}`);
                    currentTargetEl.style.setProperty('top', `${duplField['top']}`, 'important');
                    currentTargetEl.style.setProperty('left', `${duplField['left']}`, 'important');
                    // currentTargetEl.style.setProperty('transform', `scale(${rangeZoom})`, 'important');
                    currentTargetEl.style.setProperty('width', `${duplField['width']}`, 'important');
                    currentTargetEl.style.setProperty('height', `${duplField['height']}`, 'important');
                    currentTargetEl.style.setProperty('font-size', `${duplField['fontSize']}`, 'important');
                    RequestModel.creat(chooseIdEl, duplField, 'transform');
                }
                else {
                    currentTargetEl.style.setProperty('top', `${duplField['top']}`, 'important');
                    currentTargetEl.style.setProperty('left', `${duplField['left']}`, 'important');
                    // currentTargetEl.style.setProperty('transform', `scale(${rangeZoom})`, 'important');
                    currentTargetEl.style.setProperty('width', `${duplField['width']}`, 'important');
                    currentTargetEl.style.setProperty('height', `${duplField['height']}`, 'important');
                    currentTargetEl.style.setProperty('font-size', `${duplField['fontSize']}`, 'important');
    
                    RequestModel.creat(chooseIdEl, duplField, 'transform');
                }

            }
            if(target.classList.contains('filters-range')) {
                const parentArr = [...target.closest('.filters-content').children];
                const isPath = target.closest('.js-editing-menu-content').querySelector('.elem-id').getAttribute('data-path');
                const chooseIdEl = target.closest('.js-editing-menu-content').children[0].children[0].getAttribute('data-name');
                const dublicateCurrValArr = [...target.closest('.filters-content').closest('.filters').querySelector('.filters-current-value-content').children];
                const createSelector = PREFIX_BEFORE_SELECTOR + chooseIdEl;
                const regSelector = createSelector.match(/publication/);
                const currentTargetEl = (regSelector === null) ? 
                    getFrameEl("frameBody").querySelector(`${createSelector}`) : 
                    getFrameEl("frameDoc").querySelector(`${createSelector}`);
                // let blur, brightness, contrast, hueRotate,opacity, saturate;

                parentArr.forEach(inputs => {
                    switch(inputs.getAttribute('data-value')) {
                        case 'blur':
                            // blur = inputs.value + 'px';
                            inputs.setAttribute('data-current-value', inputs.value);
                            dublicateCurrValArr.forEach(el => {
                                (el.getAttribute('data-duplicate-filters-value') === 'blur') ? el.setAttribute('value', inputs.value) : ''
                            })
                            break;
                        case 'brightness':
                            // brightness = inputs.value + '%';
                            inputs.setAttribute('data-current-value', inputs.value);
                            dublicateCurrValArr.forEach(el => {
                                (el.getAttribute('data-duplicate-filters-value') === 'brightness') ? el.setAttribute('value', inputs.value) : ''
                            })
                            break;
                        case 'contrast':
                            // contrast = inputs.value + '%';
                            inputs.setAttribute('data-current-value', inputs.value);
                            dublicateCurrValArr.forEach(el => {
                                (el.getAttribute('data-duplicate-filters-value') === 'contrast') ? el.setAttribute('value', inputs.value) : ''
                            })
                            break;
                        case 'hue':
                            // hueRotate = inputs.value + 'deg';
                            inputs.setAttribute('data-current-value', inputs.value);
                            dublicateCurrValArr.forEach(el => {
                                (el.getAttribute('data-duplicate-filters-value') === 'hue') ? el.setAttribute('value', inputs.value) : ''
                            })
                            break;
                        case 'opacity':
                            // opacity = inputs.value + '%';
                            inputs.setAttribute('data-current-value', inputs.value);
                            dublicateCurrValArr.forEach(el => {
                                (el.getAttribute('data-duplicate-filters-value') === 'opacity') ? el.setAttribute('value', inputs.value) : ''
                            })
                            break;
                        case 'saturate':
                            // saturate = inputs.value + '%';
                            inputs.setAttribute('data-current-value', inputs.value);
                            dublicateCurrValArr.forEach(el => {
                                (el.getAttribute('data-duplicate-filters-value') === 'saturate') ? el.setAttribute('value', inputs.value) : ''
                            })
                            break;
                        default: ""
                            break;
                    }
                })
                const duplField = {
                    "blur": dublicateCurrValArr[0].value + "px",
                    "brightness": dublicateCurrValArr[1].value + "%",
                    "contrast": dublicateCurrValArr[2].value + "%",
                    "hue": dublicateCurrValArr[3].value + "deg",
                    "opacity": dublicateCurrValArr[4].value + "%",
                    "saturate": dublicateCurrValArr[5].value + "%",
                }

                currentTargetEl.style.setProperty('filter', `blur(${duplField['blur']}) brightness(${duplField['brightness']}) contrast(${duplField['contrast']}) hue-rotate(${duplField['hue']}) opacity(${duplField['opacity']}) saturate(${duplField['saturate']})`, 'important');
                const filtersStyleStr = `blur(${duplField['blur']}) brightness(${duplField['brightness']}) contrast(${duplField['contrast']}) hue-rotate(${duplField['hue']}) opacity(${duplField['opacity']}) saturate(${duplField['saturate']})`;
                RequestModel.creat(chooseIdEl, filtersStyleStr, 'filter');
            }
            else return false;
        }

        export function onToggleStyleSectionBtnClick(ev) {
            const attr = this.getAttribute('data-head');
            const selector = {
                "transform": '.editing-menu__transform',
                "filters": '.editing-menu__filters',
            }
            ev.target.classList.toggle('isOpenTabs');
            ev.target.closest('.js-editing-menu-content').querySelector(selector[attr]).classList.toggle('isOpen')
        }
        
        export function onToggleViewContentClick(ev) {
            const type = ev.target.getAttribute('data-type');
            const contentArr = [...document.querySelectorAll('.content')];
            const btnsArr = [...document.querySelectorAll('.toggle-btn')];
            contentArr.forEach(el => el.classList.remove('visible'));
            btnsArr.forEach(el => el.classList.remove('active-btn'));
            const currentContentEl = document.querySelector(`.js-${type}-content`);
            currentContentEl.classList.add('visible');
            this.classList.add('active-btn')
        } 
        export const onSendStylesBtnClick = (ev) => {
            const confirmMsg = confirm('Применить стили?'); 
            if(confirmMsg) {
                    if (Object.keys(listStyle).length > 0) RequestModel.send(listStyle);
                    else alert('нет стилей');
            }
                else return false;       
        }
        /*
        @onChangeInputsValueClick
        Изменяет value у ranges (кнопки рядом с range)
        затем создает синтетическое событие 'change'
        тем самым вызывает обработчик
        @onListItemColorChangeClick
        */
        export function onChangeInputsValueClick(ev) {
            const target = ev.target;
            let currentInput, newValue;
            if (target.getAttribute('data-input-value') === 'Y') {
                currentInput = target.closest('.range-buttons').closest('.transform-y-content').querySelector('.rangeY');
                if (target.classList.contains('incr')) {
                    newValue = Math.round(Number(currentInput.value++));
                }
                if (target.classList.contains('decr')) {
                    newValue = Math.round(Number(currentInput.value--));
                }
            }
            if (target.getAttribute('data-input-value') === 'X') {
                currentInput = target.closest('.range-buttons').closest('.transform-x-content').querySelector('.rangeX');
                if (target.classList.contains('incr')) {
                    newValue = Math.round(Number(currentInput.value++));
                }
                if (target.classList.contains('decr')) {
                    newValue = Math.round(Number(currentInput.value--));
                }
            }
            if (target.getAttribute('data-input-value') === 'width') {
                currentInput = target.closest('.range-buttons').closest('.transform-width-content').querySelector('.width');
                if (target.classList.contains('incr')) {
                    newValue = Math.round(Number(currentInput.value++));
                }
                if (target.classList.contains('decr')) {
                    newValue = Math.round(Number(currentInput.value--));
                }
            }
            if (target.getAttribute('data-input-value') === 'height') {
                currentInput = target.closest('.range-buttons').closest('.transform-height-content').querySelector('.height');
                if (target.classList.contains('incr')) {
                    newValue = Math.round(Number(currentInput.value++));
                }
                if (target.classList.contains('decr')) {
                    newValue = Math.round(Number(currentInput.value--));
                }
            }
            if (target.getAttribute('data-input-value') === 'fontSize') {
                currentInput = target.closest('.range-buttons').closest('.transform-fontSize-content').querySelector('.fontSize');
                if (target.classList.contains('incr')) {
                    newValue = Math.round(Number(currentInput.value++));
                }
                if (target.classList.contains('decr')) {
                    newValue = Math.round(Number(currentInput.value--));
                }
            }
            currentInput.setAttribute('value', newValue);
            let q = new Event('change',{bubbles: true});
            currentInput.dispatchEvent(q);
        }

        export function onChangeInputsFiltersValueClick(ev) {
            const target = ev.target;
            const targetAttr = target.getAttribute('data-input-value');
            let currentInput, newValue;
            const filtersType = {
                "blur": "blur",
                "brightness": "brightness",
                "contrast": "contrast",
                "hue": "hue",
                "opacity": "opacity",
                "saturate": "saturate"
            }
            currentInput = target.closest('.range-buttons').closest(`.filters-${filtersType[targetAttr]}-content`).querySelector(`.${filtersType[targetAttr]}`);
            if (target.classList.contains('incr')) {
                newValue = Math.round(Number(currentInput.value++));
            }
            if (target.classList.contains('decr')) {
                newValue = Math.round(Number(currentInput.value--));
            }
            currentInput.setAttribute('value', newValue);
            let e = new Event('change',{bubbles: true});
            currentInput.dispatchEvent(e);
        }

        
export function onToggleMainMenuWindowKeyDown(ev) {
    const editMenuEL = document.querySelector('.editing-menu');
    (ev.keyCode == 90 && ev.ctrlKey) ? editMenuEL.classList.toggle('show') : false;
}
 
export const onResetSlideBtnClick = (ev) => {
    const currentSrc = getFrameEl('frame').src;
    if (ev.target.classList.contains('js-reset-btn')) {
        getFrameEl('frame').src = '';
        getFrameEl('frame').src = currentSrc;
    }
} 

export const onAddNewObjBtnClick = (ev) => {
    ev.preventDefault();
    const modal = document.querySelector('.add-new-obj-modal');
    const text = document.querySelector('.js-new-obj-text');
    const addedWord = document.querySelector('.js-added-word');
    addedWord.textContent = text.value;
    text.value = '';
    modal.removeAttribute('hidden');
}

export const onModalCloseBtnClick = (ev) => {
    const modal = document.querySelector('.add-new-obj-modal');
    modal.setAttribute('hidden', 'hidden');
}
export const onModalSendBtnClick = (ev) => {
    const addedEl = document.querySelector('.js-added-word');
    const tag = document.createElement('DIV');
    tag.setAttribute('id', '_editing-word');
    tag.setAttribute('data-text', 'text');
    tag.setAttribute('id',`editing-word_${++count}`);
    RequestModel.set(addedEl);
    RequestModel.createElement();
}
export const onToggleModalSettingsClick = (ev) => {
    const target = ev.target;
    const settingEl = document.querySelector('.set-styles__settings');
    if (target.classList.contains('checkbox-back')) {
        settingEl.classList.toggle('fadeInUp-custom');
    }
}

export const onListColorsElClick = (ev) => {
    const target = ev.target;
    const currentNewObj = document.querySelector('.js-added-word');
    if (target.classList.contains('colors')) {
        const color = window.getComputedStyle(target,null).backgroundColor;
        currentNewObj.style.backgroundColor = color;
    }
}

export const onSelectFontChange = (ev) => {
    const target = ev.target;
    console.log(target)
    const currentNewObj = document.querySelector('.js-added-word');
    const selectedFont = target.selectedOptions[0].getAttribute('name');
    currentNewObj.style.fontFamily = selectedFont;
}

export const onPaddingRangeChangePaddingStyleChange = (ev) => {
    const target = ev.target;
    const currentNewObj = document.querySelector('.js-added-word');
    if(target.classList.contains('range')) {
        const targetValue = target.value;
        target.setAttribute('data-current-value', targetValue)
        const currentAttr = target.getAttribute('data-value');
        const currentValue = targetValue + "px";
        currentNewObj.style.setProperty(currentAttr,currentValue);
    }
}