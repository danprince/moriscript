module.exports = function(babel) {
  const t = babel.types;

  function moriMethod(name) {
    const expr = t.memberExpression(t.identifier('mori'), t.identifier(name));
    expr.isClean = true;
    return expr;
  }

  return {
    visitor: {
      ObjectExpression(path) {
        const props = [];

        path.node.properties.forEach(prop => {
          props.push(
            t.stringLiteral(prop.key.name),
            prop.value
          );
        });

        path.replaceWith(
          t.callExpression(
            moriMethod('hashMap'),
            props
          )
        );
      },
      ArrayExpression(path) {
        path.replaceWith(
          t.callExpression(
            moriMethod('vector'),
            path.node.elements
          )
        );
      },
      AssignmentExpression(path) {
        const lhs = path.node.left;
        const rhs = path.node.right;

        if(t.isMemberExpression(lhs)) {
          if(t.isIdentifier(lhs.property)) {
            lhs.property = t.stringLiteral(lhs.property.name);
          }

          path.replaceWith(
            t.callExpression(
              moriMethod('assoc'),
              [lhs.object, lhs.property, rhs]
            )
          );
        }
      },
      MemberExpression(path) {
        if(path.node.isClean) return;
        if(t.isAssignmentExpression(path.parent)) return;
        if(path.node.object.name == 'console' ||
           path.node.object.name == 'window'  ||
           path.node.object.name == 'global') return;

        if(t.isIdentifier(path.node.property)) {
          path.node.property = t.stringLiteral(path.node.property.name);
        }

        path.replaceWith(
          t.callExpression(
            moriMethod('get'),
            [path.node.object, path.node.property]
          )
        );
      },
      CallExpression(path) {
        const callee = path.node.callee;

        if(t.isMemberExpression(callee)) {
          if(callee.object.name == 'console' && callee.property.name == 'log') {
            path.node.arguments = path.node.arguments.map(function(expr) {
              return t.callExpression(
                moriMethod('toJs'),
                [expr]
              );
            });
          }
        }
      }
    }
  };
};

