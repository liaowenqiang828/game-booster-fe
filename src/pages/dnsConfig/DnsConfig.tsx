import { Button, Input } from "antd";
import styles from "./index.module.less";
import Table, { ColumnsType } from "antd/es/table";
import DnsEditModal from "../../components/dnsEditModal/DnsEditModal";
import { useContext, useEffect, useState } from "react";
import { IDnsGroup } from "../../types/index";
import { convertTimestampToStr } from "../../utils/dataTime";
import { LoadingContext } from "../../router/Router";
import { getDnsList } from "../../api/dns";

const DnsConfig = () => {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentDnsConfig, setCurrentNodeConfig] = useState({} as IDnsGroup);
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const [dnsGroup, setDnsGroup] = useState([] as IDnsGroup[]);

  const getDnsListAsync = async () => {
    showLoading();
    const res = await getDnsList().finally(() => hideLoading());
    setDnsGroup(res.groups);
  };

  useEffect(() => {
    getDnsListAsync();
  }, []);
  const columns: ColumnsType<Omit<IDnsGroup, "dns">> = [
    {
      title: "DNS名称",
      dataIndex: "name",
      key: "dnsName",
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
      render: (_, record) => (
        <Button
          type="primary"
          className={styles.editBtn}
          onClick={(e) => editDnsConfigItemHandler(e, record.id)}
        >
          编辑
        </Button>
      ),
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editDnsConfigItemHandler = (e: any, key: number) => {
    setEditMode(true);
    setShowModal(true);
    setCurrentNodeConfig(dnsGroup.filter((item) => item.id === key)[0] ?? {});
  };

  const addNewDnsHandler = () => {
    setEditMode(false);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentNodeConfig({} as IDnsGroup);
    getDnsListAsync();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.text}>线路配置</div>
        <div className={styles.operator}>
          {/* <Input.Search
            placeholder="在此搜索DNS名称"
            className={styles.search}
          /> */}
          <Button
            onClick={addNewDnsHandler}
            type="primary"
            className={styles.addNewBtn}
          >
            新增DNS
          </Button>
        </div>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={dnsGroup}
        className={styles.table}
      />

      {showModal && (
        <DnsEditModal
          dnsConfig={currentDnsConfig}
          closeModal={closeModal}
          editMode={editMode}
        />
      )}
    </div>
  );
};

export default DnsConfig;
