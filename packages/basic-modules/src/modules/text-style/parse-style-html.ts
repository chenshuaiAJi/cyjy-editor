/**
 * @description parse style html
 * @author wangfupeng
 */

import { IDomEditor } from '@cyjy-editor/core'
import { Descendant, Text } from 'slate'

import $, {
  Dom7Array, DOMElement, getClassValue,
  getDataValue,
  getStyleValue,
} from '../../utils/dom'
import { StyledText } from './custom-types'

/**
 * $text 是否匹配 tags
 * @param $text $text
 * @param selector selector 如 'b,strong' 或 'sub'
 */
function isMatch($text: Dom7Array, selector: string): boolean {
  if ($text.length === 0) { return false }

  if ($text[0].matches(selector)) { return true }

  if ($text.find(selector).length > 0) { return true }

  return false
}

export function parseStyleHtml(
  textElem: DOMElement,
  node: Descendant,
  _editor: IDomEditor,
): Descendant {
  const $text = $(textElem)

  if (!Text.isText(node)) { return node }

  const textNode = node as StyledText

  // bold
  if (isMatch($text, 'b,strong')) {
    textNode.bold = true
  }

  // italic
  if (isMatch($text, 'i,em')) {
    textNode.italic = true
  }

  // underline
  if (isMatch($text, 'u') || getStyleValue($text, 'text-decoration') === 'underline') {
    textNode.underline = true
  } else if (getStyleValue($text, 'text-decoration') === 'underline wavy') {
    textNode.wavy = true
  }

  // through
  if (isMatch($text, 's,strike')) {
    textNode.through = true
  }

  // sub
  if (isMatch($text, 'sub')) {
    textNode.sub = true
  }

  // sup
  if (isMatch($text, 'sup')) {
    textNode.sup = true
  }

  // code
  if (isMatch($text, 'code')) {
    textNode.code = true
  }

  const stress = `${getStyleValue($text, 'text-emphasis')},${getStyleValue(
    $text,
    'text-emphasis-position',
  )}`

  if (stress && stress !== ',') {
    textNode.stress = true
  }

  const highlightSymbols = getClassValue($text) as StyledText['highlightSymbols']

  if (highlightSymbols) {
    textNode.highlightSymbols = highlightSymbols as any
  }

  const diffSymbols = getDataValue($text, 'diffKey')

  if (diffSymbols) {
    // @ts-ignore
    textNode.diffSymbols = {
      type: diffSymbols.split('-')[0],
      key: diffSymbols.split('-')[1],
    } as StyledText['diffSymbols']
  }

  return textNode
}
