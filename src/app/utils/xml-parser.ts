// src/app/utils/xml-parser.ts
export function parseXML(data: string): any {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(data, 'application/xml');

  return parseNode(xmlDoc.documentElement);
}

function parseNode(node: Node): any {
  const result: { [key: string]: any } = {};

  // Process attributes
  if (node.nodeType === Node.ELEMENT_NODE && (node as Element).hasAttributes()) {
    for (const attr of Array.from((node as Element).attributes)) {
      result[`@${attr.name}`] = attr.value;
    }
  }

  // Process child nodes
  for (const childNode of Array.from(node.childNodes)) {
    if (childNode.nodeType === Node.ELEMENT_NODE) {
      const childNodeName = childNode.nodeName;
      const childData = parseNode(childNode);

      if (result.hasOwnProperty(childNodeName)) {
        if (Array.isArray(result[childNodeName])) {
          result[childNodeName].push(childData);
        } else {
          result[childNodeName] = [result[childNodeName], childData];
        }
      } else {
        result[childNodeName] = childData;
      }
    } else if (childNode.nodeType === Node.TEXT_NODE && node.childNodes.length === 1) {
      result['#text'] = childNode.textContent?.trim();
    }
  }

  if (Object.keys(result).length === 1 && result.hasOwnProperty('#text')) {
    return result['#text'];
  }

  return result;
}
