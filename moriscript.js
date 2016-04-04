module.exports = function(babel) {
  const t = babel.types;

  return {
    visitor: {
      ObjectExpression(path) {
        if(path.node.isClean) return;
        path.node.isClean = true;

        path.replaceWith(
          t.callExpression(
            t.memberExpression(t.identifier('mori'), t.identifier('toClj')),
            [path.node]
          )
        );
      },
      ArrayExpression(path) {
        if(path.node.isClean) return;
        path.node.isClean = true;

        path.replaceWith(
          t.callExpression(
            t.memberExpression(t.identifier('mori'), t.identifier('toClj')),
            [path.node]
          )
        );
      },
      AssignmentExpression(path) {
        const lhs = path.node.left;
        const rhs = path.node.right;

        if(t.isMemberExpression(lhs)) {
          const propertyName = lhs.property.name || lhs.property.value;
          path.replaceWith(
            t.callExpression(
              t.memberExpression(t.identifier('mori'), t.identifier('assoc')),
              [lhs.object, t.stringLiteral(propertyName), rhs]
            )
          );
        }
      },
      CallExpression(path) {
        const callee = path.node.callee;
        if(t.isMemberExpression(callee)) {
          if(callee.object.name == 'console' && callee.property.name == 'log') {
            path.node.arguments = path.node.arguments.map(function(expr) {
              return t.callExpression(
                t.memberExpression(t.identifier('mori'), t.identifier('toJs')),
                [expr]
              );
            });
          }
        }
      }
    }
  };
};

