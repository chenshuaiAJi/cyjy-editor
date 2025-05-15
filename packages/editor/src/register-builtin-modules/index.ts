/**
 * @description register builtin modules
 * @author wangfupeng
 */

// basic-modules
import '@cyjy-editor/basic-modules/dist/css/style.css'
import '@wangeditor-next/list-module/dist/css/style.css'
// table-module
import '@cyjy-editor/table-module/dist/css/style.css'
// video-module
import '@wangeditor-next/video-module/dist/css/style.css'
// upload-image-module
import '@cyjy-editor/upload-image-module/dist/css/style.css'
// code-highlight
import '@wangeditor-next/code-highlight/dist/css/style.css'

import basicModules from '@cyjy-editor/basic-modules'
import wangEditorTableModule from '@cyjy-editor/table-module'
import wangEditorUploadImageModule from '@cyjy-editor/upload-image-module'
import { wangEditorCodeHighlightModule } from '@wangeditor-next/code-highlight'
import wangEditorListModule from '@wangeditor-next/list-module'
import wangEditorVideoModule from '@wangeditor-next/video-module'

import registerModule from './register'

basicModules.forEach(module => registerModule(module))
registerModule(wangEditorListModule)
registerModule(wangEditorTableModule)
registerModule(wangEditorVideoModule)
registerModule(wangEditorUploadImageModule)
registerModule(wangEditorCodeHighlightModule)
