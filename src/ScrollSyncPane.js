/* eslint react/no-find-dom-node: 0 */

import { Component, Children, createRef, cloneElement } from 'react'
import PropTypes from 'prop-types'
import ScrollSyncContext from './support/ScrollSyncContext'

/**
 * ScrollSyncPane Component
 *
 * Wrap your content in it to keep its scroll position in sync with other panes
 *
 * @example ./example.md
 */


export default class ScrollSyncPane extends Component {
  static contextType = ScrollSyncContext;

  static propTypes = {
    children: PropTypes.element.isRequired,
    attachTo: PropTypes.object,
    group: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    enabled: PropTypes.bool
  }

  static defaultProps = {
    group: 'default',
    enabled: true
  }

  constructor(props) {
    super(props)
    this.childRef = createRef()
  }

  componentDidMount() {
    if (this.props.enabled) {
      this.node = this.props.attachTo || this.childRef.current
      if (this.node) {
        this.context.registerPane(this.node, this.toArray(this.props.group))
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.node && this.props.enabled && this.props.group !== prevProps.group) {
      this.context.unregisterPane(this.node, this.toArray(prevProps.group))
      this.context.registerPane(this.node, this.toArray(this.props.group))
    }
  }

  componentWillUnmount() {
    if (this.node && this.props.enabled) {
      this.context.unregisterPane(this.node, this.toArray(this.props.group))
    }
  }

  toArray = groups => [].concat(groups)

  render() {
    if (this.props.attachTo) {
      return this.props.children
    }
    return cloneElement(Children.only(this.props.children), { ref: this.childRef })

  }
}
