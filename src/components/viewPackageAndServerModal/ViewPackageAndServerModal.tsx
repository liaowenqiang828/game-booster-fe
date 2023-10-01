import { Button, Input, Modal, Table, Tag } from "antd";
import styles from "./index.module.less";
import type { ColumnsType } from "antd/es/table";
import SwitchTag from "../switchTag/SwitchTag";
import GameConfigPackageNameEditModal from "../gameConfigPackageNameEditModal/GameConfigPackageNameEditModal";
import { useState } from "react";
import GameConfigRegionServerEditModal from "../gameConfigRegionServerEditModal/GameConfigRegionServerEditModal";

export interface IPackageInfo {
  key: string;
  packageName: string;
  isStart: boolean;
  channel: string;
  signature: string;
  startTime: string;
  updateTime: string;
}

export interface IServerInfo {
  key: string;
  regionServerName: string;
  isStart: boolean;
  dns: string;
  accelerateLine: string[];
}

interface IProps {
  packageInfo?: IPackageInfo;
  serverInfo?: IServerInfo;
  closeModal: () => void;
}

const mockPackageData: IPackageInfo[] = [
  {
    key: "1",
    packageName: "com.beast.mi",
    isStart: true,
    channel: "小米",
    signature: "xxyabsad",
    startTime: "2023-09-16 16:00:00",
    updateTime: "2023-09-16 16:00:00",
  },
  {
    key: "2",
    packageName: "com.beast.mi",
    isStart: false,
    channel: "小米",
    signature: "xxyabsad",
    startTime: "2023-09-16 16:00:00",
    updateTime: "2023-09-16 16:00:00",
  },
  {
    key: "3",
    packageName: "com.beast.mi",
    isStart: true,
    channel: "小米",
    signature: "xxyabsad",
    startTime: "2023-09-16 16:00:00",
    updateTime: "2023-09-16 16:00:00",
  },
];

const mockReginServerData: IServerInfo[] = [
  {
    key: "1",
    regionServerName: "日服",
    isStart: true,
    dns: "google",
    accelerateLine: ["上海日本一区", "广东日本一区"],
  },
  {
    key: "2",
    regionServerName: "日服",
    isStart: false,
    dns: "google",
    accelerateLine: ["上海日本一区", "广东日本一区"],
  },
  {
    key: "3",
    regionServerName: "日服",
    isStart: true,
    dns: "google",
    accelerateLine: ["上海日本一区", "广东日本一区"],
  },
];

const ViewPackageAndServerModal = (props: IProps) => {
  const { packageInfo, serverInfo, closeModal } = props;

  const [showcPackageNameEditModal, setShowcPackageNameEditModal] =
    useState(false);
  const [showcRegionServerEditModal, setShowcRegionServerEditModal] =
    useState(false);
  const [currentPackage, setCurrentPackage] = useState({} as IPackageInfo);
  const [currentRegionServer, setCurrentRegionServer] = useState(
    {} as IServerInfo
  );
  const packageTableColumn: ColumnsType<IPackageInfo> = [
    {
      title: "包名",
      dataIndex: "packageName",
      key: "packageName",
    },
    {
      title: "是否启用",
      dataIndex: "isStart",
      key: "isStart",
      render: (isStart) => <SwitchTag check={isStart} />,
    },
    {
      title: "渠道",
      dataIndex: "channel",
      key: "channel",
    },
    {
      title: "签名",
      dataIndex: "signature",
      key: "signature",
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
      dataIndex: "",
      key: "operation",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={(e) => editPackageHandler(e, record.key)}
        >
          编辑
        </Button>
      ),
    },
  ];

  const regionServerTableColumn: ColumnsType<IServerInfo> = [
    {
      title: "区服名",
      dataIndex: "regionServerName",
      key: "regionServerName",
    },
    {
      title: "是否启用",
      dataIndex: "isStart",
      key: "isStart",
      render: (isStart) => <SwitchTag check={isStart} />,
    },
    {
      title: "DNS(单选)",
      dataIndex: "dns",
      key: "dns",
      render: (dns) => <Tag>{dns}</Tag>,
    },
    {
      title: "加速路线(可多选)",
      dataIndex: "accelerateLine",
      key: "accelerateLine",
      render: (accelerateLine) =>
        accelerateLine &&
        accelerateLine.map((item: string) => <Tag>{item}</Tag>),
    },
    {
      title: "操作",
      dataIndex: "",
      key: "operation",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={(e) => editReginServerHandler(e, record.key)}
        >
          编辑
        </Button>
      ),
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editPackageHandler = (e: any, key: string) => {
    console.log(e);
    console.log(key);
    setCurrentPackage(
      mockPackageData.filter((item) => item.key === key)[0] ??
        ({} as IPackageInfo)
    );
    setShowcPackageNameEditModal(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editReginServerHandler = (e: any, key: string) => {
    console.log(e);
    console.log(key);
    setCurrentRegionServer(
      mockReginServerData.filter((item) => item.key === key)[0] ??
        ({} as IServerInfo)
    );
    setShowcRegionServerEditModal(true);
  };

  const closePackageNameEditModal = () => {
    setShowcPackageNameEditModal(false);
    setCurrentPackage({} as IPackageInfo);
  };
  const closeRegionServerEditModal = () => {
    setShowcRegionServerEditModal(false);
    setCurrentRegionServer({} as IServerInfo);
  };

  const addNewPackageNameConfig = () => {
    setShowcPackageNameEditModal(true);
  };

  const addNewRegionServerConfig = () => {
    setShowcRegionServerEditModal(true);
  };

  return (
    <Modal
      centered
      open
      footer={null}
      onCancel={closeModal}
      width={1000}
      closable
    >
      <div className={styles.title}>游戏配置/新增&编辑游戏/包名&区服</div>
      <div className={styles.packageTable}>
        <div className={styles.addLine}>
          <label>游戏名</label>
          <Input />
          <Button type="primary" onClick={addNewPackageNameConfig}>
            新增
          </Button>
        </div>
        <Table dataSource={mockPackageData} columns={packageTableColumn} />
      </div>
      <div className={styles.serverTable}>
        <Button type="primary" onClick={addNewRegionServerConfig}>
          新增
        </Button>
        <Table
          dataSource={mockReginServerData}
          columns={regionServerTableColumn}
        />
      </div>

      {showcPackageNameEditModal && (
        <GameConfigPackageNameEditModal
          gameName=""
          packageInfo={currentPackage}
          closeModal={closePackageNameEditModal}
        />
      )}
      {showcRegionServerEditModal && (
        <GameConfigRegionServerEditModal
          gameName=""
          regionServer={currentRegionServer}
          closeModal={closeRegionServerEditModal}
        />
      )}
    </Modal>
  );
};

export default ViewPackageAndServerModal;
