/**
 * Lightweight monitor for DOM changes.
 */

/**
 * MutationObservers are used to monitor changes to each DOM (including both Document and shadow DOMs).
 * A global set of observers is used to avoid creating an observer per custom element instance which could
 * lead to a combinatorial explosion of events on each change.
 * This design still holds some risk as we end up with a single listener callback per custom element. The
 * hope is the callback overhead will be kept minimal by:
 * 1. Callbacks are only fired for changes to the element's on subtree.
 * 2. Keeping callbacks very cheap in the normal case (ie, when a mutation does not effect the element)
 */
const observers = {};
const listenerGroups = {};

const initObserver = (root) => {
  if (root in observers) {
    return;
  }

  const observer = new MutationObserver(getGroupNotifier(root));
  observer.observe(root, {
    subtree: true,
    childList: true,
    attributes: true,
  });
  observers[root] = observer;
};

const getListenerGroup = (root) => {
  if (root in listenerGroups) {
    return listenerGroups[root];
  }

  const group = [];
  listenerGroups[root] = group;
  return group;
};

const getGroupNotifier = (root) => () => {
  const group = getListenerGroup(root);
  for (const callback of group) {
    callback();
  }
};

const addListener = (root, callback) => {
  const group = getListenerGroup(root);
  group.push(callback);
};

// TODO: Consider accepting child nodes and finding root here to avoid bugs.
export const observe = (root, callback) => {
  initObserver(root);
  addListener(root, callback);
};
