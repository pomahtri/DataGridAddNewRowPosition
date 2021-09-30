/**
* DevExtreme (esm/ui/tab_panel/item.js)
* Version: 21.2.1
* Build date: Thu Sep 30 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import CollectionWidgetItem from '../collection/item';
import { noop } from '../../core/utils/common';
export default class TabPanelItem extends CollectionWidgetItem {
  _renderWatchers() {
    this._startWatcher('badge', noop);

    return super._renderWatchers();
  }

}
