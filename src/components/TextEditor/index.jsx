import { useEffect, useState } from 'react';

const getNodeIndex = (childNodes, node) => [...childNodes].indexOf(node);

const divideString = (str, indexes) => {
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

const divideNode = (node, start, end) => {
  const text = node.textContent;

  const textParts = divideString(text, [start, end]);

  return textParts.map((textPart) => {
    const newEl = node.cloneNode();
    newEl.textContent = textPart;

    return newEl;
  });
};

const setNodeStyle = (styleProp) => (node, value) =>
  (node.style[styleProp] = value);

const handleInput = (e) => {
  const includesSpans = [...e.target.childNodes].some(
    (node) => node.tagName === 'SPAN'
  );

  if (!includesSpans) {
    const initialSpan = document.createElement('span');
    initialSpan.textContent = e.target.textContent;

    e.target.innerHTML = '';
    e.target.append(initialSpan);

    if (initialSpan.textContent.length) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNode(initialSpan);
      selection.extend(initialSpan, 1);
      selection.collapseToEnd();
    }
  }

  if (
    e.target.childNodes.length === 1 &&
    e.target.childNodes[0].textContent.length === 0
  ) {
    e.target.innerHTML = '';
  }
};

const TextEditor = () => {
  const [parentNode, parentNodeSet] = useState();
  const [range, rangeSet] = useState();
  const [selectedNodes, selectedNodesSet] = useState([]);
  const [startNodeIndex, startNodeIndexSet] = useState();
  const [endNodeIndex, endNodeIndexSet] = useState();

  const startOffset = range?.startOffset;
  const endOffset = range?.endOffset;

  useEffect(() => {
    parentNodeSet(document.getElementById('editor'));
  }, []);

  const handleMouseUp = (event) => {
    const selectionObj = window.getSelection();
    const range = selectionObj.getRangeAt(0);

    const startContainer = range.startContainer;
    const endContainer = range.endContainer;

    const allSelectedNodes = getSelectedNodes(
      parentNode.childNodes,
      startContainer.parentNode,
      endContainer.parentNode
    );

    const startIndx = getNodeIndex(
      parentNode.childNodes,
      startContainer.parentNode
    );
    const endIndx = getNodeIndex(
      parentNode.childNodes,
      endContainer.parentNode
    );

    rangeSet(range);
    selectedNodesSet(allSelectedNodes);
    startNodeIndexSet(startIndx);
    endNodeIndexSet(endIndx);
  };

  const manageStyle =
    (styleProp) => (chosenNodes, startOffset, endOffset, value) => {
      const setNodeStyleProp = setNodeStyle(styleProp);

      const dividedNodes = chosenNodes.map((el, i, arr) => {
        const isFirst = i === 0;
        const isLast = el === arr.at(-1);
        const firstElementEndOffset =
          arr.length > 1 ? el.textContent.length : endOffset;

        if (isFirst) {
          return divideNode(el, startOffset, firstElementEndOffset);
        }

        if (isLast) {
          return divideNode(el, 0, endOffset);
        }

        return divideNode(el, 0, el.textContent.length);
      });

      const newNodes = dividedNodes.flat();

      const shouldRemoveStyle = newNodes.every(
        (node) => node.style[styleProp] === value
      );

      newNodes.forEach((node, i, arr) => {
        const styleNode = () =>
          setNodeStyleProp(node, shouldRemoveStyle ? '' : value);

        const isSelectionInsideOneNode = chosenNodes.length === 1;
        const shouldStyleFirstNode = startOffset === 0;

        if (isSelectionInsideOneNode) {
          const styledPartIndex = shouldStyleFirstNode ? 0 : 1;

          if (i === styledPartIndex) {
            styleNode();
          }
        }

        if (chosenNodes.length > 1) {
          const isFirst = i === 0;
          const isLast = node === arr.at(-1);
          const isMiddle = !isFirst && !isLast;
          const shouldStyleLastNode =
            endOffset === arr.at(-1).textContent.length;

          const shouldStyleNode =
            (isFirst && shouldStyleFirstNode) ||
            (isLast && shouldStyleLastNode) ||
            isMiddle;

          if (shouldStyleNode) {
            styleNode();
          }
        }
      });

      const united = removeDuplicatedStyles(newNodes);
      parentNode.children[startNodeIndex].before(...united);
      chosenNodes.forEach((el) => el.remove());
    };

  const processTextStyle = (styleProp) => (value) => {
    const manageStyleProp = manageStyle(styleProp);

    manageStyleProp(selectedNodes, startOffset, endOffset, value);

    const removedRepeated = removeDuplicatedStyles(parentNode.childNodes);
    parentNode.innerHTML = '';
    parentNode.append(...removedRepeated);
  };

  const processFontWeight = processTextStyle('fontWeight');
  const processFontSize = processTextStyle('fontSize');

  return (
    <>
      <button onClick={() => processFontWeight('bold')}>bold</button>
      <button onClick={() => processFontSize('24px')}>size</button>

      <div
        id="editor"
        contentEditable
        onMouseUp={handleMouseUp}
        onInput={handleInput}
      />
    </>
  );
};

export default TextEditor;
