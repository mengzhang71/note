### 1、为什么要使用TypeScript?
简单来说就是因为JavaScript是弱类型, 很多错误只有在运行时才会被发现
而TypeScript提供了一套静态检测机制, 可以帮助我们在编译时就发现错误
### 2、TypeScript相对于JavaScript的优势是什么？
支持最新的JavaScript新特特性
支持代码静态检查
支持诸如C,C++,Java,Go等后端语言中的特性 (枚举、泛型、类型转换、命名空间、声明文件、类、接口等)
### 3、TypeScript 的内置数据类型有哪些？
八种 let str: string = "jimmy";
let num: number = 24;
let bool: boolean = false;
let u: undefined = undefined;
let n: null = null;
let obj: object = {x: 1};
let big: bigint = 100n;
let sym: symbol = Symbol("me"); 
### 4、interface可以用来干什么？
定义对象规则，TypeScript 中的接口是一个非常灵活的概念，除了可用于[对类的一部分行为进行抽象]以外，也常用于对「对象的形状（Shape）」进行描述。
### 5、interface和type的相同点和不同点
相同点：1.可以描述对象或者函数（都可以给类型命名并通过该名字来引用表示的类型）
        2.二者可以继承并且可以相互继承，只是语法上有区别，type是采用&符号继承，interface采用的是extends
不同点: 1.type可以声明类型别名，等号右边为设置为数据类型，interface不可以使用此用法
//type可以创建 类型别名 interface不行
type Name3 = string;

// 错误
// interface Name4 = string

// type 可以声明元祖类型 interface不行
type Coordinates = [number, number];

// 错误
// interface Coordinates2 = [number, number]

2.type不可以重复定义，interface可以重复定义，并且会取两次定义的合集

// 重复定义 type会报错， interface会联合两者
// type User5 = {
//   name : string
// }

// type User5 = {
//   age : number
// }

interface User6 {
  name: string;
}

interface User6 {
  age: number;
}

const user6: User6 = {
  name: "xiaoming",
  age: 18,
};
优先选择interface，当interface满足不了条件时，才使用type类型别名

[TS篇—type 和 interface 的区别_ts中type和interface的区别_小和尚同志的博客-CSDN博客](https://blog.csdn.net/qq_42345237/article/details/124895617#:~:text=type 在声明类型别名之后 实际上是一个赋值操作，它需要将别名与类型关联起来 。 也就是说类型别名不会创建出一种新的类型，它只是给已有类型命名并直接进行引用。 interface 是 定义了一个接口类型。,则 只能表示对象类型 。 interface 可以 继承其他的接口、类等对象类型， type 不支持继承。)

- type 能够**表示非对象类型，** 而 `interface` 则**只能表示对象类型**。
- `interface`可以**继承其他的接口、类等对象类型，** type 不支持继承。

对于 `type`来说，更多的是对类型的一种复用，比如在项目中需要用到一些比较复杂的或者书写起来很长的类型。我们可以使用 `type`来直接引用该类型：

### 6、enum枚举类型有什么用?举例说明
enum PostStatus {
  Draft = 0,
  Unpublished = 1,
  Published = 2,
}
### 7、TypeScript中的类是什么?如何定义

### 8、用interface实现一个类

### 9、any,unknow,never,void分别是什么?各自的应用场景是什么?

### 10、?.、!.、??、_、!:等操作符分别有什么用？

### 11、类型推论和类型断言分别是什么?

### 12、getter和setter是什么?

### 13、谈一谈你对装饰器的理解

### 14、const和readonly的区别

### 15、什么是泛型?使用场景是什么？

### 16、谈一谈this

### 17、TypeScript支持哪些修饰符？

### 18、.d.ts文件有什么作用?如何添加声明?

是什么

通常我们会把声明语句放到一个单独的文件（.d.ts`）中，这就是声明文件

一般来说，ts 会解析项目中所有的 `*.ts` 文件，当然也包含以 `.d.ts` 结尾的文件。所以当我们将 `jQuery.d.ts` 放到项目中时，其他所有 `*.ts` 文件就都可以获得 `jQuery` 的类型定义了

什么用

如果在html中引入了第三方js库, 比如"jq", 那么在ts代码中要使用"$"变量就需要"**声明**", 因为ts不知道$的存在

### 19、TypeScript中的模块

### 20、什么是联合类型





