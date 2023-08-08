import { AsyncLocalStorage } from 'node:async_hooks';

let currentContext: AsyncLocalStorage<unknown>;

type DefaultContext = {
  requestId: string;
};

export function requestContext<
  T extends DefaultContext,
>(): AsyncLocalStorage<T> {
  if (currentContext === undefined) {
    currentContext = new AsyncLocalStorage<T>();
  }

  return currentContext as AsyncLocalStorage<T>;
}
