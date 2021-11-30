'use strict';

import {Colors,Padding} from '../Classes/editingMenuClasses';
import CheckStyle from '../Support/checkElements';

export function getModal() {
    const PaddingStyles = new Padding();
    const ColorsStyles = new Colors();
    return (
        `<div class="add-new-obj-modal" hidden>
            <div class="add-new-obj-modal__wrap">
                <div class="add-new-obj-modal__content">
                    <div class="add-new-obj-modal__added-word js-added-word"></div>
                </div>
                <div class="add-new-obj-modal__styles set-styles">
                    <div class="set-styles__inputs">
                        <div class="set-styles__background-content js-background-chx">
                            <label class="checkbox-label range-label" for="checkbox-back">Подложка</label>
                            <input id="checkbox-back" class="checkbox-back checkbox" type="checkbox" value="background"/>
                        </div>
                        <div class="set-styles__fonts-content">
                            <label class="checkbox-label range-label" for="font-select">Шрифт</label>
                            <select id="font-select" class="added-settings__select-fonts js-select-fonts">
                                <option value="0" style="color: grey;" selected disabled>Шрифт</option>
                                <option value="1" name="Clarendon">Clarendon</option>
                                <option value="2" name="Roboto">Roboto</option>
                                <option value="3" name="Propisi">Propisi</option>
                                <option value="4" name="Akzidenz">Akzidenz</option>
                            </select>
                        </div>
                    </div>
                    <div class="set-styles__settings">
                        <div class="styles__padding">
                            <h2 class="styles__head add-obj-heading">Отступы</h2>
                            ${PaddingStyles.renderTemp()}
                        </div>
                        <div class="styles__colors">
                            <h2 class="styles__head add-obj-heading">Цвет подложки</h2>
                            <div class="styles__colors-content js-add-colors">
                                ${ColorsStyles.renderColors().slice(',').join('')}
                            </div>
                        </div>
                    </div>
                    <div class="add-new-obj-modal__btns">
                        <button class="add-new-obj-modal__btn js-close-modal-btn">Назад</button>
                        <button class="add-new-obj-modal__btn js-add-word-btn">Добавить на страницу</button>
                    </div>
                </div>
            </div>
        </div>
    `
    )
}