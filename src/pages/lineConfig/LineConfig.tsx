import { useContext, useEffect, useState } from "react";
import { Button, Input, Table, Tag } from "antd";
import SwitchTag from "../../components/switchTag/SwitchTag";
import LineConfigEditModal from "../../components/lineConfigEditModal/LineConfigEditModal";
import { IBoostZone } from "../../types/index";
import { convertTimestampToStr } from "../../utils/dataTime";
import { getListBoostZones, searchBoostZones } from "../../api/boostZones";
import { LoadingContext } from "../../router/Router";
import type { ColumnsType } from "antd/es/table";
import styles from "./index.module.less";
import { getBoostNodesList } from "../../api/boostNode";

export type IBoostZoneModel = Omit<IBoostZone, "desc" | "nodes">;

const LineConfig = () => {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [boostZones, setBoostZones] = useState([] as IBoostZone[]);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [currentLineConfig, setCurrentLineConfig] = useState({} as IBoostZone);
  const [boostNodes, setBoostNodes] = useState<string[]>([]);

  const columns: ColumnsType<IBoostZoneModel> = [
    {
      title: "线路名",
      dataIndex: "name",
      key: "lineName",
    },
    {
      title: "是否启用",
      dataIndex: "enabled",
      key: "enabled",
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
      dataIndex: "operation",
      key: "operation",
      render: (_, record) => (
        <Button
          type="primary"
          className={styles.editBtn}
          onClick={() => editLineConfigItemHandler(record.id)}
        >
          编辑
        </Button>
      ),
    },
  ];

  const { showLoading, hideLoading } = useContext(LoadingContext);

  const loadingBoostZonesByPageNumberAndPageSize = async (
    pageSize: number,
    pageNumber?: number
  ) => {
    showLoading();
    await getListBoostZones({
      offset:
        pageNumber && pageNumber > 1 ? (pageNumber - 1) * pageSize + 1 : 0,
      cnt: pageSize,
    })
      .then((res) => {
        setBoostZones(res.zones);
        setTotal(res.total);
      })
      .finally(() => hideLoading());

    getBoostNodesList({ offset: 0, cnt: 100 }).then((res) => {
      setBoostNodes(res.nodes.map((node) => node.public_addr));
    });
  };

  useEffect(() => {
    loadingBoostZonesByPageNumberAndPageSize(pageSize);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editLineConfigItemHandler = (key: number) => {
    setCurrentLineConfig(
      boostZones.filter((item) => item.id === key)[0] ?? ({} as IBoostZone)
    );
    setEditMode(true);
    setShowModal(true);
  };

  const addNewLineHandler = () => {
    console.log("add new line");
    setEditMode(false);
    setShowModal(true);
  };

  const closeModal = (needRefresh: boolean) => {
    setCurrentLineConfig({} as IBoostZone);
    setShowModal(false);
    needRefresh &&
      loadingBoostZonesByPageNumberAndPageSize(pageSize, currentPage);
  };

  const onSearchBoostZones = (value: string) => {
    showLoading();
    if (value === "") {
      setShowSearchResult(false);
      loadingBoostZonesByPageNumberAndPageSize(pageSize, currentPage);
      return;
    }
    // todo id=0, 按照名称搜索
    searchBoostZones({ id: 0, name: value })
      .then((res) => {
        setBoostZones(res.zones);
        setShowSearchResult(true);
      })
      .finally(() => hideLoading());
  };

  const onPageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    console.log("page", page);

    loadingBoostZonesByPageNumberAndPageSize(pageSize, page);
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
            allowClear
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
        dataSource={boostZones}
        className={styles.table}
        rowKey="id"
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
      {showModal && (
        <LineConfigEditModal
          lineConfig={currentLineConfig}
          closeModal={closeModal}
          editMode={editMode}
          boostNodes={boostNodes}
        />
      )}
    </div>
  );
};

export default LineConfig;
