/**
 * @description register builtin modules
 * @author wangfupeng
 */

// basic-modules
import '@cyjy-editor/basic-modules/dist/css/style.css'
import '@cyjy-editor/list-module/dist/css/style.css'
// table-module
import '@cyjy-editor/table-module/dist/css/style.css'
// video-module
import '@cyjy-editor/video-module/dist/css/style.css'
// upload-image-module
import '@cyjy-editor/upload-image-module/dist/css/style.css'
// code-highlight
import '@wangeditor-next/code-highlight/dist/css/style.css'

import basicModules from '@cyjy-editor/basic-modules'
import wangEditorListModule from '@cyjy-editor/list-module'
import wangEditorTableModule from '@cyjy-editor/table-module'
import wangEditorUploadImageModule from '@cyjy-editor/upload-image-module'
import wangEditorVideoModule from '@cyjy-editor/video-module'
import { wangEditorCodeHighlightModule } from '@wangeditor-next/code-highlight'

import registerModule from './register'

basicModules.forEach(module => registerModule(module))
registerModule(wangEditorListModule)
registerModule(wangEditorTableModule)
registerModule(wangEditorVideoModule)
registerModule(wangEditorUploadImageModule)
registerModule(wangEditorCodeHighlightModule)
