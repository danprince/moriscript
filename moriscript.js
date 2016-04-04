module.exports = function(babel) {
  var t = babel.types;

  return {
    visitor: {
      ObjectExpression: function(path) {
        if(path.node.isClean) return;
        path.node.isClean = true;

        path.replaceWith(
          t.callExpression(
            t.memberExpression(t.identifier('mori'), t.identifier('toClj')),
            [path.node]
          )
        );
      },
      ArrayExpression: function(path) {
        if(path.node.isClean) return;
        path.node.isClean = true;

        path.replaceWith(
          t.callExpression(
            t.memberExpression(t.identifier('mori'), t.identifier('toClj')),
            [path.node]
          )
        );
      },
      AssignmentExpression: function(path) {
        // if the lhs is a member expression convert this into assocIn
        var lhs = path.node.left;
        var rhs = path.node.right;
        if(t.isMemberExpression(lhs)) {
          var propertyName = lhs.property.name || lhs.property.value;
          path.replaceWith(
            t.callExpression(
              t.memberExpression(t.identifier('mori'), t.identifier('assoc')),
              [lhs.object, t.stringLiteral(propertyName), rhs]
            )
          );
        }
      },
      CallExpression: function(path) {
        var callee = path.node.callee;
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
