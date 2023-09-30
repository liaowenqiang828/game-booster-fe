import { Button, Input } from "antd";
import styles from "./index.module.less";
import Table, { ColumnsType } from "antd/es/table";
import { useState } from "react";
import ClientUpdateEditModal from "../../components/clientUpdateEditModal/ClientUpdateEditModal";

export interface IClientUpdateConfig {
  key: string;
  version: string;
  system: string;
  downloadAddress: string;
  md5: string;
  size: string;
  isForceUpdate: boolean;
  title: string;
  content: string;
  releaseTime: string;
}

const mockDataSource: IClientUpdateConfig[] = [
  {
    key: "1",
    version: "v1.0.1",
    system: "Android",
    downloadAddress: "/upd/android/beta",
    md5: "9482307293859",
    size: "543264853267",
    isForceUpdate: true,
    title: "v0.1.1更新",
    content: "修复了137个bug",
    releaseTime: "2023-09-17 15:00:00",
  },
  {
    key: "2",
    version: "v1.0.1",
    system: "Android",
    downloadAddress: "/upd/android/beta",
    md5: "9482307293859",
    size: "543264853267",
    isForceUpdate: true,
    title: "v1.0.1更新",
    content: "杀死了一个程序员祭天",
    releaseTime: "2023-09-17 15:00:00",
  },
  {
    key: "3",
    version: "v1.0.1",
    system: "Android",
    downloadAddress: "/upd/android/beta",
    md5: "9482307293859",
    size: "543264853267",
    isForceUpdate: false,
    title: "v1.0.1更新",
    content: "裁了一个运营当炮灰",
    releaseTime: "2023-09-17 15:00:00",
  },
];

const ClientUpdateConfig = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentClientUpdateConfig, setCurrentClientUpdateConfig] = useState(
    {} as IClientUpdateConfig
  );
  const columns: ColumnsType<IClientUpdateConfig> = [
    {
      title: "版本号",
      dataIndex: "version",
      key: "version",
    },
    {
      title: "系统",
      dataIndex: "system",
      key: "system",
    },
    {
      title: "MD5",
      dataIndex: "md5",
      key: "md5",
    },
    {
      title: "大小",
      dataIndex: "size",
      key: "updateTime",
    },
    {
      title: "是否强更",
      dataIndex: "isForceUpdate",
      key: "isForceUpdate",
      render: (isForceUpdate: boolean) => (isForceUpdate ? "是" : "否"),
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "内容",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "操作",
      key: "operation",
      render: (_, record) => (
        <Button
          type="primary"
          className={styles.editBtn}
          onClick={(e) => editClientUpdateConfigHandler(e, record.key)}
        >
          编辑
        </Button>
      ),
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editClientUpdateConfigHandler = (e: any, key: string) => {
    console.log(e);
    console.log(key);
    setCurrentClientUpdateConfig(
      mockDataSource.filter((item) => item.key === key)[0] ?? {}
    );
    setShowModal(true);
  };

  const addNewClientUpdateConfigHandler = () => {
    console.log("add new line");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentClientUpdateConfig({} as IClientUpdateConfig);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.text}>客户端升级配置</div>
        <Input.Search placeholder="在此搜索版本号" className={styles.search} />
        <Button
          onClick={addNewClientUpdateConfigHandler}
          type="primary"
          className={styles.addNewBtn}
        >
          新增版本
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={mockDataSource}
        className={styles.table}
      />
      {showModal && (
        <ClientUpdateEditModal
          clientUpdateConfig={currentClientUpdateConfig}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default ClientUpdateConfig;
