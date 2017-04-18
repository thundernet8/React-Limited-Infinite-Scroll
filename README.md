[中文 README](README-CN.md)

## Limited Infinite Scroll

React infinite scroll loader component, mannual loader will replace auto-loader when the page reach the limit(Because some users do not like infinite loading all pages, maybe they just want to see the footer)

[Demo](http://wuxueqian.github.io/demo/react-limited-infinite-scroll/#/)

## Installation

```
npm install react-limited-infinite-scroll --save-dev
```

## Usage
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
| `limit`          | `Number`      | `10`       | a load more button will replace auto-loader when pages reach the limit|
| `pageStart`      | `Number`      | `0`        | start page number|
| `threshold`      | `Number`      | `200`      | The distance in pixels before the end of the items that will trigger a call to `loadNext`|
| `hasMore`        | `Boolean`     | `false`    | Whether there are more items to be loaded|
| `autoLoad`       | `Boolean`     | `true`     | Whether the component should load the first set of items|
| `useWindow`      | `Boolean`     | `true`     | Add scroll listeners to the `window`, or else, the component's `parentNode`|
| `loadNext`       | `Function`    |            | A callback for loading next set of items|
| `spinLoader`     | `Element`     |            | auto loading indicator|
| `mannualLoader`  | `Element`     |            | mannual load-more button|
| `noMore`         | `Element`     | `null`     | indicator for no more items|

## Others

For React 15.5+ users, install v2.x.x
```
npm install react-limited-infinite-scroll --save-dev
```

or install v1.x.x
```
npm install react-limited-infinite-scroll@~1.0.0 --save-dev
```