import React, { Component, PropTypes } from 'react'

import ScrollSyncPane from './internal/ScrollSyncPane'

/**
 * ScrollSync provider component
 *
 * @example ./example.md
 */

export default class ScrollSync extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.object
  };

  panes = []

  registerPane = (node) => {
    if (!this.findPane(node)) {
      this.addEvents(node)
      this.panes.push(node)
    }
    return () => {
      this.unregisterPane(node)
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
    const { scrollTop, scrollHeight, clientHeight,
      scrollLeft, scrollWidth, clientWidth } = scrolledPane

    this.panes.forEach((pane) => {
      /* For all panes beside the currently scrolling one */
      if (scrolledPane !== pane) {
        /* Remove event listeners from the node that we'll manipulate */
        this.removeEvents(pane)
        /* Calculate the actual pane height */
        const paneHeight = pane.scrollHeight - clientHeight
        const paneWidth = pane.scrollWidth - clientWidth
        /* Adjust the scrollTop position of it accordingly */
        pane.scrollTop = (paneHeight * scrollTop) / (scrollHeight - clientHeight) // eslint-disable-line
        pane.scrollLeft = (paneWidth * scrollLeft) / (scrollWidth - clientWidth) // eslint-disable-line
        /* Re-attach event listeners after we're done scrolling */
        window.requestAnimationFrame(() => {
          this.addEvents(pane)
        })
      }
    })
  }

  render() {
    return (<div style={{ overflow: 'hidden', ...this.props.style }}>
      {
        React.Children.map(this.props.children, child => (
          <ScrollSyncPane register={this.registerPane}>
            { child }
          </ScrollSyncPane>
        ))
      }
    </div>)
  }
}
