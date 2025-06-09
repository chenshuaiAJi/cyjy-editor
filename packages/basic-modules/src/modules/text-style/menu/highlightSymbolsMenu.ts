import {
  IButtonMenu,
  IDomEditor,
} from '@cyjy-editor/core'
import {
  Editor,
  Path,
  Text,
  Transforms,
} from 'slate'

import { HIGHLIGHT_SYMBOLS_ICON } from '../constants/icon-svg'
import { isMenuDisabled } from '../helper'

class HighlightSymbolsMenu implements IButtonMenu {
  readonly mark = 'highlightSymbols'

  readonly title = '高亮标点'

  readonly iconSvg = HIGHLIGHT_SYMBOLS_ICON

  readonly tag = 'button'

  /**
   * 获取：是否有 mark
   * @param editor editor
   */
  getValue(editor: IDomEditor): string | boolean {
    const mark = this.mark
    const curMarks = Editor.marks(editor)

    if (curMarks) {
      return curMarks[mark]
    }
    const [match] = Editor.nodes(editor, {
      // @ts-ignore
      match: n => ['highlight-space', 'highlight-en-punctuation', 'highlight-zh-punctuation'].includes(
        n[mark],
      ),
    })

    return !!match
  }

  isActive(editor: IDomEditor): boolean {
    const isMark = this.getValue(editor)

    return !!isMark
  }

  isDisabled(editor: IDomEditor): boolean {
    return isMenuDisabled(editor, this.mark)
  }

  /**
   * 执行命令
   * @param editor editor
   * @param value
   */
  exec(editor: IDomEditor, _value: string | boolean) {
    const { mark } = this

    editor.emit('loadingEditor', true)
    editor.selectAll()
    const spaceRegex = /\s/g
    const englishPunctuationRegex = /[.,;!?():"'–—…[\]{}<>]/g
    const chinesePunctuationRegex = /[。，？！、；：“”‘’（）——…《》〈〉【〔〕～】]/g
    const nodesToUpdate: { path: any; newTextNodeList: any[] }[] = []
    // 获取所有文本内容的节点
    const textNodes = Editor.nodes(editor, {
      match: n => Text.isText(n),
      universal: true,
    })
    const [match] = Editor.nodes(editor, {
      // @ts-ignore
      match: n => ['highlight-space', 'highlight-en-punctuation', 'highlight-zh-punctuation'].includes(
        n[mark],
      ),
    })

    for (const [node, path] of textNodes) {
      // @ts-ignore
      const { text, highlightSymbols } = node
      const newTextNodeList = text
        .split(/(\s+|[.,;!?():"'–—…[\]{}<>]|[。，？！、；：“”‘’（）——…《》〈〉【〔〕～】])/)
        .map(newTextNode => ({
          ...node,
          text: newTextNode,
          highlightSymbols: highlightSymbols as string | undefined,
        }))

      newTextNodeList.forEach(newTextNode => {
        if (match && match.length) {
          delete newTextNode.highlightSymbols
        } else if (spaceRegex.test(newTextNode.text) && !highlightSymbols) {
          newTextNode.highlightSymbols = 'highlight-space'
        } else if (englishPunctuationRegex.test(newTextNode.text) && !highlightSymbols) {
          newTextNode.highlightSymbols = 'highlight-en-punctuation'
        } else if (chinesePunctuationRegex.test(newTextNode.text) && !highlightSymbols) {
          newTextNode.highlightSymbols = 'highlight-zh-punctuation'
        } else {
          delete newTextNode.highlightSymbols
        }
      })
      nodesToUpdate.push({ path, newTextNodeList })
    }
    // 获取当前节点的父节点，并将当前节点替换为 newTextNodeList
    if (nodesToUpdate && nodesToUpdate.length) {
      // 节点内容倒序排序
      nodesToUpdate.sort((a, b) => Path.compare(b.path, a.path))
      Editor.withoutNormalizing(editor, () => {
        nodesToUpdate.forEach(({ path, newTextNodeList }) => {
          Transforms.removeNodes(editor, { at: path })
          Transforms.insertNodes(editor, newTextNodeList, { at: path })
        })
      })
    }
    Editor.normalize(editor)
    editor.emit('loadingEditor', false)
    editor.deselect()
  }
}

export default HighlightSymbolsMenu
