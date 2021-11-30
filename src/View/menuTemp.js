'use strict';

export function getEditingTemplate(list, imgList, allList, creatNewObj, modal) {
    return (
        `<div class="editing-menu js-editing-container">
            <div class="editing-menu__tools">
                <span class="editing_menu-reset-btn js-reset-btn">&#8634;</span> 
                <button class="editing_menu-toggle-obj-content active-btn toggle-btn js-obj-btn" data-type="obj">Объекты</button>
                <button class="editing_menu-toggle-img-content toggle-btn js-img-btn" data-type="img">Картинки</button>
                <button class="editing_menu-toggle-all-content toggle-btn js-all-btn" data-type="all">Все</button>
                <button class="editing_menu-toggle-add-content toggle-btn js-add-btn" data-type="add" >Добавить</button>
            </div>
            <div class="editing-menu__wrap hide">
                <div class="editing-menu__content editing-menu__content-obj content visible js-obj-content js-editing-menu visible">
                ${list.map(el => el).slice(',').join(' ')}
                </div>
                <div class="editing-menu__content editing-menu__content-img content js-img-content">
                ${imgList.map(el => el).slice(',').join(' ')}
                </div>
                <div class="editing-menu__content editing-menu__content-all content js-all-content">
                ${allList.map(el => el).slice(',').join(' ')}
                </div>
                <div class="editing-menu__content editing-menu__content-creat content js-add-content">
                    ${creatNewObj}
                </div>
                <div class="editing-menu__btn-container">
                    <input id="apply-style" class="editing-menu__btn js-apply-style" type="button" value="Применить стили">
                    <span class="js-save-status status js-error" hidden></span>
                    <span class="js-wait-response wait-response" hidden>↺</span>
                </div>
                <div class="editing-menu__discript">
                    <p>Вектор = (векторная графика svg)</p>
                    <p>Если Вектор  > 1 &#128504; - то цвет поменяется у всех (осторожно)</p>
                    <p>Если Вектор  = 1 &#128504; - то можно смело менять</p>
                    <p>Если что-то сломалось - нажать сверху &#8634;</p>
                </div>
                ${modal}
            </div>
    </div>`
    )
}