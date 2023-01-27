const divideString = (str, ...indexes) => {
  let result = [];
  let prevIdx = 0;

  for (let i = 0; i < indexes.length; i++) {
    let slicedString = str.slice(prevIdx, indexes[i]);

    if (slicedString.length > 0) {
      result.push(slicedString);
    }

    prevIdx = indexes[i];
  }

  let lastString = str.slice(prevIdx);

  if (lastString.length > 0) {
    result.push(lastString);
  }

  return result;
};

const sortStyles = (styles) =>
  `${styles}`
    .split(';')
    .map((str) => str.trim())
    .sort()
    .join(';');

const removeDuplicatedStyles = (nodes) => {
  let unitedNodes = [...nodes];
  let wasChanged = false;

  do {
    wasChanged = false;
    const newNodes = [];

    for (let i = 0; i < unitedNodes.length; i++) {
      const node = unitedNodes[i];
      const nextNode = unitedNodes[i + 1];

      const sortedNodeStyles = sortStyles(node.style.cssText);
      const sortedNextNodeStyles = sortStyles(nextNode?.style?.cssText);

      if (sortedNodeStyles === sortedNextNodeStyles) {
        const newNode = node.cloneNode();
        newNode.textContent = node.textContent + nextNode?.textContent;
        newNodes.push(newNode);

        i++;
        wasChanged = true;
      } else {
        newNodes.push(node);
      }
    }

    unitedNodes = newNodes;
  } while (wasChanged);

  return unitedNodes;
};

const divideNode = (node, start, end) => {
  const text = node.textContent;

  const textParts = divideString(text, start, end);

  return textParts.map((textPart) => {
    const newEl = node.cloneNode();
    newEl.textContent = textPart;

    return newEl;
  });
};

const getNodeIndex = (childNodes, node) => [...childNodes].indexOf(node);

const getSelectedNodes = (nodes, startNode, endNode) => {
  const selected = [];
  let inRange = false;

  nodes.forEach((node) => {
    if (node === startNode) inRange = true;

    if (inRange) selected.push(node);

    if (node === endNode) inRange = false;
  });

  return selected;
};

const setNodeStyle = (styleProp) => (node, value) =>
  (node.style[styleProp] = value);

export {
  divideString,
  removeDuplicatedStyles,
  divideNode,
  getNodeIndex,
  getSelectedNodes,
  setNodeStyle,
};
