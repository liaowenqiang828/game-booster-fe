import type { MenuProps } from "antd";
import { Menu } from "antd";
import styles from "./index.module.less";
import ROUTER_PATH from "../../constant/routerPath";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navigator = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);
  const [openKeys, setOpenKeys] = useState<string[]>(() => {
    if (
      location.pathname === ROUTER_PATH.ACL_GLOBAL_CONFIG ||
      location.pathname === ROUTER_PATH.ACL_GROUP_CONFIG
    ) {
      return [ROUTER_PATH.ACL_CONFIG];
    }
    return [];
  });

  const items: MenuProps["items"] = [
    {
      label: "Home",
      key: ROUTER_PATH.HOME,
    },
    {
      label: "节点配置",
      key: ROUTER_PATH.NODE_CONFIG,
    },
    {
      label: "线路配置",
      key: ROUTER_PATH.LINE_CONFIG,
    },
    {
      label: "DNS配置",
      key: ROUTER_PATH.DNS_CONFIG,
    },
    {
      label: "ACL配置",
      key: ROUTER_PATH.ACL_CONFIG,
      children: [
        {
          label: "全局ACL配置",
          key: ROUTER_PATH.ACL_GLOBAL_CONFIG,
        },
        {
          label: "ACL组配置",
          key: ROUTER_PATH.ACL_GROUP_CONFIG,
        },
      ],
    },
    {
      label: "游戏配置",
      key: ROUTER_PATH.GAME_CONGIF,
    },
    {
      label: "客户端升级配置",
      key: ROUTER_PATH.CLIENT_UPDATE_CONFIG,
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    console.log(e.key);

    if (
      e.key !== ROUTER_PATH.ACL_GLOBAL_CONFIG &&
      e.key !== ROUTER_PATH.ACL_GROUP_CONFIG
    ) {
      setOpenKeys([]);
    }
    navigator(e.key);
  };

  const onSubMenuOpenChange = (openKeys: string[]) => {
    setOpenKeys(openKeys);
  };

  return (
    <div className={styles.container}>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        openKeys={openKeys}
        mode="inline"
        items={items}
        onOpenChange={onSubMenuOpenChange}
      />
    </div>
  );
};

export default Navigator;
