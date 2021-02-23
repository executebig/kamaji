import React, { useState } from 'react'
import useSWR from 'swr'
import { Editor, EditorState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'

import 'draft-js/dist/Draft.css'

const TemplatePage = () => {
  const { data: templates } = useSWR('/api/templates')
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )

  return (
    <>
      <div>
        <h1>My templates</h1>
        {JSON.stringify(templates)}
      </div>

      <Editor
        editorState={editorState}
        onChange={(e) => {
          setEditorState(e)
          console.log()
        }}
      />
      <form
        id="form"
        action="/api/templates"
        method="post"
        onSubmit={(e) => {
          e.target.querySelector('input[name=content]').value = stateToHTML(
            editorState.getCurrentContent()
          )
        }}
      >
        <input type="hidden" name="content" />

        <input name="name" type="text" />
        <input name="engine" type="text" />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

// <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
// <script>
//   Quill.prototype.getHtml = function () {
//     return this.container.querySelector('.ql-editor').innerHTML
//   }

//   const quill = new Quill('#editor', {
//     theme: 'snow'
//   })

//   const form = document.querySelector('#form')

//   form.addEventListener('submit', () => {
//     form.querySelector('input[name="content"]').value = "" + quill.getHtml()
//   })
// </script>

export default TemplatePage
