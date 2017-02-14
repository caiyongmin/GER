##### 初始化
```javascript
var errorReport = new GER({
    url: 'xxxxxxxx'                         //错误上报接口地址
});
errorReport.set('delay',1000);
errorReport.get('delay');
```

##### 配置说明
```javascript
{
    mergeReport: true,                      // mergeReport 是否合并上报， false 关闭， true 启动（默认）
    delay: 1000,                            // 当 mergeReport 为 true 可用，延迟多少毫秒，合并缓冲区中的上报（默认）
    url: "xxxxxxxx",                        // 指定错误上报地址
    except: [/Script error/i],              // 忽略某个错误
    random: 1,                              // 抽样上报，1~0 之间数值，1为100%上报（默认 1）
    repeat: 5,                              // 重复上报次数(对于同一个错误超过多少次不上报)
    errorLSSign:'mx-error'                  // error错误数自增 0
    maxErrorCookieNo:50                     // error错误数自增 最大的错
}
```

##### 接口接收参数字段说明
```javascript
    colNum:         //错误列数
    rowNum:         //错误行数
    msg:            //错误信息
    target_url      //错误文件地址
    user_agent      //useragent
    server_ip       //服务器ip
    server_port     //服务器端口
    current_url     //错误页面url
    timestamp       //错误发生时间戳
    project_type    //错误发生终端 （手机/pc）
    referer_url     //引用
    ext             // 扩展属性 Object object 上传一些非常规参数
```
GER是重写了 window.onerror 进行上报的，无需编写任何捕获错误的代码

#####  手动上报
```javascript
var errorReport = new GER();
errorReport.error("error msg");

errorReport.error({
    msg: "xx load error",                 // 错误信息
    target_url: "xxx.js",                 // 错误的来源js
    rowNo: 100,                           // 错误的行数
    colNo: 100,                           // 错误的列数
});

//errorReport.info,log,warn,errro;

try{
    // something throw error ...
}catch(error){
    errorReport.error(e);
}
```

#####  延迟上报
```javascript
errorReport.delayReport("error msg");

errorReport.delayReport({
    msg: "xx load error",                // 错误信息
    target_url: "xxx.js",                // 错误的来源js
    rowNo: 100,                          // 错误的行数
    colNo: 100,                          // 错误的列数
});

errorReport.report();

```
当 mergeReport = false 时候的， 调用 report ，根据缓冲池中的数据一条条上报;<br/>
当 mergeReport = true 时候的， 会延迟 delay 毫秒，再合并上报

### 高级用法

由于 GER 只是重写了onerror 方法而已，而且浏览器的跨域问题不能获得外链 javascript 的错误，所以使用tryPeep  进行包裹。
#### 包裹jquery
```javascript
new GER({
  tryPeep:true,
  peepJquery:true
});
```

包裹 jquery 的 event.add , event.remove , event.ajax 这几个异步方法。

#### 包裹 define , require
```javascript
new GER({
    tryPeep:true,
    peepModules:true
});
```
包裹 模块化框架 的 define , require 方法

#### 包裹  js 默认的方法
```javascript
new GER({
   peepSystem:true 
});
```
包裹 js 的 setTimeout , setInterval 方法

#### 包裹 自定义的方法
```javascript
var customFn = function (){};
customFn  = new GER({
    tryPeep:true,
    peepCustom:[customFn]
});
```

### 上报前后的处理
```
var myGER = new GER();
myGER.on('beforeReport',function(err){
    return false;
});
myGER.on('afterReport',function(err){
    
});
myGER.on('error',function(err){
    return false;
});
```
### 包裹console
```js
new GER({
    url:'xxx',
    tryPeep:true,
    peepConsole:{
        error:{
            url:'xxx'
        },
        log:{
            url:'xxx'
       }
    }
});
```