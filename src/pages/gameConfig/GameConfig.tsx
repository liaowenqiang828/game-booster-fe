import { Button, Input } from "antd";
import styles from "./index.module.less";
import Table, { ColumnsType } from "antd/es/table";
import SwitchTag from "../../components/switchTag/SwitchTag";
import { useContext, useEffect, useState } from "react";
import GameConfigBasicInfoModal from "../../components/gameConfigBasicInfoModal/GameConfigBasicInfoModal";
import ViewPackageAndServerModal from "../../components/viewPackageAndServerModal/ViewPackageAndServerModal";
import GameAccelerateConfigEditModal, {
  IGameAccelerateConfig,
} from "../../components/gameAccelerateConfigEditModal/GameAccelerateConfigEditModal";
import { IGame } from "../../types";
import { convertTimestampToStr } from "../../utils/dataTime";
import { LoadingContext } from "../../router/Router";
import { getGameList } from "../../api/game";

const mockDataSource: IGame[] = [
  {
    id: 1,
    title: "赛马娘",
    enabled: true,
    summary: "我只能做的...只是奔跑而已。",
    created_at: new Date().getTime(),
    updated_at: new Date().getTime(),
    icon: "",
    banner: "",
    character_pic: "",
  },
  {
    id: 2,
    title: "碧蓝档案",
    enabled: false,
    summary: "与你的日常，就是奇迹。",
    created_at: new Date().getTime(),
    updated_at: new Date().getTime(),
    icon: "",
    banner: "",
    character_pic: "",
  },
  {
    id: 3,
    title: "沉默的骑士",
    enabled: true,
    summary: "启程吧，以亡国之名。",
    created_at: new Date().getTime(),
    updated_at: new Date().getTime(),
    icon: "",
    banner: "",
    character_pic: "",
  },
];

const GameConfig = () => {
  const [showBasicInfoModal, setShowBasicInfoModal] = useState(false);
  const [showPackageModal, setPackageModal] = useState(false);
  const [showAccelerateConfigModal, setAccelerateConfigModal] = useState(false);
  const [currentGameConfig, setCurrentGameConfig] = useState({} as IGame);
  const [games, setGames] = useState([] as IGame[]);
  const [gameAmount, setGameAmount] = useState(0);
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const [basicInfoEditMode, setBasicInfoEditMode] = useState(false);
  const columns: ColumnsType<Omit<IGame, "icon" | "banner" | "character_pic">> =
    [
      {
        title: "游戏名",
        dataIndex: "title",
        key: "gameTitle",
      },
      {
        title: "是否启用",
        dataIndex: "enabled",
        key: "isStart",
        render: (enabled: boolean) => <SwitchTag check={enabled} />,
      },
      {
        title: "简介",
        dataIndex: "summary",
        key: "summary",
      },
      {
        title: "创建时间",
        dataIndex: "created_at",
        key: "createTime",
        render: (created_at) => convertTimestampToStr(created_at),
      },
      {
        title: "更新时间",
        dataIndex: "updated_at",
        key: "updateTime",
        render: (updated_at) => convertTimestampToStr(updated_at),
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
              onClick={(e) => editBasicInfoHandler(e, record.id)}
            >
              基本信息
            </Button>
            <Button
              type="primary"
              className={styles.messageBtn}
              onClick={(e) => editPacakgeNameHandler(e, record.id)}
            >
              包名&区服
            </Button>
            <Button
              type="primary"
              className={styles.messageBtn}
              onClick={(e) => editAccelerateConfigHandler(e, record.id)}
            >
              加速配置
            </Button>
          </>
        ),
      },
    ];

  useEffect(() => {
    const getGamesListAsync = async () => {
      showLoading();
      const res = await getGameList({ start_id: 0, cnt: 10 }).finally(() =>
        hideLoading()
      );
      setGames(res.games);
      setGameAmount(res.total);
    };

    getGamesListAsync();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editBasicInfoHandler = (e: any, key: number) => {
    console.log(e);
    console.log(key);
    setBasicInfoEditMode(true);
    setCurrentGameConfig(
      mockDataSource.filter((item) => item.id === key)[0] ?? {}
    );
    setShowBasicInfoModal(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editPacakgeNameHandler = (e: any, key: number) => {
    console.log(e);
    console.log(key);
    setCurrentGameConfig(
      mockDataSource.filter((item) => item.id === key)[0] ?? {}
    );
    setPackageModal(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editAccelerateConfigHandler = (e: any, key: number) => {
    console.log(e);
    console.log(key);
    setCurrentGameConfig(
      mockDataSource.filter((item) => item.id === key)[0] ?? {}
    );
    setAccelerateConfigModal(true);
  };

  const addNewGameHandler = () => {
    console.log("add new line");
    setBasicInfoEditMode(false);
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
          editMode={basicInfoEditMode}
        />
      )}
      {showPackageModal && (
        <ViewPackageAndServerModal
          gameId={currentGameConfig.id}
          closeModal={closePackageModal}
        />
      )}
      {showAccelerateConfigModal && (
        <GameAccelerateConfigEditModal
          gameId={currentGameConfig.id}
          gameName={currentGameConfig.title}
          closeModal={closeAccelerateConfigModal}
        />
      )}
    </div>
  );
};

export default GameConfig;
