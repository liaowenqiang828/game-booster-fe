import { Button, Input } from "antd";
import styles from "./index.module.less";
import Table, { ColumnsType } from "antd/es/table";
import SwitchTag from "../../components/switchTag/SwitchTag";
import { useState } from "react";
import GameConfigBasicInfoModal from "../../components/gameConfigBasicInfoModal/GameConfigBasicInfoModal";

export interface IGameConfig {
  key: string;
  gameName: string;
  isStart: boolean;
  description: string;
  createTime: string;
  updateTime: string;
}

const mockDataSource: IGameConfig[] = [
  {
    key: "1",
    gameName: "赛马娘",
    isStart: true,
    description: "我只能做的...只是奔跑而已。",
    createTime: "2023-09-16 16:00:00",
    updateTime: "2023-09-17 15:00:00",
  },
  {
    key: "2",
    gameName: "碧蓝档案",
    isStart: false,
    description: "与你的日常，就是奇迹。",
    createTime: "2023-09-16 16:00:00",
    updateTime: "2023-09-17 15:00:00",
  },
  {
    key: "3",
    gameName: "沉默的骑士",
    isStart: true,
    description: "启程吧，以亡国之名。",
    createTime: "2023-09-16 16:00:00",
    updateTime: "2023-09-17 15:00:00",
  },
];

const GameConfig = () => {
  const [showBasicInfoModal, setShowBasicInfoModal] = useState(false);
  const [showPackageModal, setPackageModal] = useState(false);
  const [showAccelerateConfigModal, setAccelerateConfigModal] = useState(false);
  const [currentGameConfig, setCurrentGameConfig] = useState({} as IGameConfig);
  const columns: ColumnsType<IGameConfig> = [
    {
      title: "游戏名称",
      dataIndex: "gameName",
      key: "gameName",
    },
    {
      title: "是否启用",
      dataIndex: "isStart",
      key: "isStart",
      render: (isStart: boolean) => <SwitchTag check={isStart} />,
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      key: "updateTime",
    },
    {
      title: "操作",
      key: "operation",
      width: 300,
      render: (_, record) => (
        <>
          <Button
            type="primary"
            className={styles.messageBtn}
            onClick={(e) => editBasicInfoHandler(e, record.key)}
          >
            基本信息
          </Button>
          <Button
            type="primary"
            className={styles.messageBtn}
            onClick={(e) => editPacakgeNameHandler(e, record.key)}
          >
            包名&区服
          </Button>
          <Button
            type="primary"
            className={styles.messageBtn}
            onClick={(e) => editAccelerateConfigHandler(e, record.key)}
          >
            加速配置
          </Button>
        </>
      ),
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editBasicInfoHandler = (e: any, key: string) => {
    console.log(e);
    console.log(key);
    setCurrentGameConfig(
      mockDataSource.filter((item) => item.key === key)[0] ?? {}
    );
    setShowBasicInfoModal(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editPacakgeNameHandler = (e: any, key: string) => {
    console.log(e);
    console.log(key);
    setCurrentGameConfig(
      mockDataSource.filter((item) => item.key === key)[0] ?? {}
    );
    setPackageModal(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editAccelerateConfigHandler = (e: any, key: string) => {
    console.log(e);
    console.log(key);
    setCurrentGameConfig(
      mockDataSource.filter((item) => item.key === key)[0] ?? {}
    );
    setAccelerateConfigModal(true);
  };

  const addNewGameHandler = () => {
    console.log("add new line");
    setShowBasicInfoModal(true);
  };

  const closeBasicInfoModal = () => setShowBasicInfoModal(false);
  const closePackageModal = () => setPackageModal(false);
  const closeAccelerateConfigModal = () => setAccelerateConfigModal(false);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.text}>游戏配置</div>
        <Input.Search placeholder="在此搜索游戏名" className={styles.search} />
        <Button
          onClick={addNewGameHandler}
          type="primary"
          className={styles.addNewBtn}
        >
          新增游戏
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={mockDataSource}
        className={styles.table}
      />
      {showBasicInfoModal && (
        <GameConfigBasicInfoModal
          gameConfig={currentGameConfig}
          closeModal={closeBasicInfoModal}
        />
      )}
      {showPackageModal && (
        <GameConfigBasicInfoModal
          gameConfig={currentGameConfig}
          closeModal={closePackageModal}
        />
      )}
      {showAccelerateConfigModal && (
        <GameConfigBasicInfoModal
          gameConfig={currentGameConfig}
          closeModal={closeAccelerateConfigModal}
        />
      )}
    </div>
  );
};

export default GameConfig;
