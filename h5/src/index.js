import dva from 'dva';
import fontsize from './utils/fontsize.js';
import './index.css';
import {createBrowserHistory} from 'history';




// 1. Initialize 创建应用
const app = dva({
	initialState: {},
	history: createBrowserHistory()
});

// 2. Plugins
// app.use({});
//创建应用
// const app = dva();
// 注册视图, params 参数是 func
// app.router(() => <App />)
// 启动应用
// app.start('#root')

// 3. Model 注册store
// console.log('models：', require('./models').default.forEach(key => app.model(key.default)));
require('./models').default.forEach(key => app.model(key.default))


// 4. Router 注册视图
app.router(require('./router').default);

// 5. Start
app.start('#root');
