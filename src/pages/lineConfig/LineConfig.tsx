import { Button, Input, Table, Tag } from "antd";
import styles from "./index.module.less";
import SwitchTag from "../../components/switchTag/SwitchTag";
import { ColumnsType } from "antd/es/table";
import LineConfigEditModal from "../../components/lineConfigEditModal/LineConfigEditModal";
import { useContext, useEffect, useState } from "react";
import { IBoostZone } from "../../types";
import { convertTimestampToStr } from "../../utils/dataTime";
import { getListBoostZones, searchBoostZones } from "../../api/boostZones";
import { LoadingContext } from "../../router/Router";

export type IBoostZoneModel = Omit<IBoostZone, "desc" | "nodes">;

const mockDataSource: IBoostZone[] = [
  {
    id: 1,
    name: "上海日本一区",
    enabled: true,
    country: "中国",
    region: "上海",
    inbound_country_code: "CN",
    outbound_country_code: "JP",
    ping_addr: "101.202.55.44:10000",
    created_at: new Date().getTime(),
    updated_at: new Date().getTime(),
    desc: "desc for boost zone",
    nodes: ["1.1.1.1", "2.2.2.2"],
  },
  {
    id: 2,
    name: "广州日本一区",
    enabled: false,
    country: "中国",
    region: "广州",
    inbound_country_code: "CN",
    outbound_country_code: "JP",
    ping_addr: "101.202.55.44:10000",
    created_at: new Date().getTime(),
    updated_at: new Date().getTime(),
    desc: "desc for boost zone",
    nodes: ["1.1.1.1", "2.2.2.2"],
  },
  {
    id: 3,
    name: "香港日本一区",
    enabled: true,
    country: "香港",
    region: "九龙",
    inbound_country_code: "HK",
    outbound_country_code: "JP",
    ping_addr: "101.202.55.44:10000",
    created_at: new Date().getTime(),
    updated_at: new Date().getTime(),
    desc: "desc for boost zone",
    nodes: ["1.1.1.1", "2.2.2.2"],
  },
];
const LineConfig = () => {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [boostZones, setBoostZones] = useState([] as IBoostZone[]);
  const [currentLineConfig, setCurrentLineConfig] = useState({} as IBoostZone);
  const columns: ColumnsType<IBoostZoneModel> = [
    {
      title: "线路名",
      dataIndex: "name",
      key: "lineName",
    },
    {
      title: "是否启用",
      dataIndex: "enabled",
      key: "isStart",
      render: (enabled: boolean) => <SwitchTag check={enabled} />,
    },
    {
      title: "国家",
      dataIndex: "country",
      key: "country",
      render: (country: string) =>
        country && <Tag color="black">{country}</Tag>,
    },
    {
      title: "地区",
      dataIndex: "region",
      key: "region",
      render: (region: string) => region && <Tag color="black">{region}</Tag>,
    },
    {
      title: "入口",
      dataIndex: "inbound_country_code",
      key: "entry",
      render: (inbound_country_code: string) =>
        inbound_country_code && <Tag color="black">{inbound_country_code}</Tag>,
    },
    {
      title: "出口",
      dataIndex: "outbound_country_code",
      key: "exit",
      render: (outbound_country_code: string) =>
        outbound_country_code && (
          <Tag color="black">{outbound_country_code}</Tag>
        ),
    },
    {
      title: "测速地址",
      dataIndex: "ping_addr",
      key: "speedTestAddress",
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
      dataIndex: "operation",
      key: "operation",
      render: (_, record) => (
        <Button
          type="primary"
          className={styles.editBtn}
          onClick={(e) => editLineConfigItemHandler(e, record.id)}
        >
          编辑
        </Button>
      ),
    },
  ];

  const { showLoading, hideLoading } = useContext(LoadingContext);
  useEffect(() => {
    const getListBoostZonesAsync = async () => {
      showLoading();
      const res = await getListBoostZones({
        start_id: 0,
        cnt: 10,
      }).finally(() => hideLoading());
      setBoostZones(res.zones);
    };

    getListBoostZonesAsync();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editLineConfigItemHandler = (e: any, key: number) => {
    console.log(e);
    console.log(key);
    setCurrentLineConfig(
      mockDataSource.filter((item) => item.id === key)[0] ?? ({} as IBoostZone)
    );
    setEditMode(true);
    setShowModal(true);
  };

  const addNewLineHandler = () => {
    console.log("add new line");
    setEditMode(false);
    setShowModal(true);
  };

  const closeModal = () => {
    setCurrentLineConfig({} as IBoostZone);
    setShowModal(false);
  };

  const onSearchBoostZones = async (value: string) => {
    showLoading();
    await searchBoostZones({ id: 0, name: value })
      .then((res) => {
        setBoostZones(res.zones);
        closeModal();
      })
      .finally(() => hideLoading());
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.text}>线路配置</div>
        <div className={styles.operator}>
          <Input.Search
            placeholder="在此搜索线路名"
            className={styles.search}
            onSearch={onSearchBoostZones}
          />
          <Button
            onClick={addNewLineHandler}
            type="primary"
            className={styles.addNewBtn}
          >
            新增线路
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={mockDataSource}
        className={styles.table}
      />
      {showModal && (
        <LineConfigEditModal
          lineConfig={currentLineConfig}
          closeModal={closeModal}
          editMode={editMode}
        />
      )}
    </div>
  );
};

export default LineConfig;
