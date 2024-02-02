/* eslint-disable */
import Vue from 'vue'
import get from 'lodash/get'
import { getFileId } from '@/api/file'

import {
  type,
  isFunction,
  getFileInfo,
  formatOptions,
  guid,
  chunkFile,
  formatSize,
  log,
  isArray,
  getFileHash
} from '@/utils/uploader/utils'
import mime from 'mime-types'

const STATUS_BEFORE_UPLOAD = 0
const STATUS_UPLOADING = 1
const STATUS_UPLOAD_STOP = 2
const STATUS_UPLOAD_SUCCESS = 3
const STATUS_UPLOAD_ERROR = 4

const defaultFileOptions = {
  chunks: [],
  hash: '',
  name: '',
  size: 0,
  progress: 0,
  chunkSize: 4 * 1024 * 1024,
  chunkUploadRatio: 1,
  chunkTotal: 0,
  uploadTotal: 0,
  status: STATUS_BEFORE_UPLOAD, // 0 等待上传 1 上传中 2 暂停 3 上传成功 4 上传失败
  chunksLength: 0,
  uploadChunkApi: (...args) => Promise.resolve(...args),
  beforeUploadApi: (...args) => Promise.resolve(...args),
  fileExistsApi: (...args) => Promise.resolve(...args),
  beforeUploadData: {}
}
class FileClass {
  constructor(options) {
    options = formatOptions(options, defaultFileOptions)
    const { file, progress, chunks, hash, status, chunksLength, beforeUploadData, allowSame } = options
    this.file = file
    this.allowSame = allowSame
    this.name = encodeURIComponent(file.name)
    this.size = formatSize(file.size)
    this.type = mime.extension(file.type) || ''
    this.path = file.webkitRelativePath
    this.progress = progress
    this.chunks = chunks
    this.hash = hash
    this.status = status
    this.chunksLength = chunksLength
    this.beforeUploadData = beforeUploadData
    this.basicQuery = {}
    this.initTotal(options.chunkUploadRatio)
    const { beforeUploadApi, fileExistsApi, uploadChunkApi } = options
    this.beforeUploadApi = beforeUploadApi
    this.fileExistsApi = fileExistsApi
    this.uploadChunkApi = uploadChunkApi
    this.id = guid()
  }
  initTotal(ratio) {
    const chunkTotal = parseInt(Math.ceil((ratio / (ratio + 1)) * 100))
    const uploadTotal = 100 - chunkTotal
    this.chunkTotal = chunkTotal
    this.uploadTotal = uploadTotal
  }
  // 用来外部调用注册数据
  registerData(data) {
    this.beforeUploadData = data
  }
  async start() {
    try {
      this.status = STATUS_UPLOADING
      this.syncChunkFile()
      const path = this.path
      let basePathObj = {}
      if (path && this.beforeUploadData.basePath) {
        const targetPath =
          path
            .split('/')
            .slice(0, -1)
            .join('/') + '/'
        basePathObj.basePath = this.beforeUploadData.basePath + targetPath
      }
      this.basicQuery = { ...this.beforeUploadData, ...basePathObj, fileHash: this.hash }
      const { data: fileGuid } = await getFileId()
      // NOTE 后台无法处理特殊字符编码问题,暂时先去掉检验文件是否存在
      // const existsData = await this.testFile()
      // const { chunk_index, chunk_total, fileLinkId: fileGuid, result_type } = get(existsData, 'data', {})
      this.basicQuery = { ...this.basicQuery, fileGuid }
      // const total = this.chunks.length * 2
      // result_type === 0 没有上传 正常上传
      // result_type === 1 已经上传了一部分
      // result_type === 2 已经上传了
      // if (!this.allowSame && result_type === 2) {
      //   this.uploadProgress(total, total)
      //   this.status = STATUS_UPLOAD_SUCCESS
      //   Vue.prototype.$uploadProgress.removeFile({ basicQuery: this.basicQuery })
      //   return { linkGuid: fileGuid, fileName: decodeURIComponent(this.name) }
      // }
      let start = 0
      let end = this.chunks.length
      // if (result_type === 1) {
      //   start = chunk_index + 1
      //   end = chunk_total - 1
      // }
      this.status = STATUS_UPLOADING
      const res = await this.uploadChunk(start, end)
      this.status = STATUS_UPLOAD_SUCCESS
      Vue.prototype.$uploadProgress.removeFile({ basicQuery: this.basicQuery })
      return { linkGuid: res.linkGuid, fileName: res.fileName }
    } catch (error) {
      this.progress = 0
      this.status = STATUS_UPLOAD_ERROR
      Vue.prototype.$uploadProgress.removeFile({ basicQuery: this.basicQuery })
      throw error
    }
  }
  async testFile() {
    return await this.fileExistsApi(this.basicQuery, { fileName: this.name })
  }
  chunkProgress(index, total) {
    this.progress = parseInt(Math.ceil(((index + 1) / total) * this.chunkTotal))
  }
  uploadProgress(index, total) {
    this.progress = this.chunkTotal + parseInt(Math.ceil(((index + 1) / total) * this.uploadTotal))
  }
  async uploadChunk(start, end) {
    for (let index = start; index <= end; index++) {
      const item = this.chunks[index] || this.file
      const chunkIndex = index
      const chunkTotals = this.chunksLength
      const fileSize = this.file.size
      const file = item
      const query = { ...this.basicQuery, fileSize, chunkTotals, chunkIndex }
      const formData = new FormData()
      formData.append('file', file)
      const { data } = await this.uploadChunkApi(formData, query)
      const linkGuid = get(data, 'linkGuid', '')
      if (linkGuid) {
        this.uploadProgress(index, this.chunksLength)
        return { fileName: decodeURIComponent(this.name), linkGuid }
      }
      this.uploadProgress(index, this.chunksLength)
    }
  }
  syncChunkFile() {
    const file = this.file
    const list = []
    const fileSize = file.size
    const fileType = file.type
    const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
    const chunkSize = 4 * 1024 * 1024
    const chunkTotals = Math.ceil(fileSize / chunkSize)
    let currentChunk = 0
    while (currentChunk < chunkTotals) {
      const start = currentChunk * chunkSize
      const currentSize = start + chunkSize
      const end = currentSize >= fileSize ? fileSize : currentSize
      const currentBlob = blobSlice.call(file, start, end)
      const targetFile = new File([currentBlob], file.name, { type: fileType })
      list.push(targetFile)
      currentChunk++
    }
    this.chunks = list
    this.hash = getFileHash(this.file)
    this.chunksLength = list.length
  }
  chunkFile() {
    return chunkFile(this.file, this.chunkSize, this.chunkProgress.bind(this)).then(data => {
      const { fileChunks, fileHash } = data
      this.chunks = fileChunks
      this.hash = fileHash
      this.chunksLength = fileChunks.length
    })
  }
}

