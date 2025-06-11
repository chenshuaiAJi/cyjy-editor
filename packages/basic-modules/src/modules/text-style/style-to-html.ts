/**
 * @description text to html
 * @author wangfupeng
 */

import { Descendant, Text } from 'slate'

import $, {
  getOuterHTML, isPlainText, outerHtmlTag,
} from '../../utils/dom'
import { StyledText } from './custom-types'

// 【注意】color bgColor fontSize fontFamily 在另外的菜单

/**
 * 生成加了样式的 text html
 * @param textNode textNode
 * @param html text html
 */
function genStyledHtml(textNode: Descendant, html: string): string {
  let styledHtml = html
  let $text
  const {
    bold, italic, code, through, sub, sup, wavy, stress, highlightSymbols, underline, diffSymbols,
  } = textNode as StyledText

  if (bold) { styledHtml = `<strong>${styledHtml}</strong>` }
  if (code) { styledHtml = `<code>${styledHtml}</code>` }
  if (italic) { styledHtml = `<em>${styledHtml}</em>` }
  if (sup) { styledHtml = `<sup>${styledHtml}</sup>` }
  if (through) { styledHtml = `<s>${styledHtml}</s>` }
  if (sub) { styledHtml = `<sub>${styledHtml}</sub>` }
  if (underline) {
    styledHtml = `<span><u>${styledHtml}</u></span>`
    $text = $(styledHtml)
    $text.css('text-decoration', 'underline')
    styledHtml = getOuterHTML($text)
  } else if (wavy) {
    if (!outerHtmlTag(styledHtml, 'span')) {
      styledHtml = `<span>${styledHtml}</span>`
    }
    $text = $(styledHtml)
    $text.css('text-decoration', 'underline wavy')
    styledHtml = getOuterHTML($text)
  }
  if (stress) {
    if (!outerHtmlTag(styledHtml, 'span')) {
      styledHtml = `<span>${styledHtml}</span>`
    }
    $text = $(styledHtml)
    $text.css('text-emphasis', 'dot')
    $text.css('text-emphasis-position', 'under')
    styledHtml = getOuterHTML($text)
  }
  // 设置高亮符号
  if (highlightSymbols) {
    if (!outerHtmlTag(styledHtml, 'span')) {
      styledHtml = `<span>${styledHtml}</span>`
    }
    $text = $(styledHtml)
    $text.addClass(highlightSymbols)
    styledHtml = getOuterHTML($text)
  }
  // 设置 diff 符号
  if (diffSymbols) {
    $text = $(styledHtml)
    $text.addClass(`diff-${diffSymbols.type}`)
    styledHtml = getOuterHTML($text)
  }
  return styledHtml
}

/**
 * style to html
 * @param textNode slate text node
 * @param textHtml text html
 * @returns styled html
 */
export function styleToHtml(textNode: Descendant, textHtml: string): string {
  if (!Text.isText(textNode)) { return textHtml }

  if (isPlainText(textHtml)) {
    // textHtml 是纯文本，而不是 html tag
    return genStyledHtml(textNode, textHtml)
  }
  const $text = $(textHtml)
  let innerHtml = $text.html()

  innerHtml = genStyledHtml(textNode, innerHtml)
  $text.html(innerHtml)
  return getOuterHTML($text)
}
