/**
 * @description render text style
 * @author wangfupeng
 */

import { Descendant } from 'slate'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jsx, VNode } from 'snabbdom'

import { addVnodeClassName, addVnodeStyle } from '../../utils/dom'
import { StyledText } from './custom-types'

/**
 * 添加样式
 * @param node slate text
 * @param vnode vnode
 * @returns vnode
 */
export function renderStyle(node: Descendant, vnode: VNode): VNode {
  const {
    bold, italic, code, through, sub, sup, wavy, stress, highlightSymbols, underline,
  } = node as StyledText
  let styleVnode: VNode = vnode

  // color bgColor 在另外的菜单

  if (bold) {
    styleVnode = <strong>{styleVnode}</strong>
  }
  if (code) {
    styleVnode = <code>{styleVnode}</code>
  }
  if (italic) {
    styleVnode = <em>{styleVnode}</em>
  }
  if (sup) {
    styleVnode = <sup>{styleVnode}</sup>
  }
  if (through) {
    styleVnode = <s>{styleVnode}</s>
  }
  if (sub) {
    styleVnode = <sub>{styleVnode}</sub>
  }
  if (underline) {
    styleVnode = <u>{styleVnode}</u>
  } else if (wavy) {
    addVnodeStyle(styleVnode, { textDecoration: 'underline wavy' })
  }

  if (stress) {
    addVnodeStyle(styleVnode, { textEmphasis: 'dot' })
    addVnodeStyle(styleVnode, { textEmphasisPosition: 'under' })
  }

  // 高亮用：获取叶子节点

  if (highlightSymbols) {
    addVnodeClassName(styleVnode, highlightSymbols)
  }

  return styleVnode
}
