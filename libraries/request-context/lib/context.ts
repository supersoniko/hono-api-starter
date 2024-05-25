import { AsyncLocalStorage } from 'node:async_hooks';

let currentContext: AsyncLocalStorage<unknown>;

export type DefaultRequestContext = {
  requestId: string;
};

export function requestContext<
  T extends DefaultRequestContext,
>(): AsyncLocalStorage<T> {
  if (currentContext === undefined) {
    currentContext = new AsyncLocalStorage<T>();
  }

  return currentContext as AsyncLocalStorage<T>;
}
