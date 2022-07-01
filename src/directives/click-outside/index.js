const events = ["click"];

function onClickOutside({ event, el, handler, middleware }) {
  const isClickOutside = event.target !== el && !el.contains(event.target);

  if (!isClickOutside || !middleware(event, el)) {
    return null;
  }

  return handler(event, el);
}

const instances = new Map();

function toggleEventListeners(eventHandlers) {
  return (action) => {
    eventHandlers.forEach(({ event, handler }) => {
      document[`${action}EventListener`](event, handler, true);
    });
  };
}

function processArgs(value) {
  const isFunction = typeof value === "function";

  if (!isFunction && typeof value !== "object") {
    throw new Error(
      `v-click-outside: Binding value should be a function or an object, ${typeof bindingValue} given`
    );
  }

  return {
    handler: isFunction ? value : value.handler,
    middleware: value.middleware || (() => true),
  };
}

function eventAdapter(events, { el, handler, middleware }) {
  return events.map((eventName) => ({
    event: eventName,
    handler: (event) => onClickOutside({ event, el, handler, middleware }),
  }));
}

function created(el, { value }) {
  const { handler, middleware } = processArgs(value);
  const eventHandlers = eventAdapter(events, { el, handler, middleware });

  instances.set(el, eventHandlers);

  toggleEventListeners(eventHandlers)("add");
}

function unbind(el) {
  const eventHandlers = instances.get(el);

  toggleEventListeners(eventHandlers)("remove");

  instances.delete(el);
}

const ClickOutside = {
  created,
  unbind,
};

export default ClickOutside;
