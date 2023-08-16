## 日报

已完成：

​	1.对比projectDetailPage注意fillDeclare的不同之处和加了哪些逻辑，手写fillDeclare页面及逻辑，手写了部分TreeFile2逻辑，

​	2.了解整理了Blob的一些知识，使用了el-steps步骤条

未完成：

​	TreeFile2页面及剩余的逻辑手写，预览windowPreview页面及逻辑手写

下次任务：

​	界面的查询和新增以及点击会显数据详情，移动端



treeflile还是有很多东西没看的，它里面的upload的方法也不一样，右键菜单删除键和文件右边（两者一致）的功能的实现

## fillDeclare

```js
formInfo
: 
"{\"id\":\"1681562516561334275\",\"keyDigNumGather\":\"414438843722563584\",\"formId\":49,\"subId\":\"1681562516561334276\",\"subCaption\":\"项目申报-1\",\"userId\":\"0\",\"createTime\":\"2023-07-19T07:12:00.459Z\",\"lastUpdateTime\":\"2023-07-19T07:12:00.459Z\",\"tableVersion\":\"1\"}"
projectType
: 
"生猪标准化养殖基地新建项目"
subParams
: 
"{\"keyDigNumGather\":\"414438843722563584\",\"keyNumGather\":null,\"keyTypeCode\":2,\"opTypeName\":null,\"boxType\":2,\"procDefId\":\"op_2:1:1569864797661564928\",\"taskTheoryEndTime\":null,\"taskTodo\":true,\"stateEnum\":1,\"roles\"

```



***双屏预览是啥

 :doubleScreenPreview="doubleScreenPreview"

**

这个页面里没有挂载init，它数据怎么就显示了





[前端文件流、切片下载和上传：优化文件传输效率与用户体验 - 掘金 (juejin.cn)](https://juejin.cn/post/7255189826226602045)





## TreeFile2

**为什么文件右键会比之前的多了重命名下载

通过不允许点击文件夹实现禁用上传等--

**那么是     怎么实现的

```js
  @contextmenu="contextMenuFliter(data)"
  v-context-menu="{ contextMenu, data }"
```

```js
 contextMenuFliter (data: any) {
```

右键点击时给contextMenu做个过滤，再用插件显示过滤后的菜单





**v-context-menu 有什么好的文档可以看的吗

[vue3+ts开发vue3-context-menu插件 - 掘金 (juejin.cn)](https://juejin.cn/post/6974596228914872350?searchId=202307191727067A339FB81AB9CD657070)

## Blob

**一、Blob 是什么**

Blob（Binary Large Object）表示二进制类型的大对象。在数据库管理系统中，将二进制数据存储为一个单一个体的集合。Blob 通常是影像、声音或多媒体文件。**在 [JavaScript](https://link.zhihu.com/?target=http%3A//caibaojian.com/t/javascript) 中 Blob 类型的对象表示不可变的类似文件对象的原始数据。**



### **2.2 属性**

前面我们已经知道 Blob 对象包含两个属性：[·](https://link.zhihu.com/?target=http%3A//caibaojian.com/blob.html)

- size（只读）：表示 `Blob` 对象中所包含数据的大小（以字节为单位）。
- type（只读）：一个字符串，表明该 `Blob` 对象所包含数据的 MIME 类型。如果类型未知，则该值为空字符串。

### **2.3 方法**

- slice([start[, end[, contentType]]])：返回一个新的 Blob 对象，包含了源 Blob 对象中指定范围内的数据。
- stream()：返回一个能读取 blob 内容的 `ReadableStream`。
- text()：返回一个 Promise 对象且包含 blob 所有内容的 UTF-8 格式的 `USVString`。
- arrayBuffer()：返回一个 Promise 对象且包含 blob 所有内容的二进制格式的 `ArrayBuffer`。

这里我们需要注意的是，**`Blob` 对象是不可改变的**。我们不能直接在一个 Blob 中更改数据，但是我们可以对一个 Blob 进行分割，从其中创建新的 Blob 对象，将它们混合到一个新的 Blob 中。这种行为类似于 JavaScript 字符串：我们无法更改字符串中的字符，但可以创建新的更正后的字符串。



### **三、Blob 使用场景**

### **3.1 分片上传**

File 对象是特殊类型的 Blob，且可以用在任意的 Blob 类型的上下文中。所以针对大文件传输的场景，我们可以使用 slice 方法对大文件进行切割，然后分片进行上传，具体示例如下

### **3.2 从互联网下载数据**

我们可以使用以下方法从互联网上下载数据并将数据存储到 Blob 对象中，

### **3.3 Blob 用作 URL**

Blob 可以很容易的作为 `<a>`、`<img>` 或其他标签的 URL，多亏了 `type` 属性，我们也可以上传/下载 `Blob` 对象。下面我们将举一个 Blob 文件下载的示例，不过在看具体示例前我们得简单介绍一下 Blob URL。

**1.Blob URL/Object URL**

Blob URL/Object URL 是一种伪协议，允许 Blob 和 File 对象用作图像，下载二进制数据链接等的 URL 源。在浏览器中，我们使用 `URL.createObjectURL` 方法来创建 Blob URL，该方法接收一个 `Blob` 对象，并为其创建一个唯一的 URL，其形式为 `blob:<origin>/<uuid>`，对应的示例如下：

blob:https://example.org/40a5fb5a-d56d-4a33-b4e2-0acf6a8e5f641

浏览器内部为每个通过 `URL.createObjectURL` 生成的 URL 存储了一个 URL → Blob 映射。因此，此类 URL 较短，但可以访问 `Blob`。生成的 URL 仅在当前文档打开的状态下才有效。它允许引用 `<img>`、`<a>` 中的 `Blob`，但如果你访问的 Blob URL 不再存在，则会从浏览器中收到 404 错误。[·](https://link.zhihu.com/?target=http%3A//caibaojian.com/blob.html)

上述的 Blob URL 看似很不错，但实际上它也有副作用。虽然存储了 URL → Blob 的映射，但 Blob 本身仍驻留在内存中，浏览器无法释放它。映射在文档卸载时自动清除，因此 Blob 对象随后被释放。

但是，如果应用程序寿命很长，那不会很快发生。因此，如果我们创建一个 Blob URL，即使不再需要该 Blob，它也会存在内存中。

针对这个问题，我们可以调用 `URL.revokeObjectURL(url)` 方法，从内部映射中删除引用，从而允许删除 Blob（如果没有其他引用），并释放内存。接下来，我们来看一下 Blob 文件下载的具体示例。





[JavaScript中的Blob你知道多少 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/500199997)