/**
 * @description list module entry
 * @author wangfupeng
 */

import { IModuleConf } from '@cyjy-editor/core'

import listItemToHtmlConf from './elem-to-html'
import { bulletedListMenuConf, numberedListMenuConf } from './menu/index'
import { parseItemHtmlConf, parseListHtmlConf } from './parse-elem-html'
import withList from './plugin'
import renderListItemConf from './render-elem'

const list: Partial<IModuleConf> = {
  renderElems: [renderListItemConf],
  editorPlugin: withList,
  menus: [bulletedListMenuConf, numberedListMenuConf],
  elemsToHtml: [listItemToHtmlConf],
  parseElemsHtml: [parseListHtmlConf, parseItemHtmlConf],
}

export default list
