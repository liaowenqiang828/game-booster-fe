import { Button, Input, Table, Tag } from "antd";
import styles from "./index.module.less";
import type { ColumnsType } from "antd/es/table";
import SwitchTag from "../../components/switchTag/SwitchTag";
import { useContext, useEffect, useState } from "react";
import NodeConfigEditModal from "../../components/nodeConfigEditModal/NodeConfigEditModal";
import { IBoostNode } from "../../types";
import { convertTimestampToStr } from "../../utils/dataTime";
import { getBoostNodesList, searchBoostNodes } from "../../api/boostNode";
import { LoadingContext } from "../../router/Router";
import AccelerateModes from "../../components/accelerateModes/AccelerateModes";

export type IBoostNodeModel = Omit<
  IBoostNode,
  "cur_in_bandwidth" | "cur_out_bandwidth" | "created_at"
>;

const NodeConfig = () => {
  const [openModal, setOpenModal] = useState(false);
  const [boostNodes, setBoostNodes] = useState([] as IBoostNode[]);
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const pageSize = 10;
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
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
      render: (modes: number) => <AccelerateModes modes={modes} />,
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

  const loadingBoostNodesByPageNumberAndPageSize = async (
    pageSize: number,
    pageNumber?: number
  ) => {
    showLoading();
    await getBoostNodesList({
      offset: pageNumber ? (pageNumber - 1) * pageSize + 1 : 0,
      cnt: pageSize,
    })
      .then((res) => {
        setBoostNodes(res.nodes);
        setTotal(res.total);
      })
      .finally(() => hideLoading());
  };

  useEffect(() => {
    loadingBoostNodesByPageNumberAndPageSize(pageSize);
  }, []);

  const closeModal = (needRefresh: boolean) => {
    setOpenModal(false);
    needRefresh &&
      loadingBoostNodesByPageNumberAndPageSize(pageSize, currentPage);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editNodeConfigItemHandler = (e: any, key: number) => {
    setCurrentNodeConfig(
      boostNodes.filter((item) => item.id === key)[0] ?? ({} as IBoostNodeModel)
    );
    setOpenModal(true);
  };

  const onSearchBoostNodes = async (value: string) => {
    // type 0 匹配节点地址，1 匹配节点名称
    if (value === "") {
      setShowSearchResult(false);
      loadingBoostNodesByPageNumberAndPageSize(pageSize, currentPage);
    } else {
      const res = await searchBoostNodes({ type: 0, val: value });
      // search error handler
      setBoostNodes(res.nodes);
      setShowSearchResult(true);
    }
  };

  const onPageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    loadingBoostNodesByPageNumberAndPageSize(pageSize, page);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.text}>节点配置</div>
        <Input.Search
          placeholder="在此搜索节点地址"
          className={styles.search}
          onSearch={onSearchBoostNodes}
          allowClear
        />
      </div>
      <Table
        columns={columns}
        rowKey="id"
        dataSource={boostNodes}
        className={styles.table}
        pagination={
          showSearchResult
            ? false
            : {
                total: total,
                pageSize: pageSize,
                onChange: onPageChange,
                current: currentPage,
              }
        }
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
