## Limited Infinite Scroll

## Props

| Name             | Type          | Default    | Description|
|:----             |:----          |:----       |:----|
| `limit`          | `Number`      | `10`       | 分页达到该数量后不再自动滚动加载|
| `pageStart`      | `Number`      | `0`        | 起始分页|
| `threshold`      | `Number`      | `200`      | 列表底部距离窗口距离少于该临界值时触发loadNext|
| `hasMore`        | `Boolean`     | `false`    | 是否有更多分页可以加载|
| `autoLoad`       | `Boolean`     | `true`     | 是否组件初始化时就直接加载第一页内容|
| `useWindow`      | `Boolean`     | `true`     | 事件监听是否附件至`window`, 否则附加至组件的`parentNode`|
| `loadNext`       | `Function`    |            | 加载下一页的回调方法|
| `spinLoader`     | `Element`     |            | 自动加载指示器元素|
| `mannualLoader`  | `Element`     |            | 手动加载指示器元素|
| `noMore`         | `Element`     | `null`     | 没有更多分页时的指示器元素|