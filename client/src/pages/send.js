import React, { useState } from 'react'
import useSWR from 'swr'
import XLSX from 'xlsx'
import { useForm } from 'react-hook-form'

import './send.module.scss'

const SendPage = () => {
  const { data: templates } = useSWR('/api/templates')
  const { register, handleSubmit, watch, setValue } = useForm()

  register('fields')
  const fields = watch('fields')

  const onSubmit = (data) => {
    data.fields = JSON.stringify(data.fields)

    fetch('/api/send', {
      method: 'POST',
      body: new URLSearchParams(data)
    })
  }

  return (
    <>
      <h1>File Upload Demo</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <select name="template" ref={register}>
          {templates?.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>

        <label>
          Subject:
          <input name="subject" ref={register} />
        </label>

        <textarea
          as="textarea"
          rows="10"
          readOnly
          value={JSON.stringify(fields, null, 4)}
        />
        <input
          name="fields"
          type="file"
          accept=".XLSB,.XLSX,.XLSM,.XLS,.XML,.CSV"
          onChange={(e) => {
            if (!e.target.files) return

            const file = e.target.files[0]
            const reader = new FileReader()

            reader.onload = () => {
              let res

              switch (file.type) {
                case 'text/csv':
                  // yoink: https://stackoverflow.com/questions/27979002/convert-csv-data-into-json-format-using-javascript
                  const lines = new TextDecoder('utf-8')
                    .decode(reader.result)
                    .trim()
                    .split('\n')
                  const headers = lines.shift().split(',')

                  res = lines.map((line) => {
                    let obj = {}

                    line.split(',').forEach((value, i) => {
                      obj[headers[i]] = value
                    })

                    return obj
                  })

                  break
                case 'application/vnd.ms-excel':
                case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                  // TODO: Implement multiple sheets (only using first one rn)
                  const wb = XLSX.read(reader.result, { type: 'array' })
                  const sheet = wb.Sheets[wb.SheetNames[0]]
                  res = XLSX.utils.sheet_to_json(sheet)

                  break
                default:
                  break
              }

              setValue('fields', res)
            }

            reader.readAsArrayBuffer(e.target.files[0])
          }}
        />

        <label>
          Email column:
          <select name="emailKey" ref={register}>
            {fields &&
              Object.keys(fields[0]).map((column, i) => (
                <option key={i}>{column}</option>
              ))}
          </select>
        </label>

        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default SendPage
