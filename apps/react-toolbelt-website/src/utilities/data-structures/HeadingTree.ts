import { HeadingListItem } from '@/types';

/**
 * A Tree Node used by the HeadingTree class to add new nodes
 * ----------------------------------------------------------
 *
 * @export
 * @class HeadingTreeNode
 * @typedef {HeadingTreeNode}
 */
export class HeadingTreeNode {
  value: HeadingListItem | null;
  parent: HeadingTreeNode | null;
  children: HeadingTreeNode[] | null;
  constructor(
    value: HeadingListItem | null = null,
    parent: HeadingTreeNode | null = null,
    children: HeadingTreeNode[] | null = []
  ) {
    this.value = value;
    this.parent = parent;
    this.children = children;
  }
}

/**
 * Headings of a Markdown file generated as a Tree
 * -----------------------------------------------
 *
 * @export
 * @class `HeadingTree`
 * @typedef {HeadingTree}
 */
export class HeadingTree {
  root: HeadingTreeNode[];
  maxLevel: number;
  constructor() {
    this.root = [];
    this.maxLevel = 0;
  }
  /**
   * Add a HeadingListItem
   * @param value
   * @returns `void`
   */
  add(value?: HeadingTreeNode['value']): void {
    if (!value) return;
    if (this.root.length === 0) {
      this.root[0] = new HeadingTreeNode(value);
      return;
    }

    const siblings: HeadingTreeNode[] = [];
    const searchAndInsert = (
      node: HeadingTreeNode,
      difference: number,
      targetNode: HeadingTreeNode
    ): HeadingTreeNode => {
      if (difference === 0) siblings.push(targetNode);

      if (difference === 1) {
        (node.children as HeadingTreeNode[]).push(targetNode);
        this.maxLevel = Math.max(this.maxLevel, targetNode.value?.level ?? 2);
      }

      if (difference > 1 && node.children && targetNode.value) {
        const matches: [number, HeadingTreeNode][] = [];
        for (let i = 0; i < node.children.length; i++) {
          if (node.children[i].value?.level === targetNode.value.level - 1) {
            matches[0] = [i, node.children[i]];
          }
          // Reached last item yet found no matches
          if (i === node.children.length - 1 && matches.length === 0) {
            if (node.children[i] !== null) {
              node.children.splice(
                i,
                1,
                searchAndInsert(
                  node.children[i],
                  targetNode.value.level -
                    (node.children[i].value?.level as number),
                  targetNode
                )
              );
              return node;
            }
          }
        }
        if (!matches) return node;

        const currentIndex = matches[0][0];
        const currentItem = matches[0][1];

        if (currentItem.value) {
          /** Replace in-place, the old child with the updated child */
          node.children.splice(
            currentIndex,
            1,
            searchAndInsert(
              currentItem,
              targetNode.value.level - currentItem.value.level,
              targetNode
            )
          );
        }
      }
      return node;
    };
    const node = this.root.pop();
    if (node?.value?.level) {
      const difference: number = value.level - node.value.level;
      this.root.push(
        searchAndInsert(node, difference, new HeadingTreeNode(value)),
        ...siblings
      );
    }
  }

  /**
   * Normalize the Tree to return an output ready for use with Navigation
   *
   */
  normalize(): HeadingListItem[] | undefined {
    const nodes = this.root;
    const normalizeItems = (
      nodes: HeadingTreeNode[] | null,
      parent: string | null = null
    ): HeadingListItem[] | undefined => {
      return nodes?.map((node) => {
        const value = node.value;
        return {
          ...value,
          parent,
          items: normalizeItems(node.children, node.value?.id)
        };
      }) as HeadingListItem[] | undefined;
    };
    return normalizeItems(nodes);
  }
}
