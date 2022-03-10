import { writable } from 'svelte/store';
import { v4 as uuidv4 } from "uuid";

const createStore = () => {
  const { subscribe, update } = writable({
    camera: "play"
  });

  return {
    subscribe,
    setCamera: (value) => update(state => {
      state.camera = value;

      return state;
    })
  };
}

const createNotifications = () => {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    add: (text, type) => update(notifications => {
      notifications.unshift({
        id: uuidv4(),
        text: text,
        type: type
      });

      if (notifications.length > 6) {
        notifications.pop();
      }

      return notifications;
    }),
    removeAt: (id) => update(notifications => notifications.filter(notification => notification.id != id)),
    clear: () => set([])
  };
}

export const store = createStore();
export let notifications = createNotifications();
