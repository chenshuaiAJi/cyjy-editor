/**
 * @description underline menu
 * @author wangfupeng
 */

import { IDomEditor, t } from '@wangeditor-next/core'

import { UNDER_LINE_SVG } from '../../../constants/icon-svg'
import {
  isSelectedAllText,
  setNodeMarks,
} from '../helper'
import BaseMenu from './BaseMenu'

class UnderlineMenu extends BaseMenu {
  readonly mark = 'underline'

  readonly marksNeedToRemove = ['wavy', 'stress'] // 增加 mark 的同时，需要移除哪些 mark （互斥，不能共存的）

  readonly title = t('textStyle.underline')

  readonly iconSvg = UNDER_LINE_SVG

  readonly hotkey = 'mod+u'

  /**
   * 执行命令
   * @param editor editor
   * @param value
   */
  exec(editor: IDomEditor, value: string | boolean) {
    console.error('undeerline1', editor)

    const { mark, marksNeedToRemove } = this

    if (!isSelectedAllText(editor)) {
      setNodeMarks(editor, { [mark]: true }, marksNeedToRemove, ['PINYIN'])
    } else if (value) {
      // 已，则取消
      editor.removeMark(mark)
    } else {
      // 没有，则执行
      editor.addMark(mark, true)
      // 移除互斥、不能共存的 marks
      if (marksNeedToRemove) {
        marksNeedToRemove.forEach(m => editor.removeMark(m))
      }
    }
  }
}

export default UnderlineMenu
