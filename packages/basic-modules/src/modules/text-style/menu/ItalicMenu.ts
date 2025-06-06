/**
 * @description italic menu
 * @author wangfupeng
 */

import { t } from '@cyjy-editor/core'

import { ITALIC_SVG } from '../../../constants/icon-svg'
import BaseMenu from './BaseMenu'

class ItalicMenu extends BaseMenu {
  readonly mark = 'italic'

  readonly title = t('textStyle.italic')

  readonly iconSvg = ITALIC_SVG

  readonly hotkey = 'mod+i'
}

export default ItalicMenu
