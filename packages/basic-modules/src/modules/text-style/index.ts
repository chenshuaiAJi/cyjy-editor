/**
 * @description text style entry
 * @author wangfupeng
 */

import { IModuleConf } from '@wangeditor-next/core'

import {
  boldMenuConf,
  clearStyleMenuConf,
  codeMenuConf,
  highlightSymbolsMenuConf,
  italicMenuConf,
  stressMenuConf,
  subMenuConf,
  supMenuConf,
  throughMenuConf,
  underlineMenuConf,
  wavyLineMenuConf,
} from './menu/index'
import { parseStyleHtml } from './parse-style-html'
import { renderStyle } from './render-style'
import { styleToHtml } from './style-to-html'

const textStyle: Partial<IModuleConf> = {
  renderStyle,
  menus: [
    boldMenuConf,
    underlineMenuConf,
    italicMenuConf,
    throughMenuConf,
    codeMenuConf,
    subMenuConf,
    supMenuConf,
    clearStyleMenuConf,
    highlightSymbolsMenuConf,
    stressMenuConf,
    wavyLineMenuConf,
  ],
  styleToHtml,
  parseStyleHtml,
}

export default textStyle