const defaultOptions = {
  chunkSize: 2 * 1024 * 1024,
  beforeUpload: (...args) => Promise.resolve(...args)
}

export class UploaderClass {
  constructor(options) {
    const params = Object.assign({}, defaultOptions, options)
    const { files, chunkSize, beforeUpload, fileExists, uploadChunk, allowSame } = params
    const allFiles = [...files].every(item => type(item) === 'file')
    if (!allFiles) {
      throw new Error('上传文件为空')
    }
    if (!isFunction(uploadChunk)) {
      throw new Error('缺少参数uploadChunk')
    }
    if (!isFunction(fileExists)) {
      throw new Error('缺少参数fileExists')
    }
    // const isLegalFileName = [...files].some(item => (item.name || '').includes('%'))
    // if (isLegalFileName) {
    //   Vue.prototype.$xxMsgBox.warning(`不允许上传包含『%』字符的文件`)
    //   throw new Error('不允许上传包含『%』字符的文件')
    // }
    this.files = [...files].map(
      file =>
        new FileClass({
          file,
          chunkSize,
          uploadChunkApi: uploadChunk,
          beforeUploadApi: beforeUpload,
          fileExistsApi: fileExists,
          allowSame
        })
    )
    this.files.forEach(element => {
      Vue.prototype.$uploadProgress.appendFile(element)
    })
    this.chunkSize = chunkSize
    this.beforeUpload = beforeUpload
    this.fileExists = fileExists
    this.uploadChunk = uploadChunk
    // return this.start()
  }
  async start() {
    debugger
    const beforeUploadData = (await this.beforeUpload()) || {}
    console.log('beforeUploadData', beforeUploadData)
    const res = []
    for (let i = 0, l = this.files.length; i < l; i++) {
      this.files[i].registerData(beforeUploadData)
      const data = await this.files[i].start(beforeUploadData)
      res.push(data)
    }
    return res
  }
  async _start(index = 0) {
    if (this.files[index]) {
      const res = await this.files[index].start()
      this._start(index + 1)
    }
  }
}
