/**
 * @description bulleted list menu
 * @author wangfupeng
 */

import { t } from '@cyjy-editor/core'

import { BULLETED_LIST_SVG } from '../../constants/svg'
import BaseMenu from './BaseMenu'

class BulletedListMenu extends BaseMenu {
  readonly ordered = false

  readonly title = t('listModule.unOrderedList')

  readonly iconSvg = BULLETED_LIST_SVG
}

export default BulletedListMenu
