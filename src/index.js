'use strict';

import EditingModel from './Model/EditingModel';
import RequestModel from './Model/RequestModel';
import './assets/css/style.css';
import {getFrameEl} from './Support/editingMenuOtherFunc';
import {
    onToggleStyleSectionBtnClick, 
    onListItemColorChangeClick as handler,
    onToggleViewContentClick,
    onChangeInputsValueClick,
    onChangeInputsFiltersValueClick,
    onToggleMainMenuWindowKeyDown,
    onResetSlideBtnClick,
    onAddNewObjBtnClick,
    onModalCloseBtnClick,
    onToggleModalSettingsClick,
    onListColorsElClick,
    onSelectFontChange,
    onPaddingRangeChangePaddingStyleChange,
    onModalSendBtnClick
} from './Handlers/handlers.js';

function initEditingMenu() {
    let link = window.location.search;
    link = link.split('&').indexOf('colors=1');

    if (link !== -1) {
        const body = document.querySelector('body');
        window.addEventListener('load', function(ev) {
            getFrameEl('frame').addEventListener('load', function(ev) {
                const frameBodyEl = getFrameEl('frameBody');
                const Model = new EditingModel(frameBodyEl);
                const checked = Model.checkChangeSlide();
                if (checked) {
                    Model.init();
                    RequestModel.add();
                    const edInterface = Model.getEditingMenu();
                    body.insertAdjacentHTML('afterbegin', edInterface);
                }
                else {
                    Model.cleanEditingMenu();
                    Model.init();
                    RequestModel.clean();
                    RequestModel.add();
                    const edInterface = Model.getEditingMenu();
                    body.insertAdjacentHTML('afterbegin', edInterface);
                }

                const tabFilterBtn = document.querySelectorAll('.editing-menu__filter-head');
                const tabTransformBtn = document.querySelectorAll('.editing-menu__transform-head');
                const filtersEl = document.querySelectorAll('.filters-content');
                const transformEl = document.querySelectorAll('.transform-content');
                const colorsListsEl = document.querySelectorAll('.editing-menu__list-colors');
                const changeViewImgBtnEl = document.querySelector('.js-img-btn');
                const changeViewAllBtnEl = document.querySelector('.js-all-btn');
                const changeViewObjBtnEl = document.querySelector('.js-obj-btn');
                const changeViewAddBtnEl = document.querySelector('.js-add-btn');
                const arrowBtns = document.querySelectorAll('.range-view-value');
                const arrowFiltersBtns = document.querySelectorAll('.range-view-value-filters');
                const applyBtn = document.querySelector('.js-apply-style');
                const addNewObjBtnEl = document.querySelector('.js-add-obj');
                const resetBtn = document.querySelector('.js-reset-btn');
                const modalCloseBtnEl = document.querySelector('.js-close-modal-btn');
                const modalSendBtnEl = document.querySelector('.js-add-word-btn');
                const backgrChxEl = document.querySelector('.js-background-chx');
                const selectFontsEl = document.querySelector('.js-select-fonts');
                const addNewObjColorsWrapper = document.querySelector('.js-add-colors');
                const paddingContentEl = document.querySelectorAll('.js-padding-content');
                Array.from(tabTransformBtn).forEach(tab => tab.addEventListener('click', onToggleStyleSectionBtnClick));
                Array.from(tabFilterBtn).forEach(tab => tab.addEventListener('click', onToggleStyleSectionBtnClick));
                Array.from(colorsListsEl).forEach(item => item.addEventListener('click', handler));
                Array.from(transformEl).forEach(item => item.addEventListener('change', handler));
                Array.from(filtersEl).forEach(item => item.addEventListener('change', handler));
                Array.from(arrowBtns).forEach(btn => btn.addEventListener('click', onChangeInputsValueClick));
                Array.from(arrowFiltersBtns).forEach(btn => btn.addEventListener('click', onChangeInputsFiltersValueClick));
                Array.from(paddingContentEl).forEach(el => el.addEventListener('change', onPaddingRangeChangePaddingStyleChange));
                changeViewImgBtnEl.addEventListener('click', onToggleViewContentClick);
                changeViewAllBtnEl.addEventListener('click', onToggleViewContentClick);
                changeViewObjBtnEl.addEventListener('click', onToggleViewContentClick);
                changeViewAddBtnEl.addEventListener('click', onToggleViewContentClick);
                applyBtn.addEventListener('click', RequestModel.handler);
                resetBtn.addEventListener('click', onResetSlideBtnClick);
                addNewObjBtnEl.addEventListener('click',onAddNewObjBtnClick);
                modalCloseBtnEl.addEventListener('click',onModalCloseBtnClick);
                backgrChxEl.addEventListener('click',onToggleModalSettingsClick);
                addNewObjColorsWrapper.addEventListener('click',onListColorsElClick);
                selectFontsEl.addEventListener('change',onSelectFontChange);
                // modalSendBtnEl.addEventListener('click',onModalSendBtnClick);
            })
        })
        window.addEventListener('keydown', onToggleMainMenuWindowKeyDown);
    }
}


initEditingMenu();



