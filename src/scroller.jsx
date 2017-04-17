import React, { Component, PropTypes } from 'react'

export default class LimitedInfiniteScroll extends Comment {
    static propTypes = {
        limit: PropTypes.number,
        pageStart: PropTypes.number,
        threshold: PropTypes.number,
        hasMore: PropTypes.bool,
        autoLoad: PropTypes.bool,
        useWindow: PropTypes.bool,
        loadNext: PropTypes.func.isRequired,
        spinLoader: PropTypes.element,
        mannualLoader: PropTypes.element,
        noMore: PropTypes.element
    }

    static defaultProps = {
        limit: 5,
        pageStart: 0,
        threshold: 200,
        hasMore: false,
        autoLoad: true,
        useWindow: true,
        spinLoader: this._defaultSpinLoader,
        mannualLoader: this._defaultManualLoader,
        noMore: null
    }

    state = {
        loading: false
    }

    _defaultSpinLoader = <div style={{textAlign: 'center', fontSize: 20, lineHeight: 36, marginTop: 20, marginBottom: 20}}>Loading...</div>

    _defaultManualLoader = <div style={{textAlign: 'center'}}><span style={{fontSize: 20, lineHeight: 36, marginTop: 20, marginBottom: 20, display: 'inline-block', color: '#88899a', border: '1px solid #88899a', borderTopLeftRadius: 3, borderTopRightRadius: 3, borderBottomRightRadius: 3, borderBottomLeftRadius: 3}}>Load More</span></div>

    calcTop = (element) => {
        if (!element) {
            return 0
        }
        return element.offsetTop + this.calcTop(element.offsetParent)
    }

    scrollHandler = () => {
        let offset
        const el = this.selfComponent
        if (this.props.useWindow) {
            let scrollTop = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
            offset = this.calcTop(el) + el.offsetHeight - scrollTop - window.innerHeight
        } else {
            offset = el.scrollHeight - el.parentNode.scrollTop - el.parentNode.clientHeight
        }

        if (offset < Number(this.props.threshold)) {
            this.detachScrollEvent()

            if (typeof this.props.loadNext === 'function') {
                this.props.loadNext(this.page += 1 )
            }
        }
    }

    attachScrollEvent = () => {
        if (!this.props.hasMore) {
            return
        }

        const scrollEl = this.props.useWindow ? window : this.selfComponent.parentNode
        scrollEl.addEventListener('scroll', this.scrollHandler, false)
        scrollEl.addEventListener('resize', this.scrollHandler, false)

        if (this.props.autoLoad && !this.autoLoaded) {
            this.autoLoaded = true
            this.scrollHandler()
        }
    }

    detachScrollEvent = () => {
        const scrollEl = this.props.useWindow ? window : this.selfComponent.parentNode

        scrollEl.removeEventListener('scroll', this.scrollHandler, false)
        scrollEl.removeEventListener('resize', this.scrollHandler, false)
    }

    componentDidMount () {
        this.attachScrollEvent()
    }

    componentWillUpdate(nextProps, nextState) {
        this.detachScrollEvent()
    }
    
    componentDidUpdate(prevProps, prevState) {
        if ((!this.props.limit || this.page < this.props.limit) && prevState.loading === this.state.loading) {
            this.attachScrollEvent()
            this.setState({
                loading: false
            })
        }
    }

    componentWillUnmount() {
        this.detachScrollEvent()
    }
    
    render () {
        const {limit, pageStart, threshold, hasMore, autoLoad, useWindow, loadNext, spinLoader, mannualLoader, noMore, children, ...props} = this.props

        mannualLoader.props.onClick = () => {
            loadNext(this.page += 1)
            this.setState({
                loading: true
            })
        }

        props.ref = node => this.selfComponent = node

        return (
            <div {...props}>
                {children}
                {this.state.loading && hasMore && this.page < limit && spinLoader}
                {hasMore && limit > 0 && this.page >= limit && mannualLoader}
                {!hasMore && noMore}
            </div>
        )
    }
}