import { Button, Input } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import SwitchTag from "../../components/switchTag/SwitchTag";
import { useContext, useEffect, useState } from "react";
import GameConfigBasicInfoModal from "../../components/gameConfigBasicInfoModal/GameConfigBasicInfoModal";
import ViewPackageAndServerModal from "../../components/viewPackageAndServerModal/ViewPackageAndServerModal";
import GameAccelerateConfigEditModal from "../../components/gameAccelerateConfigEditModal/GameAccelerateConfigEditModal";
import { convertTimestampToStr } from "../../utils/dataTime";
import { LoadingContext } from "../../router/Router";
import { getGameList, searchGames } from "../../api/game";
import { IGame } from "../../types/index";
import styles from "./index.module.less";

const GameConfig = () => {
  const [showBasicInfoModal, setShowBasicInfoModal] = useState(false);
  const [showPackageModal, setPackageModal] = useState(false);
  const [showAccelerateConfigModal, setAccelerateConfigModal] = useState(false);
  const [currentGameConfig, setCurrentGameConfig] = useState({} as IGame);
  const [games, setGames] = useState([] as IGame[]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [showSearchResult, setShowSearchResult] = useState(false);
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
        render: (created_at: number) => convertTimestampToStr(created_at),
      },
      {
        title: "更新时间",
        dataIndex: "updated_at",
        key: "updateTime",
        render: (updated_at: number) => convertTimestampToStr(updated_at),
      },
      {
        title: "操作",
        key: "operation",
        width: 300,
        render: (_: any, record: IGame) => (
          <>
            <Button
              type="primary"
              className={styles.messageBtn}
              onClick={(e: any) => editBasicInfoHandler(e, record.id)}
            >
              基本信息
            </Button>
            <Button
              type="primary"
              className={styles.messageBtn}
              onClick={(e: any) => editPacakgeNameHandler(e, record.id)}
            >
              包名&区服
            </Button>
            <Button
              type="primary"
              className={styles.messageBtn}
              onClick={(e: any) => editAccelerateConfigHandler(e, record.id)}
            >
              加速配置
            </Button>
          </>
        ),
      },
    ];

  const getGamesListAsync = async (pageSize: number, pageNumber?: number) => {
    showLoading();
    const res = await getGameList({
      offset: pageNumber ? (pageNumber - 1) * pageSize + 1 : 0,
      cnt: pageSize,
    }).finally(() => hideLoading());
    setGames(res.games);
    setTotal(res.total);
  };

  useEffect(() => {
    getGamesListAsync(pageSize);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editBasicInfoHandler = (e: any, key: number) => {
    console.log(e);
    console.log(key);
    setBasicInfoEditMode(true);
    setCurrentGameConfig(games.filter((item) => item.id === key)[0] ?? {});
    setShowBasicInfoModal(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editPacakgeNameHandler = (e: any, key: number) => {
    console.log(e);
    console.log(key);
    setCurrentGameConfig(games.filter((item) => item.id === key)[0] ?? {});
    setPackageModal(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editAccelerateConfigHandler = (e: any, key: number) => {
    console.log(e);
    console.log(key);
    setCurrentGameConfig(games.filter((item) => item.id === key)[0] ?? {});
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

  const onSearchGames = (value: string) => {
    showLoading();
    if (value === "") {
      setShowSearchResult(false);
      getGamesListAsync(pageSize, currentPage);
    }
    // todo id=0, 按照名称搜索
    searchGames({ id: 0, title: value })
      .then((res) => {
        setGames(res.games);
        setShowSearchResult(true);
      })
      .finally(() => hideLoading());
  };

  const onPageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    getGamesListAsync(pageSize, page);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.text}>游戏配置</div>
        <div className={styles.operator}>
          <Input.Search
            placeholder="在此搜索游戏名"
            className={styles.search}
            onSearch={onSearchGames}
            allowClear
          />
          <Button
            onClick={addNewGameHandler}
            type="primary"
            className={styles.addNewBtn}
          >
            新增游戏
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={games}
        rowKey="id"
        className={styles.table}
        pagination={
          showSearchResult
            ? false
            : {
                pageSize,
                total,
                current: currentPage,
                onChange: onPageChange,
              }
        }
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
          gameName={currentGameConfig.title}
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
