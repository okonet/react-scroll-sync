import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * ScrollSync provider component
 *
 */

export default class ScrollSync extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    proportional: PropTypes.bool,
    vertical: PropTypes.bool,
    horizontal: PropTypes.bool
  };

  static defaultProps = {
    proportional: true,
    vertical: true,
    horizontal: true
  };

  static childContextTypes = {
    registerPane: PropTypes.func,
    unregisterPane: PropTypes.func
  }

  getChildContext() {
    return {
      registerPane: this.registerPane,
      unregisterPane: this.unregisterPane
    }
  }

  panes = []

  registerPane = (node) => {
    if (!this.findPane(node)) {
      this.addEvents(node)
      this.panes.push(node)
    }
  }

  unregisterPane = (node) => {
    if (this.findPane(node)) {
      this.removeEvents(node)
      this.panes.splice(this.panes.indexOf(node), 1)
    }
  }

  addEvents = (node) => {
    /* For some reason element.addEventListener doesnt work with document.body */
    node.onscroll = this.handlePaneScroll.bind(this, node) // eslint-disable-line
  }

  removeEvents = (node) => {
    /* For some reason element.removeEventListener doesnt work with document.body */
    node.onscroll = null // eslint-disable-line
  }

  findPane = node => this.panes.find(pane => pane === node)

  handlePaneScroll = (node) => {
    window.requestAnimationFrame(() => {
      this.syncScrollPositions(node)
    })
  }

  syncScrollPositions = (scrolledPane) => {
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

    const { proportional, vertical, horizontal } = this.props

    this.panes.forEach((pane) => {
      /* For all panes beside the currently scrolling one */
      if (scrolledPane !== pane) {
        /* Remove event listeners from the node that we'll manipulate */
        this.removeEvents(pane)
        /* Calculate the actual pane height */
        const paneHeight = pane.scrollHeight - clientHeight
        const paneWidth = pane.scrollWidth - clientWidth
        /* Adjust the scrollTop position of it accordingly */
        if (vertical && scrollTopOffset > 0) {
          pane.scrollTop = proportional ? (paneHeight * scrollTop) / scrollTopOffset : scrollTop // eslint-disable-line
        }
        if (horizontal && scrollLeftOffset > 0) {
          pane.scrollLeft = proportional ? (paneWidth * scrollLeft) / scrollLeftOffset : scrollLeft // eslint-disable-line
        }
        /* Re-attach event listeners after we're done scrolling */
        window.requestAnimationFrame(() => {
          this.addEvents(pane)
        })
      }
    })
  }

  render() {
    return React.Children.only(this.props.children)
  }
}
