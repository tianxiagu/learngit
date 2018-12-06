export default {
	namespace: 'products', 
	state: [],
	reducers: { // action处理器，用来处理同步
		'delete'(state, {payload: id}) {
			return state.filter(item => item.id !== id);
		}
	},
	effects: {// Effects 是一个generator函数，action处理器，用来处理异步,基于redux-saga,用来处理异步的操作的。
		*addAfter(action, {call, put}){
			// yield call(delay, 1000); //执行异步函数或者是请求ajax
			yield put({type: 'delete'}); //处理dispatch函数
		}

	}
}
