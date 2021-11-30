'use strict';
import {Colors, Transform, Filters} from '../Classes/editingMenuClasses';
import {CheckStyle} from '../Support/checkElements';

export const editingColorMenuTemplate = (color = null, id, isArray = false, trigger = false) => {
    const colorsList = new Colors();
    const position = CheckStyle.checkPos(id);
    const transformList = new Transform(position);
    const filtersList = new Filters();
    let template = '';

    if (isArray && !trigger) {
        template = `
        <div class="editing-menu__list-item js-editing-menu-content">
            <div class="editing-menu__item js-menu-item">
                <span class="elem-id" data-name="${id}">${id}</span>
                ${isArray.map(el => {
                if (!CheckStyle.isStroke(el)) {
                    const color = CheckStyle.checkColors(el);
                    return `<span class="elem-current-clr" style="background-color: ${color}"></span>`;
                }
                }).slice(',').join(' ')
            }
            </div>
            <ul class="editing-menu__list-colors">
             ${colorsList.renderColors().slice(',').join(' ')}
            </ul>
            <span class="editing-menu__transform-head" data-head="transform">Позиция / Размер</span>
                ${transformList.renderTransformStyle()}
            <span class="editing-menu__filter-head" data-head="filters">Фильтры</span>
                ${filtersList.renderFilterStyle()}
        </div>`;  
    }
    if (!isArray) {
        template = `
        <div class="editing-menu__list-item js-editing-menu-content">
            <div class="editing-menu__item js-menu-item">
                <span class="elem-id" data-name="${id}">${id}</span>
                <span class="elem-current-clr" style="background-color:${color}"></span>
            </div>
            <ul class="editing-menu__list-colors">
                ${colorsList.renderColors().slice(',').join(' ')}
            </ul>
            <span class="editing-menu__transform-head" data-head="transform">Позиция / Размер</span>
                ${transformList.renderTransformStyle()}
            <span class="editing-menu__filter-head" data-head="filters">Фильтры</span>
                ${filtersList.renderFilterStyle()}
        </div>`;  
    }
    if (!isArray && trigger) {
        template = `
        <div class="editing-menu__list-item js-editing-menu-content">
            <div class="editing-menu__item js-menu-item">
                <span class="elem-id" data-path="true" data-name="${id}">${id}</span>
                <span class="elem-current-clr" style="background-color:${color}"></span>
            </div>
            <ul class="editing-menu__list-colors">
                ${colorsList.renderColors().slice(',').join(' ')}
            </ul>
            <span class="editing-menu__filter-head" data-head="filters">Фильтры</span>
                ${filtersList.renderFilterStyle()}
        </div>`;   
    }
    if(isArray && trigger) {
        template = `
        <div class="editing-menu__list-item js-editing-menu-content">
            <div class="editing-menu__item js-menu-item">
                <span class="elem-id" data-name="${id}">${id}</span>
                <img class="editing-menu_img" src="${isArray[0]}"/>
            </div>
            <span class="editing-menu__transform-head" data-head="transform">Позиция / Размер</span>
                ${transformList.renderTransformStyle()}
            <span class="editing-menu__filter-head" data-head="filters">Фильтры</span>
                ${filtersList.renderFilterStyle()}
        </div>`
        }
return template;

}