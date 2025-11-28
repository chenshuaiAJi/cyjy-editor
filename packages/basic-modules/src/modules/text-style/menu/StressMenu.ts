import { IButtonMenu, IDomEditor } from '@wangeditor-next/core'
import { Editor } from 'slate'

import { STRESS_ICON } from '../constants/icon-svg'
import { isMenuDisabled, isSelectedAllText, setNodeMarks } from '../helper'

class StressMenu implements IButtonMenu {
  protected readonly marksNeedToRemove: string[] = [] // 增加 mark 的同时，需要移除哪些 mark （互斥，不能共存的）

  readonly mark = 'stress'

  readonly title = '着重符'

  readonly iconSvg = STRESS_ICON

  readonly tag = 'button'

  /**
   * 获取：是否有 mark
   * @param editor editor
   */
  getValue(editor: IDomEditor): string | boolean {
    const mark = this.mark
    const curMarks = Editor.marks(editor)
    // @ts-ignore

    if (curMarks && curMarks[mark]) { return curMarks[mark] }
    return ''
  }

  isActive(editor: IDomEditor): boolean {
    const isMark = this.getValue(editor)

    return !!isMark
  }

  isDisabled(editor: IDomEditor): boolean {
    return isMenuDisabled(editor)
  }

  /**
   * 执行命令
   * @param editor editor
   * @param value
   */
  exec(editor: IDomEditor, value: string | boolean) {
    const { mark, marksNeedToRemove } = this

    if (!isSelectedAllText(editor)) {
      setNodeMarks(editor, { [mark]: 'dot,under' }, marksNeedToRemove, ['PINYIN'])
    } else if (value) {
      // 已，则取消
      editor.removeMark(mark)
    } else {
      // 没有，则执行
      editor.addMark(mark, 'dot,under')
      // 移除互斥、不能共存的 marks
      if (marksNeedToRemove) {
        marksNeedToRemove.forEach(m => editor.removeMark(m))
      }
    }
  }
}

export default StressMenu
