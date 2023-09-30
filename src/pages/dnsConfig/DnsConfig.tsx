import { Button, Input } from "antd";
import styles from "./index.module.less";
import Table, { ColumnsType } from "antd/es/table";
import DnsEditModal from "../../components/dnsEditModal/DnsEditModal";
import { useState } from "react";

export interface IDnsConfig {
  key: string;
  dnsName: string;
  createTime: string;
  updateTime: string;
}

const mockDataSource: IDnsConfig[] = [
  {
    key: "1",
    dnsName: "114",
    createTime: "2023-09-16 16:00:00",
    updateTime: "2023-09-17 15:00:00",
  },
  {
    key: "2",
    dnsName: "google",
    createTime: "2023-09-16 16:00:00",
    updateTime: "2023-09-17 15:00:00",
  },
  {
    key: "3",
    dnsName: "baidu",
    createTime: "2023-09-16 16:00:00",
    updateTime: "2023-09-17 15:00:00",
  },
];

const DnsConfig = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentDnsConfig, setCurrentNodeConfig] = useState({} as IDnsConfig);
  const columns: ColumnsType<IDnsConfig> = [
    {
      title: "DNS名称",
      dataIndex: "dnsName",
      key: "dnsName",
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
      render: (_, record) => (
        <Button
          type="primary"
          className={styles.editBtn}
          onClick={(e) => editDnsConfigItemHandler(e, record.key)}
        >
          编辑
        </Button>
      ),
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editDnsConfigItemHandler = (e: any, key: string) => {
    console.log(e);
    console.log(key);
    setShowModal(true);
    setCurrentNodeConfig(
      mockDataSource.filter((item) => item.key === key)[0] ?? {}
    );
  };

  const addNewDnsHandler = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentNodeConfig({} as IDnsConfig);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.text}>线路配置</div>
        <Input.Search placeholder="在此搜索DNS名称" className={styles.search} />
        <Button
          onClick={addNewDnsHandler}
          type="primary"
          className={styles.addNewBtn}
        >
          新增DNS
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={mockDataSource}
        className={styles.table}
      />

      {showModal && (
        <DnsEditModal dnsConfig={currentDnsConfig} closeModal={closeModal} />
      )}
    </div>
  );
};

export default DnsConfig;
