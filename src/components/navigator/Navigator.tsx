import type { MenuProps } from "antd";
import { Menu } from "antd";
import styles from "./index.module.less";
import ROUTER_PATH from "../../constant/routerPath";
import { useNavigate } from "react-router-dom";

const Navigator = () => {
  const navigator = useNavigate();

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

  const onClick: MenuProps["onClick"] = (e) => navigator(e.key);
  return (
    <div className={styles.container}>
      <Menu
        onClick={onClick}
        // selectedKeys={[current]}
        mode="inline"
        items={items}
      />
    </div>
  );
};

export default Navigator;
