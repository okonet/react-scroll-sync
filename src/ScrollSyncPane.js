/* eslint react/no-find-dom-node: 0 */

import { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

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
    attachTo: PropTypes.object,
    group: PropTypes.string,
    enabled: PropTypes.bool
  }

  static defaultProps = {
    group: 'default',
    enabled: true
  }

  static contextTypes = {
    registerPane: PropTypes.func.isRequired,
    unregisterPane: PropTypes.func.isRequired
  };

  componentDidMount() {
    if (this.props.enabled) {
      this.node = this.props.attachTo || ReactDOM.findDOMNode(this)
      this.context.registerPane(this.node, this.props.group)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.enabled && this.props.group !== nextProps.group) {
      this.context.unregisterPane(this.node, this.props.group)
      this.context.registerPane(this.node, nextProps.group)
    }
  }

  componentWillUnmount() {
    if (this.props.enabled) {
      this.context.unregisterPane(this.node, this.props.group)
    }
  }

  render() {
    return this.props.children
  }
}
