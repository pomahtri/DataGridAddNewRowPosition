/**
* DevExtreme (esm/ui/file_manager/ui.file_manager.dialog.name_editor.js)
* Version: 21.2.1
* Build date: Mon Sep 27 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../core/renderer';
import { extend } from '../../core/utils/extend';
import TextBox from '../text_box';
import FileManagerDialogBase from './ui.file_manager.dialog.js';
var FILE_MANAGER_DIALOG_NAME_EDITOR = 'dx-filemanager-dialog-name-editor';
var FILE_MANAGER_DIALOG_NAME_EDITOR_POPUP = 'dx-filemanager-dialog-name-editor-popup';

class FileManagerNameEditorDialog extends FileManagerDialogBase {
  show(name) {
    name = name || '';

    if (this._nameTextBox) {
      this._nameTextBox.option('value', name);
    } else {
      this._initialNameValue = name;
    }

    super.show();
  }

  _onPopupShown() {
    if (!this._nameTextBox) {
      return;
    }

    var $textBoxInput = this._nameTextBox._input();

    $textBoxInput.length && $textBoxInput[0].select();

    this._nameTextBox.focus();
  }

  _getDialogOptions() {
    return extend(super._getDialogOptions(), {
      title: this.option('title'),
      buttonText: this.option('buttonText'),
      contentCssClass: FILE_MANAGER_DIALOG_NAME_EDITOR,
      popupCssClass: FILE_MANAGER_DIALOG_NAME_EDITOR_POPUP
    });
  }

  _createContentTemplate(element) {
    super._createContentTemplate(element);

    this._nameTextBox = this._createComponent($('<div>'), TextBox, {
      value: this._initialNameValue,
      onEnterKey: this._applyDialogChanges.bind(this)
    });

    this._$contentElement.append(this._nameTextBox.$element());
  }

  _getDialogResult() {
    var nameValue = this._nameTextBox.option('value');

    return nameValue ? {
      name: nameValue
    } : null;
  }

  _getDefaultOptions() {
    return extend(super._getDefaultOptions(), {
      title: '',
      buttonText: ''
    });
  }

}

export default FileManagerNameEditorDialog;
