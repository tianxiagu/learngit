import React from 'react';
import { connect } from 'dva';
import ProductList from '../components/ProductList';
// import api from '../servers/api';
import api from '../services/api';



// connect 方法一个函数，绑定State到View

const Products = ({dispatch, products}) => {
	// <h2>List of Products</h2>
	function handleDelete(id) {
		// dispatch 一个函数，触发一个事件。
		dispatch({
			type: 'products/delete',
			payload: id,
		});
	}
	// api.query();
	return (
		<div>
			<h2>List of ProductList</h2>
			{/* <ProductList onDelete={handleDelete} products={products} /> */}
		</div>
	);
};


let productsData = ({products}) => {
	return {
		products
	}
}

export default connect(productsData)(Products);

