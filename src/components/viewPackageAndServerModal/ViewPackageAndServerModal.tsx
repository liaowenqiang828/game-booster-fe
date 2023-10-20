import { Button, Input, Modal, Popconfirm, Table, Tag } from "antd";
import styles from "./index.module.less";
import type { ColumnsType } from "antd/es/table";
import SwitchTag from "../switchTag/SwitchTag";
import GameConfigPackageNameEditModal from "../gameConfigPackageNameEditModal/GameConfigPackageNameEditModal";
import { useContext, useEffect, useState } from "react";
import GameConfigRegionServerEditModal from "../gameConfigRegionServerEditModal/GameConfigRegionServerEditModal";
import {
  IBoostZone,
  IDnsGroup,
  IGamePkg,
  IGameRegion,
} from "../../types/index";
import { delGamePkg, getGamePkgsList, getGameRegionList } from "../../api/game";
import { LoadingContext } from "../../router/Router";
import { convertTimestampToStr } from "../../utils/dataTime";

interface IProps {
  gameId: number;
  closeModal: () => void;
  gameName: string;
  dnsGroup: IDnsGroup[];
  boostZones: IBoostZone[];
}

const ViewPackageAndServerModal = (props: IProps) => {
  const { gameId, closeModal, gameName, dnsGroup, boostZones } = props;
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
      render: (enabled: boolean) => <SwitchTag check={enabled} />,
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
      dataIndex: "",
      key: "operation",
      render: (_: any, record: IGamePkg) => (
        <>
          <Button
            type="primary"
            onClick={(e: any) => editPackageHandler(e, record.name)}
          >
            编辑
          </Button>
          <Popconfirm
            title={null}
            description="确定要删除当前包吗?"
            onConfirm={(e) => confirmDeleteGamePkg(e, record.name)}
            okText="确认"
            cancelText="取消"
          >
            <Button type="primary">删除</Button>
          </Popconfirm>
        </>
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
      render: (enabled: boolean) => <SwitchTag check={enabled} />,
    },
    {
      title: "DNS(单选)",
      dataIndex: "dns_group",
      key: "dns",
      render: (dns_group: number) =>
        dnsGroup
          .find((dns) => dns.id === dns_group)
          ?.dns.map((item) => <Tag>{item}</Tag>),
    },
    {
      title: "加速路线(可多选)",
      dataIndex: "boost_zones",
      key: "accelerateLine",
      render: (boost_zones: number[]) =>
        boost_zones &&
        boostZones
          .filter((zone) => boost_zones.includes(zone.id))
          .map((item: IBoostZone) => <Tag>{item.name}</Tag>),
    },
    {
      title: "操作",
      dataIndex: "",
      key: "operation",
      render: (_: any, record: IGameRegion) => (
        <>
          <Button
            type="primary"
            onClick={(e: any) => editReginServerHandler(e, record.id)}
          >
            编辑
          </Button>
        </>
      ),
    },
  ];

  const confirmDeleteGamePkg = async (
    e: React.MouseEvent<HTMLElement>,
    name: string
  ) => {
    showLoading();
    try {
      await delGamePkg({ name });
    } catch (error) {
      return;
    } finally {
      hideLoading();
    }
    const gamePkgsRes = await getGamePkgsList({ game_id: gameId });
    setGamePkgs(gamePkgsRes.pkgs);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editPackageHandler = (e: any, name: string) => {
    console.log(e);
    console.log(name);
    setPkgEditMode(true);
    setCurrentGamePkg(
      gamePkgs.filter((item) => item.name === name)[0] ?? ({} as IGamePkg)
    );
    setShowcPackageNameEditModal(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editReginServerHandler = (e: any, key: number) => {
    console.log(e);
    console.log(key);
    setRegionEditMode(true);
    setCurrentGameRegion(
      gameRegions.filter((item) => item.id === key)[0] ?? ({} as IGameRegion)
    );
    setShowcRegionServerEditModal(true);
  };

  const closePackageNameEditModal = async (needRefresh: boolean) => {
    setShowcPackageNameEditModal(false);
    setCurrentGamePkg({} as IGamePkg);
    if (needRefresh) {
      showLoading();
      const gamePkgsRes = await getGamePkgsList({ game_id: gameId }).finally(
        () => hideLoading()
      );
      setGamePkgs(gamePkgsRes.pkgs);
      hideLoading();
    }
  };
  const closeRegionServerEditModal = async (needRefresh: boolean) => {
    setShowcRegionServerEditModal(false);
    setCurrentGameRegion({} as IGameRegion);
    if (needRefresh) {
      showLoading();
      const gameRegionRes = await getGameRegionList({
        game_id: gameId,
      }).finally(() => hideLoading());
      setGameRegions(gameRegionRes.regions);
      hideLoading();
    }
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
            <Input className={styles.leftInput} value={gameName} />
          </div>
          <Button type="primary" onClick={addNewPackageNameConfig}>
            新增
          </Button>
        </div>
        <Table
          dataSource={gamePkgs}
          columns={packageTableColumn}
          rowKey="name"
          pagination={false}
        />
      </div>
      <div className={styles.serverTable}>
        <div className={styles.addBtn}>
          <Button type="primary" onClick={addNewRegionServerConfig}>
            新增
          </Button>
        </div>

        <Table
          dataSource={gameRegions}
          columns={regionServerTableColumn}
          rowKey="id"
          pagination={false}
        />
      </div>

      {showcPackageNameEditModal && (
        <GameConfigPackageNameEditModal
          gameName={gameName}
          packageInfo={currentGamePkg}
          closeModal={closePackageNameEditModal}
          editMode={pkgEditMode}
          gameId={gameId}
        />
      )}
      {showcRegionServerEditModal && (
        <GameConfigRegionServerEditModal
          gameName={gameName}
          regionServer={currentGameRegion}
          closeModal={closeRegionServerEditModal}
          editMode={regionEditMode}
          gameId={gameId}
          dnsGroup={dnsGroup}
          boostZones={boostZones}
        />
      )}
    </Modal>
  );
};

export default ViewPackageAndServerModal;
