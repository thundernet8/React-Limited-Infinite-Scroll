[English README](README.md)

## Limited Infinite Scroll

React无限滚动加载组件，加载一定分页后改为手动加载器(因为有些用户不喜欢永远无限加载，可能他们只是想看Footer)
[Demo](http://wuxueqian.github.io/demo/react-limited-infinite-scroll/#/)

## 安装

```
npm install react-limited-infinite-scroll --save-dev
```

## 使用
```
import LimitedInfiniteScroll from 'react-limited-infinite-scroll'

const { total, list } = this.props.data

const items = list.map((item, index) => {
    return (
        <div key={index}>
            <div>item content</div>
        </div>
    )
})

<LimitedInfiniteScroll 
    limit={5} 
    hasMore={total === undefined || items.length < total}
    spinLoader={<div className="loader">Loading...</div>}
    mannualLoader={<span style={{fontSize: 20, lineHeight: 1.5, marginTop: 20, marginBottom: 20, display: 'inline-block'}}>Load More</span>}
    noMore={<div className="loader">No More Items</div>} 
    loadNext={this.loadNextFunc}>
    {items}
</LimitedInfiniteScroll>
```

## Props

| Name             | Type          | Default    | Description|
|:----             |:----          |:----       |:----|
| `limit`          | `Number`      | `10`       | 分页达到该数量后不再自动滚动加载|
| `pageStart`      | `Number`      | `0`        | 起始分页|
| `threshold`      | `Number`      | `200`      | 列表底部距离窗口距离少于该临界值时触发`loadNext`|
| `hasMore`        | `Boolean`     | `false`    | 是否有更多分页可以加载|
| `autoLoad`       | `Boolean`     | `true`     | 是否组件初始化时就直接加载第一页内容|
| `useWindow`      | `Boolean`     | `true`     | 事件监听是否附件至`window`, 否则附加至组件的`parentNode`|
| `loadNext`       | `Function`    |            | 加载下一页的回调方法|
| `spinLoader`     | `Element`     |            | 自动加载指示器元素|
| `mannualLoader`  | `Element`     |            | 手动加载指示器元素|
| `noMore`         | `Element`     | `null`     | 没有更多分页时的指示器元素|

## 其它

使用React 15.4+的用户，由于PropTypes已经从React主库分离，请安装2.x.x版本
```
npm install react-limited-infinite-scroll --save-dev
```

而使用较老版本React的用户，安装1.x.x版本
```
npm install react-limited-infinite-scroll@^1.0.0 --save-dev
```