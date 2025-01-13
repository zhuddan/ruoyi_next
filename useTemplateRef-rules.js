export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce useTemplateRef variables can only access .value property',
    },
    messages: {
      onlyValueAccess: 'useTemplateRef variables can only be accessed with .value property',
    },
  },
  create(context) {
    // 跟踪由 useTemplateRef 创建的变量
    const templateRefVars = new Set()

    return {
      // 记录所有 useTemplateRef 创建的变量
      VariableDeclarator(node) {
        if (
          node.init?.type === 'CallExpression'
          && node.init.callee.type === 'Identifier'
          && node.init.callee.name === 'useTemplateRef'
        ) {
          templateRefVars.add(node.id.name)
        }
      },

      // 检查这些变量的属性访问
      MemberExpression(node) {
        // 只有当访问的对象是我们跟踪的变量时才检查
        if (
          node.object.type === 'Identifier'
          && templateRefVars.has(node.object.name)
        ) {
          // 如果访问的不是 value 属性，报错
          if (
            (node.property.type === 'Identifier' && node.property.name !== 'value')
            || node.property.type === 'Literal'
          ) {
            context.report({
              node,
              messageId: 'onlyValueAccess',
            })
          }
        }
      },
    }
  },
}
