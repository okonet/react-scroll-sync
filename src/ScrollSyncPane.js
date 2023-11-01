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
    children: PropTypes.node.isRequired,
    attachTo: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ current: PropTypes.any })
    ]),
    group: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    enabled: PropTypes.bool,
    innerRef: PropTypes.oneOfType([// Either a function
      PropTypes.func,
      PropTypes.shape({ current: PropTypes.any })])
  };

  static defaultProps = {
    group: 'default',
    enabled: true
  };

  constructor(props) {
    super(props)

    this.childRef = props.innerRef ? props.innerRef : createRef()
  }

  componentDidMount() {
    if (this.props.enabled) {
      this.updateNode()
      if (this.node) {
        this.context.registerPane(this.node, this.toArray(this.props.group))
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.attachTo !== prevProps.attachTo) {
      if (this.node) {
        this.context.unregisterPane(this.node, this.toArray(prevProps.group))
      }
      this.updateNode()
      if (this.node) {
        this.context.registerPane(this.node, this.toArray(prevProps.group))
      }
    }
    if (this.node && this.props.enabled !== prevProps.enabled) {
      if (this.props.enabled) {
        this.context.registerPane(this.node, this.toArray(prevProps.group))
      } else {
        this.context.unregisterPane(this.node, this.toArray(prevProps.group))
      }
    }
    if (
      this.node &&
      this.props.enabled &&
      this.props.group !== prevProps.group
    ) {
      this.context.unregisterPane(this.node, this.toArray(prevProps.group))
      this.context.registerPane(this.node, this.toArray(this.props.group))
    }
  }

  componentWillUnmount() {
    if (this.node && this.props.enabled) {
      this.context.unregisterPane(this.node, this.toArray(this.props.group))
    }
  }

  toArray = groups => [].concat(groups);

  updateNode = () => {
    if (this.props.attachTo) {
      this.node = this.props.attachTo.current
    } else {
      this.node = this.childRef.current
    }
  };

  render() {
    if (this.props.attachTo) {
      return this.props.children
    }
    return cloneElement(Children.only(this.props.children), {
      ref: this.childRef
    })
  }
}
