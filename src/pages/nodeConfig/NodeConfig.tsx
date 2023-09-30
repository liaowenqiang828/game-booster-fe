import { Button, Input, Table, Tag } from "antd";
import styles from "./index.module.less";
import type { ColumnsType } from "antd/es/table";
import SwitchTag from "../../components/switchTag/SwitchTag";
import { useState } from "react";
import NodeConfigEditModal from "../../components/nodeConfigEditModal/NodeConfigEditModal";

export interface INodeConfig {
  key: string;
  nodeAddress: string;
  nodeName: string;
  isStart: boolean;
  version: string;
  accelerateMode: string[];
  onLinePeopleNumber: number;
  startTime: string;
  updateTime: string;
}

const mockDataSource = [
  {
    key: "1",
    nodeAddress: "101.202.55.44",
    nodeName: "SH- JP001",
    isStart: true,
    version: "V1.0.1",
    accelerateMode: ["高速", "下载"],
    onLinePeopleNumber: 500,
    startTime: "2023-09-17 15:00:00",
    updateTime: "2023-09-17 15:00:00",
  },
  {
    key: "2",
    nodeAddress: "202.101.44.55",
    nodeName: "SH- JP002",
    isStart: false,
    version: "V1.0.1",
    accelerateMode: ["下载"],
    onLinePeopleNumber: 499,
    startTime: "2023-09-17 15:00:00",
    updateTime: "2023-09-17 15:00:00",
  },
  {
    key: "3",
    nodeAddress: "192.168.131.1",
    nodeName: "SH- JP003",
    isStart: true,
    version: "V1.0.1",
    accelerateMode: ["高速"],
    onLinePeopleNumber: 498,
    startTime: "2023-09-17 15:00:00",
    updateTime: "2023-09-17 15:00:00",
  },
];

const NodeConfig = () => {
  const [openModal, setOpenModal] = useState(false);
  const columns: ColumnsType<INodeConfig> = [
    {
      title: "节点地址",
      dataIndex: "nodeAddress",
      key: "nodeAddress",
    },
    {
      title: "节点名",
      dataIndex: "nodeName",
      key: "anodeNamege",
    },
    {
      title: "是否启动",
      dataIndex: "isStart",
      key: "isStart",
      render: (isStart: boolean) => <SwitchTag check={isStart} />,
    },
    {
      title: "程序版本",
      dataIndex: "version",
      key: "version",
    },
    {
      title: "加速模式",
      dataIndex: "accelerateMode",
      key: "accelerateMode",
      render: (accelerateMode: string[]) =>
        accelerateMode.length &&
        accelerateMode.map((item) => (
          <Tag key={item} color="black">
            {item}
          </Tag>
        )),
    },
    {
      title: "当前在线人数",
      dataIndex: "onLinePeopleNumber",
      key: "onLinePeopleNumber",
    },
    {
      title: "启动时间",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      key: "updateTime",
    },
    {
      title: "操作",
      dataIndex: "operation",
      key: "operation",
      render: (_, record) => (
        <Button
          type="primary"
          className={styles.editBtn}
          onClick={(e) => editNodeConfigItemHandler(e, record.key)}
        >
          编辑
        </Button>
      ),
    },
  ];
  const [currentNodeConfig, setCurrentNodeConfig] = useState({} as INodeConfig);

  const closeModal = () => setOpenModal(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editNodeConfigItemHandler = (e: any, key: string) => {
    console.log(e);
    console.log(key);
    setCurrentNodeConfig(
      mockDataSource.filter((item) => item.key === key)[0] ?? {}
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
