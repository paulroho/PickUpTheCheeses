var cloner = (function () {
    function replaceInAttributes(node, textCallback) {
        for (var i = 0; i < node.attributes.length; i++) {
            var attribute = node.attributes[i];
            attribute.value = textCallback(attribute.value);
        }
    }

    function cloneDeep(orig, textCallback) {
        var clone = orig.cloneNode();
        for (var i = 0; i < orig.childNodes.length; i++) {
            var child = orig.childNodes[i];
            var clonedChild;
            if (child.childNodes.length === 0) {
                clonedChild = child.cloneNode();
                var replaceText = (child.nodeType === Node.TEXT_NODE) && textCallback;
                if (replaceText) {
                    clonedChild.textContent = textCallback(clonedChild.textContent);
                }
            }
            else {
                clonedChild = cloneDeep(child, textCallback);
            }

            if (clonedChild.attributes && textCallback) {
                replaceInAttributes(clonedChild, textCallback);
            }

            clone.appendChild(clonedChild);
        }
        return clone;
    }

    return {
        cloneDeep: cloneDeep
    };
})();