'use strict';
import {getFrameEl} from './editingMenuOtherFunc';

export const CheckStyle = (function() {

    const checkPosition = elem => {
        const reg = new RegExp('px|%|auto|deg');
        const isBody = elem.search(/publication/);
        let currentEl = null;
        if (isBody === 0) {
            currentEl = getFrameEl("frameDoc").querySelector(`#${elem}`);
        }
        else {
            currentEl = getFrameEl("frameBody").querySelector(`#${elem}`);
        }
    
        let topStr = window.getComputedStyle(currentEl,null).top;
        let leftStr = window.getComputedStyle(currentEl,null).left;
        let widthStr = window.getComputedStyle(currentEl,null).width;
        let heightStr = window.getComputedStyle(currentEl,null).height;
        let fontSizeStr = window.getComputedStyle(currentEl,null).fontSize;
        let pos = topStr.match(reg);
        let pos1 = leftStr.match(reg);
        let pos2 = widthStr.match(reg);
        let pos3 = heightStr.match(reg);
        let pos4 = fontSizeStr.match(reg);
        if (pos !== null && pos1 !== null) {
            let top = topStr.slice(0, pos.index);
            let left = leftStr.slice(0, pos1.index);
            let width = widthStr.slice(0, pos2.index);
            let height = heightStr.slice(0, pos3.index);
            let font = fontSizeStr.slice(0, pos4.index);
            return {
                top: top,
                left: left,
                width: width,
                height: height,
                fontSize: font
            }
        }
    }
    const checkFilters = elem => {
        const reg = new RegExp('px|%|auto|deg');
        let currentEl = null;
        if (typeof elem === 'string') {
            currentEl = getFrameEl("frameDoc").querySelector(`#${elem}`);
        }
        else {
            currentEl = getFrameEl("frameBody").querySelector(`#${elem.id}`);
        }
        let filters = window.getComputedStyle(currentEl,null).filter.split(' ');

    }
    const checkPadding = elem => {
        const reg = new RegExp('px|%|auto|deg');
        let currentEl = null;
        if (typeof elem === 'string') {
            currentEl = getFrameEl("frameDoc").querySelector(`#${elem}`);
        }
        else {
            currentEl = getFrameEl("frameBody").querySelector(`#${elem.id}`);
        }
        let paddingTop = window.getComputedStyle(currentEl,null).paddingTop;
        let paddingRight= window.getComputedStyle(currentEl,null).paddingRight;
        let paddingBottom = window.getComputedStyle(currentEl,null).paddingBottom;
        let paddingLeft = window.getComputedStyle(currentEl,null).paddingLeft;
        let pos = paddingTop.match(reg);
        let pos1 = paddingRight.match(reg);
        let pos2 = paddingBottom.match(reg);
        let pos3 = paddingLeft.match(reg);
        if (pos !== null && pos1 !== null) {
            let top = paddingTop.slice(0, pos.index);
            let right = paddingRight.slice(0, pos1.index);
            let bottom = paddingBottom.slice(0, pos2.index);
            let left = paddingLeft.slice(0, pos3.index);
            return {
                top: top,
                right: right,
                bottom: bottom,
                left: left,
            }
        }
    }
  
    const isStroke = elem => {
        return elem.getAttribute('stroke') !== null ? true : false;
    }
    const isSvg = elem => {
        return elem.tagName === "svg" || elem.tagName === "path" ? true : false;
    }
    const checkColors = elem => {
        const EMPTY_COLOR = 'rgba(0, 0, 0, 0)';
        const EMPTY_COLOR_2 = 'rgb(0, 0, 0)';
        if (elem.tagName === 'path' && window.getComputedStyle(elem, null).fill !== EMPTY_COLOR) {
           return window.getComputedStyle(elem, null).fill;
        }
        if (elem.tagName === 'DIV' && window.getComputedStyle(elem, null).backgroundColor !== EMPTY_COLOR) {
            return window.getComputedStyle(elem, null).backgroundColor;
        }
        if (elem.tagName === 'DIV' && window.getComputedStyle(elem, null).color !== EMPTY_COLOR_2) {
            return window.getComputedStyle(elem, null).color;
        }
        if (elem.tagName === 'BODY' && window.getComputedStyle(elem, null).backgroundColor !== EMPTY_COLOR) {
            return window.getComputedStyle(elem, null).backgroundColor;
        }
        if (elem.tagName === 'SPAN' && window.getComputedStyle(elem, null).color !== EMPTY_COLOR) {
            return window.getComputedStyle(elem, null).color;
        }
        
        else return false;
    }
    const checkDivsElemChildren = tag => {
        const approveParentsTags = ['DIV', 'SPAN', 'SECTION', 'ARTICLE', 'P', 'MAIN'];
        const approveChildTags = ['svg', 'IMG'];
        let result = null;
        if (approveParentsTags.indexOf(tag.tagName) === 0) {
            Array.from(tag.children).forEach(el => approveChildTags.indexOf(el.tagName) !== -1 ? result = true : result = false);
            return result;
        }
    }

    return {
        checkTag: checkDivsElemChildren,
        checkColors: checkColors,
        checkPos: checkPosition,
        isStroke: isStroke,
        isSvg: isSvg
    }
}())