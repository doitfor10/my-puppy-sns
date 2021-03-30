import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

//히스토리 객체 생성
export const history = createBrowserHistory();

//combineReducers
const rootReducer = combineReducers({
  router: connectRouter(history),
});

//히스토리를 thunk에서 사용할 수 있게 주입.
//리듀서 전 단계인 액션 생성함수 (미들웨어) 단계에서 사용 가능.
const middlewares = [thunk.withExtraArgument({ history })];

//개발환경 알려줌.
const env = process.env.NODE_ENV;

//개발환경일 때 리덕스 안에 데이터가 콘솔에 찍히게 한다. 
if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
};

//데브툴즈 설정
//브라우저에서만 돌아가기 위해 window && devtools 여부 묻기.
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

//미들웨어 묶어주기. 사용하는 모든 미들웨어를 묶어준다.
 const enhancer = composeEnhancers(
  applyMiddleware(...middlewares)
);

//리듀서+미들웨어 엮어서 store 만들기.
let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
