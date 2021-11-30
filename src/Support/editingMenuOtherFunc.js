'use strict';

export function getFrameEl (selector) {
    const frame = {
    "frame": document.querySelector('iframe'),
    "frameDoc": document.querySelector('iframe').contentDocument,  
    "frameBody": document.querySelector('iframe').contentDocument.body
    }
    return frame[selector] ? frame[selector] : false;
}
export function checkImgElemChildren (divs) {
    let result = null;
    Array.from(divs.children).map((el) => {
        result = (el.tagName === 'img') ? true : false;
        return result;
    })
    return result;
}


export function checkChangeSlide() {
    const editingMenuContentEl = document.querySelector('.js-editing-menu');
    if (editingMenuContentEl.childElementCount == 0) {
        return true;
    }
    else return false;
}

export function getSlidesCount(trigger = null) {
    const totalCountEl = document.querySelector('.js-slides-count');
    let replaceSlidesCount = trigger;
    (trigger !== null) ? totalCountEl.textContent =`${replaceSlidesCount}` + '/' + slides.length :
    totalCountEl.textContent = `${currentSlide + 1}` + '/' + slides.length;
}

// export function findSlide() {
//     const inputFind = document.querySelector('.js-setSlide');
//     const findSlide = inputFind.value;
//     const choiceSlide = Number(findSlide) - 1;
//     inputFind.value = '';
//     if(findSlide > slides.length) {
//         inputFind.classList.add('error-input');
//         inputFind.setAttribute('placeholder', 'Нет такого слайда');
//     }
//     else {
//         inputFind.classList.remove('error-input');
//         inputFind.setAttribute('placeholder', 'Перейти на слайд №');
//         slides.forEach((el,index) => {
//         if (index === choiceSlide) {
//             currentSlide = index;
//             let tmpSlide = typeof(currentSlide) === 'string' ? parseInt(currentSlide) : currentSlide;
//             tmpSlide++;
//             getSlidesCount(tmpSlide);
//             document.getElementById('pagenumber').innerHTML = '' + tmpSlide;
//             document.getElementById('mainFrame').src = "";
//             document.getElementById('mainFrame').src = `${dir}${slides[index]}/${slides[index]}.html`;
//         }
//         else return false;
//         })
//     }
// }

export const getCurrentSlideFolder = () => {
    const dirPos = getFrameEl('frame').src;
    const slicedDirPos = dirPos.split('/');
    slicedDirPos.pop();
    return slicedDirPos.join('/');
}
export const changeCurrentColor = (id, newColor) => {
    console.log(id, newColor)
    const editingItemEl = document.querySelectorAll('.js-menu-item');
    const editingItemArr = Array.from(editingItemEl);
    editingItemArr.forEach((el) => {
        if(el.children[0].getAttribute('data-name') === id) {
            [...el.children].map((paths) => paths.style.backgroundColor = newColor);
        }
    })
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