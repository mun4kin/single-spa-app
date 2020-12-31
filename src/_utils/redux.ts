import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { BehaviorSubject } from 'rxjs';
import { mergeMap, skip } from 'rxjs/operators';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';

/** типизация расширенного стора*/

interface IExtStore extends Store {
  asyncReducers?: { [key: string]: any };
}

/** Создаем middleware для эффектов (эпиков) */
const observableMiddleware = createEpicMiddleware();

/** Динамическое подключение редьюсеров*/
export function createReducer(asyncReducers: any) {
  return combineReducers({
    ...asyncReducers
  });
}

const initReducer = (state = {}) => state;

/** Универсальный стор для всех приложений*/
export function configureStore() {
  const store: IExtStore = createStore(
    createReducer({ initReducer }),
    composeWithDevTools(applyMiddleware(observableMiddleware))
  );

  store.asyncReducers = {};
  return store;
}

// @ts-ignore
export const addEpics = (...rest) =>
  rest.forEach((i) => {
    if (!mapEfects[i.name]) {
      mapEfects[i.name] = true;
      effect$$.next(i);
    }
  });

export const store = configureStore();

/* функция для подключения редьюсеров в проект*/
export function injectAsyncReducer(store: any, name: string, asyncReducer: any) {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
}

/** Инициализация эффектов */
const effect$$ = new BehaviorSubject(undefined);
const mapEfects: { [key: string]: boolean } = {};
/* функция для подключения  эффектов*/

const rootEpic: any = (action$: any, state$: any) =>
  effect$$.pipe(
    skip(1),
    // @ts-ignore
    mergeMap((epic) => epic && epic(action$, state$))
  );

observableMiddleware.run(rootEpic);
