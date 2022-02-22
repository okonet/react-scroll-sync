/* eslint-disable no-param-reassign */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * ScrollSync provider component
 *
 */

export default class ScrollSync extends Component {
  static propTypes = {
    /**
     * Callback to be invoked any time synchronization happens
     *
     * @param {Element} el The element that has received the scroll event
     */
    onSync: PropTypes.func,
    children: PropTypes.element.isRequired,
    proportional: PropTypes.bool,
    vertical: PropTypes.bool,
    horizontal: PropTypes.bool,
    enabled: PropTypes.bool,
    initialScrollLeft: PropTypes.number,
    initialScrollTop: PropTypes.number
  }

  static defaultProps = {
    proportional: true,
    vertical: true,
    horizontal: true,
    enabled: true,
    initialScrollLeft: 0,
    initialScrollTop: 0
  }

  static childContextTypes = {
    registerPane: PropTypes.func,
    unregisterPane: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      initialized: false
    }
  }
  getChildContext() {
    return {
      registerPane: this.registerPane,
      unregisterPane: this.unregisterPane
    }
  }

  panes = {}

  registerPane = (node, groups) => {
    groups.forEach((group) => {
      if (!this.panes[group]) {
        this.panes[group] = []
      }

      if (!this.findPane(node, group)) {
        if (this.panes[group].length > 0) {
          this.syncScrollPosition(this.panes[group][0], node)
        }
        this.panes[group].push(node)
      }
    })
    this.addEvents(node, groups)
  }

  unregisterPane = (node, groups) => {
    groups.forEach((group) => {
      if (this.findPane(node, group)) {
        this.removeEvents(node)
        this.panes[group].splice(this.panes[group].indexOf(node), 1)
      }
    })
  }

  addEvents = (node, groups) => {
    /* For some reason element.addEventListener doesnt work with document.body */
    node.onscroll = this.handlePaneScroll.bind(this, node, groups) // eslint-disable-line
  }

  removeEvents = (node) => {
    /* For some reason element.removeEventListener doesnt work with document.body */
    node.onscroll = null // eslint-disable-line
  }

  findPane = (node, group) => {
    if (!this.panes[group]) {
      return false
    }

    return this.panes[group].find(pane => pane === node)
  }

  handlePaneScroll = (node, groups) => {
    if (!this.props.enabled) {
      return
    }

    window.requestAnimationFrame(() => {
      this.syncScrollPositions(node, groups)
    })
  }

  syncScrollPosition(scrolledPane, pane) {
    const {
      scrollTop,
      scrollHeight,
      clientHeight,
      scrollLeft,
      scrollWidth,
      clientWidth
    } = scrolledPane

    const scrollTopOffset = scrollHeight - clientHeight
    const scrollLeftOffset = scrollWidth - clientWidth

    const {
      proportional,
      vertical,
      horizontal,
      initialScrollTop,
      initialScrollLeft
    } = this.props

    /* Calculate the actual pane height */
    const paneHeight = pane.scrollHeight - clientHeight
    const paneWidth = pane.scrollWidth - clientWidth
    /* Adjust the scrollTop position of it accordingly */
    if (vertical && scrollTopOffset > 0) {
      if (!this.state.initialized) pane.scrollTop = initialScrollTop
      // eslint-disable-next-line curly
      else
        pane.scrollTop = proportional
          ? (paneHeight * scrollTop) / scrollTopOffset
          : scrollTop // eslint-disable-line
    }
    if (horizontal && scrollLeftOffset > 0) {
      if (!this.state.initialized) pane.scrollLeft = initialScrollLeft
      // eslint-disable-next-line curly
      else
        pane.scrollLeft = proportional
          ? (paneWidth * scrollLeft) / scrollLeftOffset
          : scrollLeft // eslint-disable-line
    }
    if (!this.state.initialized) this.state.initialized = true
  }

  syncScrollPositions = (scrolledPane, groups) => {
    groups.forEach((group) => {
      this.panes[group].forEach((pane) => {
        /* For all panes beside the currently scrolling one */
        if (scrolledPane !== pane) {
          /* Remove event listeners from the node that we'll manipulate */
          this.removeEvents(pane, group)
          this.syncScrollPosition(scrolledPane, pane)
          /* Re-attach event listeners after we're done scrolling */
          window.requestAnimationFrame(() => {
            this.addEvents(pane, groups)
          })
        }
      })
    })
    if (this.props.onSync) this.props.onSync(scrolledPane)
  }

  render() {
    return React.Children.only(this.props.children)
  }
}
