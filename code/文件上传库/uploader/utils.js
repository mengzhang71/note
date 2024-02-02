/* eslint-disable */
import SparkMD5 from 'spark-md5'
import cloneDeep from 'lodash/cloneDeep'
export const type = data =>
  Object.prototype.toString
    .call(data)
    .slice(8, -1)
    .toLowerCase()
export const isFunction = data => type(data) === 'function'
export const isArray = data => type(data) === 'array'
export const isPromise = obj =>
  !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
export const getFileInfo = file => {
  const { name, size, type, webkitRelativePath } = file
  return { name, size, type, webkitRelativePath }
}
export const formatOptions = (options, defaultOptions) => {
  return Object.assign(cloneDeep(defaultOptions), options, { id: guid() })
}

export const guid = (() => {
  const _guid = () => {
    let _index = 0
    return () => Math.random().toString(32) + _index++
  }
  return _guid()
})()
const CHUNK_SIZE = 4 * 1024 * 1024
export const chunkFile = (file, chunkSize = CHUNK_SIZE, progress = () => {}) => {
  return new Promise((resolve, reject) => {
    const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
    const fileSize = file.size
    const fileType = file.type
    const webkitRelativePath = file.webkitRelativePath
    const chunksTotal = Math.ceil(fileSize / chunkSize)
    let currentChunk = 0
    const spark = new SparkMD5.ArrayBuffer()
    const fileReader = new FileReader()
    const fileChunks = []

    fileReader.onload = function(e) {
      spark.append(e.target.result)
      progress(currentChunk, chunksTotal)
      currentChunk++
      // 如果存在 onSliceProgress 函数，返回当前切片百分比的数值
      if (currentChunk < chunksTotal) {
        loadNext()
      } else {
        const fileHash = spark.end()
        resolve({ fileChunks, fileHash })
      }
    }
    fileReader.onerror = function() {
      reject()
    }

    function loadNext() {
      const start = currentChunk * chunkSize
      const currentEnd = start + chunkSize
      const end = currentEnd >= fileSize ? fileSize : currentEnd
      const currentBlob = blobSlice.call(file, start, end)
      const targetFile = new File([currentBlob], file.name, {
        type: fileType
      })
      fileChunks.push({
        file: targetFile,
        chunkTotals: chunksTotal,
        chunkIndex: currentChunk,
        fileSize,
        webkitRelativePath
      })
      fileReader.readAsArrayBuffer(currentBlob)
    }
    loadNext()
  })
}
export const formatSize = size => {
  if (size < 1024) {
    return Number(size).toFixed(0) + ' bytes'
  } else if (size < 1024 * 1024) {
    return (size / 1024.0).toFixed(0) + ' KB'
  } else if (size < 1024 * 1024 * 1024) {
    return (size / 1024.0 / 1024.0).toFixed(1) + ' MB'
  } else {
    return (size / 1024.0 / 1024.0 / 1024.0).toFixed(1) + ' GB'
  }
}

export const log = (...args) => {
  const [info, ...other] = args
  // eslint-disable-next-line no-console
  // console.log(`%c${info}`, ...other, 'color:red;')
}

export const getFileHash = file => {
  let clientId = localStorage.getItem('UPLOAD_')
  if (!clientId) {
    localStorage.setItem('UPLOAD_', guid())
  }
  let info = clientId
  if (file.lastModified) {
    info += file.lastModified
  }
  if (file.name) {
    info += file.name
  }
  if (file.size) {
    info += file.size
  }
  const fileId = SparkMD5.hash(info)
  return fileId
}
