```ts
declare var jQuery: (selector: string) => any
```





###  具名元素

- `@Ref('refInTemplate') readonly xxxxElement!: ElementType`: 此时页面上需要有一个`ref=refInTemplate`的元素,把模板上 `ref="refInTemplate"`的元素赋给 `this.xxxxElement`