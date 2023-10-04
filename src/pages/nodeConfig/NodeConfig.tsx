import { Button, Input, Table, Tag } from "antd";
import styles from "./index.module.less";
import type { ColumnsType } from "antd/es/table";
import SwitchTag from "../../components/switchTag/SwitchTag";
import { useState } from "react";
import NodeConfigEditModal from "../../components/nodeConfigEditModal/NodeConfigEditModal";
import { IBoostNode } from "../../types";
import { convertTimestampToStr } from "../../utils/dataTime";
import { Mode } from "../../constant";

export type IBoostNodeModel = Omit<
  IBoostNode,
  "bandwidth" | "cur_in_bandwidth" | "cur_out_bandwidth" | "created_at"
>;

const mockDataSource: IBoostNodeModel[] = [
  {
    id: 1,
    public_addr: "101.202.55.44",
    name: "SH- JP001",
    enabled: true,
    ver: "V1.0.1",
    modes: 3,
    online_cnt: 500,
    started_at: new Date().getTime(),
    updated_at: new Date().getTime(),
  },
  {
    id: 2,
    public_addr: "202.101.44.55",
    name: "SH- JP002",
    enabled: false,
    ver: "V1.0.1",
    modes: 1,
    online_cnt: 499,
    started_at: new Date().getTime(),
    updated_at: new Date().getTime(),
  },
  {
    id: 3,
    public_addr: "192.168.131.1",
    name: "SH- JP003",
    enabled: true,
    ver: "V1.0.1",
    modes: 2,
    online_cnt: 498,
    started_at: new Date().getTime(),
    updated_at: new Date().getTime(),
  },
];

const NodeConfig = () => {
  const [openModal, setOpenModal] = useState(false);
  const columns: ColumnsType<IBoostNodeModel> = [
    {
      title: "节点地址",
      dataIndex: "public_addr",
      key: "public_addr",
    },
    {
      title: "节点名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "是否启动",
      dataIndex: "enabled",
      key: "enabled",
      render: (enabled: boolean) => <SwitchTag check={enabled} />,
    },
    {
      title: "程序版本",
      dataIndex: "ver",
      key: "ver",
    },
    {
      title: "加速模式",
      dataIndex: "modes",
      key: "modes",
      render: (modes: number) =>
        Mode[modes].map((item: string) => (
          <Tag key={item} color="black">
            {item}
          </Tag>
        )),
    },
    {
      title: "当前在线人数",
      dataIndex: "online_cnt",
      key: "online_cnt",
    },
    {
      title: "启动时间",
      dataIndex: "started_at",
      key: "started_at",
      render: (started_at) => convertTimestampToStr(started_at),
    },
    {
      title: "更新时间",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (updated_at) => convertTimestampToStr(updated_at),
    },
    {
      title: "操作",
      dataIndex: "operation",
      key: "operation",
      render: (_, record) => (
        <Button
          type="primary"
          className={styles.editBtn}
          onClick={(e) => editNodeConfigItemHandler(e, record.id)}
        >
          编辑
        </Button>
      ),
    },
  ];
  const [currentNodeConfig, setCurrentNodeConfig] = useState(
    {} as IBoostNodeModel
  );

  const closeModal = () => setOpenModal(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editNodeConfigItemHandler = (e: any, key: number) => {
    console.log(e);
    console.log(key);
    setCurrentNodeConfig(
      mockDataSource.filter((item) => item.id === key)[0] ??
        ({} as IBoostNodeModel)
    );
    setOpenModal(true);
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.text}>节点配置</div>
        <Input.Search
          placeholder="在此搜索节点地址"
          className={styles.search}
        />
      </div>
      <Table
        columns={columns}
        dataSource={mockDataSource}
        className={styles.table}
      />
      {openModal && (
        <NodeConfigEditModal
          nodeConfig={currentNodeConfig}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default NodeConfig;
