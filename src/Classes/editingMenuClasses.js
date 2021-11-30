'use strict';

export class Colors {
    _colorsArr = ['#a2669d','#663d84','#000000','#cdced0','#acd6f2','#0098c7','#3e7c94','#00a99d','#a4cf57','#59ad66'
        ,'#ffe293','#fdb913','#d68d2a','#fddedb','#e98b7d','#da524d', '#fff','#512672', '#c63a3c', '#009a93', '<input class="colors" type="color" />'
    ];
    renderColors() {
        return this._colorsArr.map((colorsItem,index) => {
            if(colorsItem.length > 7) {
                return `<li class="colors">${colorsItem}</li>`;
            }
            return `<li class="colors" style="background-color: ${colorsItem}">${index + 1}</li>`;
        })
    }
}


    export class Transform {
        constructor( { top, left, width, height,fontSize } ) {
            this.rangeTextY = Math.round(Number(top));
            this.rangeTextX = Math.round(Number(left));
            this.rangeTextWh = Math.round(Number(width));
            this.rangeTextHt = Math.round(Number(height));
            this.rangeTextFontSize = Math.round(Number(fontSize));
        }
        renderTransformStyle() {
            return `
            <div class="editing-menu__transform transform">
                <div class="transform-y-content transform-content">
                    <label class="range-label" for="Y">Ось Y</label>
                    <input class="range rangeY" type="range" min="-1000" step="1" max="2000" data-current-value="${this.rangeTextY}" data-value="Y" value="${this.rangeTextY}">
                    <div class="range-buttons">
                        <span class="range-view-value incr" data-input-value="Y">&#9650;</span>
                        <span class="range-view-value decr" data-input-value="Y">&#9660;</span>
                    </div>
                </div>
                <div class="transform-x-content transform-content">
                    <label class="range-label" for="X">Ось Х</label>
                    <input class="range rangeX" type="range" min="-1000" step="1" max="2000" data-current-value="${this.rangeTextX}" data-value="X" value="${this.rangeTextX}">
                    <div class="range-buttons">
                        <span class="range-view-value incr" data-input-value="X">&#9650;</span>
                        <span class="range-view-value decr" data-input-value="X">&#9660;</span>
                    </div>
                </div>
                <div class="transform-width-content transform-content">
                    <label class="range-label" for="Width">Ширина</label>
                    <input class="range width" type="range" min="0" max="3000" step="1" data-current-value="${this.rangeTextWh}" data-value="Width" value="${this.rangeTextWh}">
                    <div class="range-buttons">
                        <span class="range-view-value incr" data-input-value="width">&#9650;</span>
                        <span class="range-view-value decr" data-input-value="width">&#9660;</span>
                    </div>
                </div>
                <div class="transform-height-content transform-content">
                    <label class="range-label" for="Height">Высота</label>
                    <input class="range height" type="range" min="0" max="3000" step="1" data-current-value="${this.rangeTextHt}" data-value="Height" value="${this.rangeTextHt}">
                    <div class="range-buttons">
                        <span class="range-view-value incr" data-input-value="height">&#9650;</span>
                        <span class="range-view-value decr" data-input-value="height">&#9660;</span>
                    </div>
                </div>
                <div class="transform-fontSize-content transform-content">
                <label class="range-label" for="fontSize">Шрифт</label>
                <input class="range fontSize" type="range" min="0" max="500" step="1" data-current-value="${this.rangeTextFontSize}" data-value="FontSize" value="${this.rangeTextFontSize}">
                <div class="range-buttons">
                    <span class="range-view-value incr" data-input-value="fontSize">&#9650;</span>
                    <span class="range-view-value decr" data-input-value="fontSize">&#9660;</span>
                </div>
            </div>
                <div class="transform-current-value-content" hidden>
                    <input type="text" value="${this.rangeTextY}" data-duplicate-value="top"/>
                    <input type="text" value="${this.rangeTextX}" data-duplicate-value="left"/>
                    <input type="text" value="${this.rangeTextWh}" data-duplicate-value="width"/>
                    <input type="text" value="${this.rangeTextHt}" data-duplicate-value="height"/>
                    <input type="text" value="${this.rangeTextFontSize}" data-duplicate-value="fontSize"/>
                </div>
            </div>`;
        }
    }

    export class Filters {
        constructor() {
            this.filtersName = ['blur','brightness','contrast', 'hue','opacity','saturate'];
            this.defaultValue = 0;
        }
        renderFilterStyle() {
            return `
                <div class="editing-menu__filters filters">
               ${this.filtersName.map((el) => {
                    if(el === 'contrast' || el === 'brightness' || el === 'saturate' || el === 'opacity') this.defaultValue = 100;
                    if(el === 'hue' || el === 'blur') this.defaultValue = 0;
                    return`
                    <div class="filters-${el}-content filters-content">
                        <label class="filters-label" for="filters-range">${el}</label>
                        <input type="range" class="filters-range ${`filter ` + el}" min="0" max="360" step="1" data-current-value="${this.defaultValue}" data-value="${el}" value="${this.defaultValue}">
                        <div class="range-buttons">
                            <span class="range-view-value-filters incr" data-input-value="${el}">&#9650;</span>
                            <span class="range-view-value-filters decr" data-input-value="${el}">&#9660;</span>
                        </div>
                    </div>
                    `
                }).slice(',').join(' ')}
                    <div class="filters-current-value-content" hidden>
                        ${this.filtersName.map(el => {
                            if(el === 'contrast' || el === 'brightness' || el === 'saturate' || el === 'opacity') this.defaultValue = 100;
                            if(el === 'hue' || el === 'blur') this.defaultValue = 0;
                            return `<input type="text" value="${this.defaultValue}" data-duplicate-filters-value="${el}"/>`
                        }).slice(',').join(' ')}
                    </div>
                </div>
            `
        }
    }

    export class CreatNewObj {
        renderCreatInterface() {
            return `
            <h2>Добавление нового объекта/текста на страницу</h2>
            <div class="editing-menu__creat-new-object creat-object">
                <form class="creat-object__form">
                    <textarea class="creat-object__text js-new-obj-text" style="width: 100%; height:100px;" placeholder="Текст нового объекта"></textarea>
                    <input type="submit" value="Добавить" class="creat-object__add js-add-obj" />
                </form>
            </div>`
        }
    }

    export class Padding {
        constructor(){
            this.name = 'padding';
            this.styles = {
                "padding-top": 0,
                "padding-right": 0,
                "padding-bottom": 0,
                "padding-left": 0,
                "border-radius": 0
            }
        }
        renderTemp() {
            const temp = [];
            for(let key in this.styles) {
                const item = `<div class="${this.name}-${key}-content ${this.name}-content js-padding-content">
                    <label class="range-label" for="${key}">${key}</label>
                    <input class="range ${key}" type="range" min="0" max="100" step="1" data-current-value="${this.styles[key]}" data-value="${key}" value="${this.styles[key]}">
                    <div class="range-buttons">
                        <span class="range-view-value-${this.name} incr" data-input-value="${key}">&#9650;</span>
                        <span class="range-view-value-${this.name} decr" data-input-value="${key}">&#9660;</span>
                    </div>
                </div>
                `;
                temp.push(item);
            }
            return temp.slice(',').join('');
        }
    }