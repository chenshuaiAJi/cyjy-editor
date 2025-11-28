/**
 * @description helper
 * @author wangfupeng
 */

import { DomEditor, IDomEditor } from '@wangeditor-next/core'
import {
  Editor, Node, Text, Transforms,
} from 'slate'

export function isMenuDisabled(editor: IDomEditor, _mark?: string): boolean {
  if (editor.selection == null) { return true }

  const [match] = Editor.nodes(editor, {
    match: n => {
      const type = DomEditor.getNodeType(n)

      if (
        editor
          .getFragment()
          .every((el: any) => el.children.every((node: any) => node.type === 'PINYIN' || node.text === ''))
      ) {
        return false
      }

      if (type === 'pre') { return true } // 代码块
      if (Editor.isVoid(editor, n)) { return true } // void node

      return false
    },
    universal: true,
  })

  // 命中，则禁用
  if (match) { return true }
  return false
}

export function removeMarks(editor: IDomEditor, textNode: Node) {
  // 遍历 text node 属性，清除样式
  const keys = Object.keys(textNode as object)

  keys.forEach(key => {
    if (key === 'text') {
      // 保留 text 属性，text node 必须的
      return
    }
    // 其他属性，全部清除
    Editor.removeMark(editor, key)
  })
}

// 移除元素节点的指定mark
export function removeNodeMarks(editor: IDomEditor, key: string) {
  if (key === 'text') {
    return
  }
  const nodeMarks = Editor.nodes(editor, {
    match: n => n[key],
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const [_node, path] of nodeMarks) {
    Transforms.unsetNodes(editor, key, { at: path })
  }
}

// 判断选中内容是否是文本
export function isSelectedAllText(editor: IDomEditor) {
  // 获取选中的所有节点
  const selectedNodes = Array.from(
    Editor.nodes(editor, {
      match: () => true,
      universal: true,
      mode: 'lowest',
    }),
  )
  // 检查是否有节点被选中

  if (selectedNodes.length === 0) {
    return false
  }
  // 检查选中的节点是否都是文本节点
  const isAllText = selectedNodes.every(([node]) => {
    if (Text.isText(node)) {
      return true
    }
    return false
  })

  return isAllText
}

/**
 * 为自定义元素设置指定mark
 * @param editor
 * @param props
 * @param marksNeedToRemove
 * @returns
 */
export function setNodeMarks(
  editor: IDomEditor,
  props: any,
  marksNeedToRemove: string[],
  nodeType: string[],
) {
  const key = Object.keys(props)[0]
  // 检查是否有选区

  if (editor.selection == null) {
    return
  }
  const markedNodesArray = Array.from(
    Editor.nodes(editor, {
      match: n => n[key],
    }),
  )
  const targetNodes = Editor.nodes(editor, {
    match: n => nodeType.includes(DomEditor.getNodeType(n)),
  })

  if (markedNodesArray.length) {
    removeNodeMarks(editor, key)
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [_node, path] of targetNodes) {
      Transforms.setNodes(editor, props, { at: path })
      // eslint-disable-next-line @typescript-eslint/no-shadow
      marksNeedToRemove.forEach(key => removeNodeMarks(editor, key))
    }
  }
}
