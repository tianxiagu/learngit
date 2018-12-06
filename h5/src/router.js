import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Member from './routes/member';
import Products from './routes/products';
import Personal from './routes/personal';
import ShopIntro from './routes/shopIntro';
import Upgrade from './routes/upgrade';

import Fans from './routes/fans';
import Mymember from './routes/mymember';
import Myteam from './routes/myteam';
import Invite from './routes/invite';
import Earnings from './routes/earnings';

import MyOrder from './routes/myOrder';
import TodaySales from './routes/todaySales';
import Setting from './routes/setting';
import AddCard from './routes/addCard';
import CashVerifica from './routes/cashVerifica';
import CashWithdrawal from './routes/cashWithdrawal';
import ModifyNickname from './routes/modifyNickname';
import StoreRevision from './routes/storeRevision';
import AccountDetail from './routes/accountDetail';


import Map from './routes/map';





function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Map} />
        <Route path="/member" exact component={Member} />
        <Route path="/products" exact component={Products} />
        <Route path="/personal" exact component={Personal} />
        <Route path="/shopintro" exact component={ShopIntro} />
        <Route path="/upgrade" exact component={Upgrade} />

        <Route path="/fans" exact component={Fans} />
        <Route path="/mymember" exact component={Mymember} />
        <Route path="/myteam" exact component={Myteam} />
        <Route path="/invite" exact component={Invite} />
        <Route path="/earnings" exact component={Earnings} />


        <Route path="/myorder" exact component={MyOrder}></Route>
        <Route path="/todaysales" exact component={TodaySales}></Route>
        <Route path="/setting" exact component={Setting}></Route>
        <Route path="/addcard" exact component={AddCard}></Route>
        <Route path="/cashverifica" exact component={CashVerifica}></Route>
        <Route path="/cashwithdrawal" exact component={CashWithdrawal}></Route>
        <Route path="/modifynick" exact component={ModifyNickname}></Route>
        <Route path="/storerevision" exact component={StoreRevision}></Route>
        <Route path="/account" exact component={AccountDetail}></Route>


      </Switch>
    </Router>
  );
}

export default RouterConfig;
