import React, { Component, PropTypes } from 'react'

const STYLE = {
  overflow: 'auto'
}

export default class ScrollSyncPane extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    attachTo: PropTypes.object,
    register: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.getRef = (el) => {
      this.el = el
    }
  }

  componentDidMount() {
    this.unregister = this.props.register(this.props.attachTo || this.el)
  }

  componentWillUnmount() {
    this.unregister()
  }

  render() {
    return <div style={STYLE} ref={this.getRef}>{this.props.children}</div>
  }
}
