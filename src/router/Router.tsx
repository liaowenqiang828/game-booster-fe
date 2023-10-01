import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import NodeConfig from "../pages/nodeConfig/NodeConfig";
import AppPage from "../pages/appPage/AppPage";
import ROUTER_PATH from "../constant/routerPath";
import LineConfig from "../pages/lineConfig/LineConfig";
import DnsConfig from "../pages/dnsConfig/DnsConfig";
// import AclConfig from "../pages/aclConfig/AclConfig";
import GameConfig from "../pages/gameConfig/GameConfig";
import ClientUpdateConfig from "../pages/clientUpdateConfig/ClientUpdateConfig";
import GlobalAclConfig from "../pages/globalAclConfig/GlobalAclConfig";
import AclGroupConfig from "../pages/aclGroupConfig/AclGroupConfig";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<AppPage />}>
        <Route path={ROUTER_PATH.HOME} element={<Home />} />
        <Route path={ROUTER_PATH.NODE_CONFIG} element={<NodeConfig />} />
        <Route path={ROUTER_PATH.LINE_CONFIG} element={<LineConfig />} />
        <Route path={ROUTER_PATH.DNS_CONFIG} element={<DnsConfig />} />
        <Route path={ROUTER_PATH.ACL_CONFIG} element={null}>
          <Route
            path={ROUTER_PATH.ACL_GLOBAL_CONFIG}
            element={<GlobalAclConfig />}
          ></Route>
          <Route
            path={ROUTER_PATH.ACL_GROUP_CONFIG}
            element={<AclGroupConfig />}
          ></Route>
        </Route>
        <Route path={ROUTER_PATH.GAME_CONGIF} element={<GameConfig />} />
        <Route
          path={ROUTER_PATH.CLIENT_UPDATE_CONFIG}
          element={<ClientUpdateConfig />}
        />
      </Route>
      <Route path={ROUTER_PATH.LOGIN} element={<Login />} />
    </Routes>
  );
};

export default Router;
