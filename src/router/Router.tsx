import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import NodeConfig from "../pages/nodeConfig/NodeConfig";
import AppPage from "../pages/appPage/AppPage";
import ROUTER_PATH from "../constant/routerPath";
import LineConfig from "../pages/lineConfig/LineConfig";
import DnsConfig from "../pages/dnsConfig/DnsConfig";
import GameConfig from "../pages/gameConfig/GameConfig";
import ClientUpdateConfig from "../pages/clientUpdateConfig/ClientUpdateConfig";
import GlobalAclConfig from "../pages/globalAclConfig/GlobalAclConfig";
import AclGroupConfig from "../pages/aclGroupConfig/AclGroupConfig";
import { createContext, useState } from "react";
import { Spin } from "antd";
import styles from "./index.module.less";
import RequireAuth from "./RequireAuth";

// eslint-disable-next-line react-refresh/only-export-components
export const LoadingContext = createContext<{
  showLoading: () => void;
  hideLoading: () => void;
}>({ showLoading: () => {}, hideLoading: () => {} });

const Router = () => {
  const [isLoading, setIsLoading] = useState(false);
  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading }}>
      <div className={styles.container}>
        <Spin tip="Loading..." size="large" spinning={isLoading}>
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <AppPage />
                </RequireAuth>
              }
            >
              <Route
                path={ROUTER_PATH.HOME}
                element={
                  <RequireAuth>
                    <Home />
                  </RequireAuth>
                }
              />
              <Route
                path={ROUTER_PATH.NODE_CONFIG}
                element={
                  <RequireAuth>
                    <NodeConfig />
                  </RequireAuth>
                }
              />
              <Route
                path={ROUTER_PATH.LINE_CONFIG}
                element={
                  <RequireAuth>
                    <LineConfig />
                  </RequireAuth>
                }
              />
              <Route
                path={ROUTER_PATH.DNS_CONFIG}
                element={
                  <RequireAuth>
                    <DnsConfig />
                  </RequireAuth>
                }
              />
              <Route path={ROUTER_PATH.ACL_CONFIG} element={null}>
                <Route
                  path={ROUTER_PATH.ACL_GLOBAL_CONFIG}
                  element={
                    <RequireAuth>
                      <GlobalAclConfig />
                    </RequireAuth>
                  }
                ></Route>
                <Route
                  path={ROUTER_PATH.ACL_GROUP_CONFIG}
                  element={
                    <RequireAuth>
                      <AclGroupConfig />
                    </RequireAuth>
                  }
                ></Route>
              </Route>
              <Route
                path={ROUTER_PATH.GAME_CONGIF}
                element={
                  <RequireAuth>
                    <GameConfig />
                  </RequireAuth>
                }
              />
              <Route
                path={ROUTER_PATH.CLIENT_UPDATE_CONFIG}
                element={
                  <RequireAuth>
                    <ClientUpdateConfig />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path={ROUTER_PATH.LOGIN} element={<Login />} />
          </Routes>
        </Spin>
      </div>
    </LoadingContext.Provider>
  );
};

export default Router;
