'use strict';
import {editingColorMenuTemplate} from '../View/menuListItem';
import {getEditingTemplate} from '../View/menuTemp';
import {getModal} from '../View/addNewObjModal';
import {CheckStyle} from '../Support/checkElements';
import {getCurrentSlideFolder} from '../Support/editingMenuOtherFunc';
import {CreatNewObj} from '../Classes/editingMenuClasses'
import Colors from '../Classes/editingMenuClasses'
import "core-js/stable";
import "regenerator-runtime/runtime";

class EditingModel {
    constructor(coll_frame_el) {
        this.collection = coll_frame_el;
        this.template = [];
        this.templateImg = [];
        this.templateAll = [];
        this.isImg = false;
        this.creatObj = new CreatNewObj();
        this.creatNewObjTemp = this.creatObj.renderCreatInterface();
        this.modal = getModal();
    }
    checkBodyObjects = function(coll_elements = null) {
        let arr = [];
        (typeof coll_elements.tagName !== 'undefined') ? arr.push(coll_elements) : arr = Array.from(coll_elements);
        arr.map(el => {
            if(CheckStyle.checkColors(el) && el.tagName !== 'BODY' && el.tagName !== 'DIV' && !CheckStyle.isStroke(el) && el.getAttribute('id')) {
                this.createEditingColorMenu(el, true);
            }
            if (CheckStyle.checkColors(el) && !CheckStyle.isSvg(el)) {
                this.createEditingColorMenu(el);
            }
            if(CheckStyle.checkTag(el)) {
                if (el.children[0].childElementCount > 0 && typeof el.children[0].children[1] !== 'undefined') {
                    const paths = Array.from(el.querySelectorAll('path'));
                    paths.unshift(el);
                    this.createEditingColorMenu(paths);
                }
                if(el.childElementCount > 0 && el.children[0].tagName === 'IMG') {
                    const img = el.querySelector('IMG');
                    const imgArr = [img];
                    imgArr.unshift(el);
                    this.createEditingColorMenu(imgArr, true);
                }
            }
            if(el.childElementCount > 0) {
                this.checkBodyObjects(el.children);
            }
        })
    }
    createEditingColorMenu = function (elementOnPage, trigger = false) {
        const id = (!Array.isArray(elementOnPage)) ? elementOnPage.id : elementOnPage[0].id;
        // const triggerType = ['image'];
        // const setTriggerType = (triggerType.indexOf(trigger) !== -1) ? true : false;

        if(Array.isArray(elementOnPage)) {
            if(trigger) {
                this.isImg = true;
                const imgArr = elementOnPage;
                let srcAttr = imgArr[1].getAttribute('src');
                (srcAttr.search('data:image/png;base64') === -1) ?
                    srcAttr = getCurrentSlideFolder() + '/' + imgArr[1].getAttribute('src') :
                    srcAttr = imgArr[1].getAttribute('src');
                const replacedImgArr = [srcAttr];
                const item = editingColorMenuTemplate( null, id,  replacedImgArr , true);
                this.templateImg.push(item);
            }
            if(!trigger){
                const pathsArr = elementOnPage;
                pathsArr.shift();
                const item = editingColorMenuTemplate( null, id,  pathsArr );
                this.template.push(item);
            }
        }
        else {
            if (trigger) {
                const currentColor = CheckStyle.checkColors(elementOnPage);
                const item = editingColorMenuTemplate( currentColor, id, false, true );
                this.templateAll.push(item);
            }
            else {
                const currentColor = (!trigger) ? CheckStyle.checkColors(elementOnPage) : '';
                const item = editingColorMenuTemplate( currentColor, id );
                this.template.push(item);
            }
        }   
    }
    checkChangeSlide = function() {
        const editingMenuContentEl = document.querySelector('.js-editing-container');
        return editingMenuContentEl === null ? true : false;
    }
    cleanEditingMenu = function() {
        const editingMenuContentEl = document.querySelector('.js-editing-container');
        editingMenuContentEl.remove();
    } 
    getEditingMenu = function() {
        return getEditingTemplate(this.template, this.templateImg,this.templateAll, this.creatNewObjTemp, this.modal );
    }
    init = function() {
        this.checkBodyObjects(this.collection);
    }
}

export default EditingModel;