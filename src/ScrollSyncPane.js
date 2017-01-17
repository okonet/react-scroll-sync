/* eslint react/no-find-dom-node: 0 */

import { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

/**
 * ScrollSyncPane Component
 *
 * Wrap your content in it to keep its scroll position in sync with other panes
 *
 * @example ./example.md
 */


export default class ScrollSyncPane extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    attachTo: PropTypes.object
  }

  static contextTypes = {
    registerPane: PropTypes.func.isRequired,
    unregisterPane: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.node = this.props.attachTo || ReactDOM.findDOMNode(this)
    this.context.registerPane(this.node)
  }

  componentWillUnmount() {
    this.context.unregisterPane(this.node)
  }

  render() {
    return this.props.children
  }
}
