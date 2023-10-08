import { Button, Input, Modal, Table, Tag } from "antd";
import styles from "./index.module.less";
import type { ColumnsType } from "antd/es/table";
import SwitchTag from "../switchTag/SwitchTag";
import GameConfigPackageNameEditModal from "../gameConfigPackageNameEditModal/GameConfigPackageNameEditModal";
import { useContext, useEffect, useState } from "react";
import GameConfigRegionServerEditModal from "../gameConfigRegionServerEditModal/GameConfigRegionServerEditModal";
import { IGamePkg, IGameRegion } from "../../types";
import { getGamePkgsList, getGameRegionList } from "../../api/game";
import { LoadingContext } from "../../router/Router";
import { convertTimestampToStr } from "../../utils/dataTime";

interface IProps {
  gameId: number;
  closeModal: () => void;
}

const mockPackageData: IGamePkg[] = [
  {
    name: "com.beast.mi0",
    enabled: true,
    channel: "小米",
    sign: "xxyabsad",
    created_at: new Date().getTime(),
    updated_at: new Date().getTime(),
  },
  {
    name: "com.beast.mi1",
    enabled: false,
    channel: "小米",
    sign: "xxyabsad",
    created_at: new Date().getTime(),
    updated_at: new Date().getTime(),
  },
  {
    name: "com.beast.mi2",
    enabled: true,
    channel: "小米",
    sign: "xxyabsad",
    created_at: new Date().getTime(),
    updated_at: new Date().getTime(),
  },
];

const mockReginServerData: IGameRegion[] = [
  {
    id: 1,
    name: "日服",
    enabled: true,
    dns_group: 2,
    boost_zones: [1, 2, 3],
    created_at: new Date().getTime(),
    updated_at: new Date().getTime(),
  },
  {
    id: 2,
    name: "日服",
    enabled: false,
    dns_group: 1,
    boost_zones: [1, 2, 3],
    created_at: new Date().getTime(),
    updated_at: new Date().getTime(),
  },
  {
    id: 3,
    name: "日服",
    enabled: true,
    dns_group: 2,
    boost_zones: [1, 2, 3],
    created_at: new Date().getTime(),
    updated_at: new Date().getTime(),
  },
];

const ViewPackageAndServerModal = (props: IProps) => {
  const { gameId, closeModal } = props;

  const [showcPackageNameEditModal, setShowcPackageNameEditModal] =
    useState(false);
  const [showcRegionServerEditModal, setShowcRegionServerEditModal] =
    useState(false);
  const [gamePkgs, setGamePkgs] = useState([] as IGamePkg[]);
  const [currentGamePkg, setCurrentGamePkg] = useState({} as IGamePkg);
  const [gameRegions, setGameRegions] = useState([] as IGameRegion[]);
  const [currentGameRegion, setCurrentGameRegion] = useState({} as IGameRegion);
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const [pkgEditMode, setPkgEditMode] = useState(false);
  const [regionEditMode, setRegionEditMode] = useState(false);

  useEffect(() => {
    const getGamePkgsAndGameRegionsListAsync = async () => {
      showLoading();
      try {
        const gamePkgsRes = await getGamePkgsList({ game_id: gameId });
        const gameRegionsRes = await getGameRegionList({ game_id: gameId });
        hideLoading();
        setGamePkgs(gamePkgsRes.pkgs);
        setGameRegions(gameRegionsRes.regions);
      } catch (error) {
        hideLoading();
      }
    };
    getGamePkgsAndGameRegionsListAsync();
  }, []);

  const packageTableColumn: ColumnsType<IGamePkg> = [
    {
      title: "包名",
      dataIndex: "name",
      key: "packageName",
    },
    {
      title: "是否启用",
      dataIndex: "enabled",
      key: "isStart",
      render: (enabled) => <SwitchTag check={enabled} />,
    },
    {
      title: "渠道",
      dataIndex: "channel",
      key: "channel",
    },
    {
      title: "签名",
      dataIndex: "sign",
      key: "signature",
    },
    {
      title: "启动时间",
      dataIndex: "created_at",
      key: "startTime",
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
      dataIndex: "",
      key: "operation",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={(e) => editPackageHandler(e, record.name)}
        >
          编辑
        </Button>
      ),
    },
  ];

  const regionServerTableColumn: ColumnsType<IGameRegion> = [
    {
      title: "区服名",
      dataIndex: "name",
      key: "regionServerName",
    },
    {
      title: "是否启用",
      dataIndex: "enabled",
      key: "isStart",
      render: (enabled) => <SwitchTag check={enabled} />,
    },
    {
      title: "DNS(单选)",
      dataIndex: "dns_group",
      key: "dns",
      render: (dns_group) => <Tag>{dns_group}</Tag>,
    },
    {
      title: "加速路线(可多选)",
      dataIndex: "boost_zones",
      key: "accelerateLine",
      render: (boost_zones) =>
        boost_zones && boost_zones.map((item: string) => <Tag>{item}</Tag>),
    },
    {
      title: "操作",
      dataIndex: "",
      key: "operation",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={(e) => editReginServerHandler(e, record.id)}
        >
          编辑
        </Button>
      ),
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editPackageHandler = (e: any, name: string) => {
    console.log(e);
    console.log(name);
    setPkgEditMode(true);
    setCurrentGamePkg(
      mockPackageData.filter((item) => item.name === name)[0] ??
        ({} as IGamePkg)
    );
    setShowcPackageNameEditModal(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editReginServerHandler = (e: any, key: number) => {
    console.log(e);
    console.log(key);
    setRegionEditMode(true);
    setCurrentGameRegion(
      mockReginServerData.filter((item) => item.id === key)[0] ??
        ({} as IGameRegion)
    );
    setShowcRegionServerEditModal(true);
  };

  const closePackageNameEditModal = () => {
    setShowcPackageNameEditModal(false);
    setCurrentGamePkg({} as IGamePkg);
  };
  const closeRegionServerEditModal = () => {
    setShowcRegionServerEditModal(false);
    setCurrentGameRegion({} as IGameRegion);
  };

  const addNewPackageNameConfig = () => {
    setPkgEditMode(false);
    setShowcPackageNameEditModal(true);
  };

  const addNewRegionServerConfig = () => {
    setRegionEditMode(false);
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
      maskClosable={false}
    >
      <div className={styles.title}>游戏配置/新增&编辑游戏/包名&区服</div>
      <div className={styles.packageTable}>
        <div className={styles.addLine}>
          <div>
            <label>游戏名</label>
            <Input className={styles.leftInput} />
          </div>
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
          packageInfo={currentGamePkg}
          closeModal={closePackageNameEditModal}
          editMode={pkgEditMode}
        />
      )}
      {showcRegionServerEditModal && (
        <GameConfigRegionServerEditModal
          gameName=""
          regionServer={currentGameRegion}
          closeModal={closeRegionServerEditModal}
          editMode={regionEditMode}
        />
      )}
    </Modal>
  );
};

export default ViewPackageAndServerModal;
