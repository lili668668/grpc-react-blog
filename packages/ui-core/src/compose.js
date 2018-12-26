import React from 'react'

export default (components) => (Base) => {
  const extendProps = {}
  const expose = {}
  Object.entries(Base.components).forEach(([fieldName, componentName]) => {
    extendProps[fieldName] = components[componentName]
    expose[componentName] = components[componentName]
  })
  class Component extends React.PureComponent {
    render() {
      const mergedProps = Object.assign({}, extendProps, this.props)
      return <Base { ...mergedProps } />
    }
  }
  Component.components = Base.components
  Object.assign(Component, expose)
  return Component
}
