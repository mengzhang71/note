## **1、es5和es6的区别，说一下你所知道的es6**

就是答es6新增的地方，拓展了很多东西 ：...		

数组		新加些构造函数方法Array.from()【这样真正的能加迭代器，用[]框起来只是加了length属性吧】，of()：将值变成数组Array.of(3, 11, 8) // [3,11,8]

实例方法：find()，entries()，keys()，values()，includes()【判断数组是否包含给定的值（即给的第一个参数，第二个参数是搜索初始位置，负数为倒数）】	flat(层数)，flatMap()  （还有其他的fill、copyWithin）

flatMap()相当于先执行了次map，在把执行后的数组falt了

对象：对象属性、方法的简写，扩展运算符在对象中的使用，因为Object.entries()返回的是数组，所以可以无脑使用for...of了

函数（默认值、rest、严格模式、箭头函数） 

和下面所有的内容

[es5和es6的区别，说一下你所知道的es6_es6比es5多的新特性_休庸的博客-CSDN博客](https://blog.csdn.net/weixin_57913339/article/details/130150750#:~:text=ECMAScript5，即ES5，是ECMAScript的第五次修订，于2009年完成标准化,ECMAScript6，即ES6，是ECMAScript的第六次修订，于2015年完成，也称ES2015 ES6是继ES5之后的一次改进，相对于ES5更加简洁，提高了开发效率)

## **2、var、let、const之间的区别**

let   不存在变量提升，暂时性死区，块级作用域，同一作用域不允许重复声明

var和let对着干

##### let该有的特点const都有，只读不能改（本质：const并不是变量的值不能改动，而是变量指向的内存地址所保存的数据不得改动），必须赋初值

使用的场景说明：let一般应用于基本数据类型；const 一般应用于引用数据类型，也就是函数对象等。

## **3、使用箭头函数应注意什么？**

（1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
（2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
（3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
（4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。
原文链接：https://blog.csdn.net/weixin_45846357/article/details/106972645

代替匿名函数的地方



箭头函数不会创建自己的`this，它只会从自己的作用域链的上一层继承 this`

在箭头函数出现之前，每一个新函数根据它是被如何调用的来定义这个函数的 this 值：

- 如果该函数是一个构造函数，this 指针指向一个新的对象
- 在严格模式下的函数调用下，this 指向`undefined`
- 如果该函数是一个对象的方法，则它的 this 指针指向这个对象
- 等等

## **4、ES6的模板字符串有哪些新特性？并实现一个类模板字符串的功能**

定义多行字符串，或者在字符串中嵌入变量甚至方法

便签模板



用正则实现吧

## **5、介绍下 Set、Map的区别？**

其实是引入集合和字典的概念

类似于数组，但成员的值都是唯一的，集合实现了 iterator 接口，所以可以使用『扩展运算符…』和『for…of…』进行遍历，集合的属性和方法：

size 返回集合的元素个数
add 增加一个新元素，返回当前集合
delete 删除元素，返回 boolean 值
has 检测集合中是否包含某个元素，返回 boolean 值
clear 清空集合，返回 undefined

原文链接：https://blog.csdn.net/enjoy_learning/article/details/129490945

## **6、ECMAScript 6 怎么写 class ，为何会出现 class？**



## **7、Promise构造函数是同步执行还是异步执行，那么 then 方法呢？**

Promise 构造函数时同步执行的，then 方法是异步执行的

## **8、setTimeout、Promise、Async/Await 的区别**

setTimeout属性宏任务，Promise里面的then方法属于微任务，Async/Await中await语法后面紧跟的表达式是同步的，但接下来的代码是异步的，属于微任务。

## **9、promise有几种状态，什么时候会进入catch？**

没有定义promise第二个回调时，网络异常时



reject时

catch其实就是then方法执行第二个参数reject的方法的别名，但两者还是有区别的

[【经典面试题】Promise 中reject 和 catch 处理上有什么区别？_不进入reject进入catch_燕穗子博客的博客-CSDN博客](https://blog.csdn.net/m0_64346035/article/details/124824116)

如果 `Promise` 状态已经变成`resolved`，再抛出错误是无效的

*//会被忽略，不会被捕获，等于没有抛出*

[关于Promise.catch()错误捕获机制的理解_Rrivers_111的博客-CSDN博客](https://blog.csdn.net/weixin_44776206/article/details/109402410)

## **10、下面的输出结果是多少**

```javascript
const promise = new Promise((resolve, reject) => {
    console.log(1);
    resolve();
    console.log(2);
})


promise.then(() => {
    console.log(3);
})


console.log(4);
```



## **11、使用结构赋值，实现两个变量的值的交换**

[a,b] = [b,a]

## **12、设计一个对象，键名的类型至少包含一个symbol类型，并且实现遍历所有key**



## **13、下面Set结构，打印出的size值是多少**

```javascript
let s = newSet();
s.add([1]);s.add([1]);
console.log(s.size);
```

2

set本质是比较内存地址，这里是数组为引用变量，

## **14、Promise 中reject 和 catch 处理上有什么区别**

reject 是 Promise 的方法，而 catch 是 Promise 实例的方法

reject 是用来抛出异常，catch 是用来处理异常
reject后的东西，一定会进入then中的第二个回调，如果then中没有写第二个回调，则进入catch
网络异常（比如断网），会直接进入catch而不会进入then的第二个回调


[【经典面试题】Promise 中reject 和 catch 处理上有什么区别？_不进入reject进入catch_燕穗子博客的博客-CSDN博客](https://blog.csdn.net/m0_64346035/article/details/124824116)

## **15、使用class 手写一个promise**



## **16、如何使用Set去重**

const uniqueArray = [...new Set(array)];

## **17、Proxy是什么**



## **18、理解 async/await以及对Generator的优势**



## **19、forEach、for in、for of三者区别**



## **20、es6的导入导出模块**

讲下import ，export，default默认导出，{}，as

