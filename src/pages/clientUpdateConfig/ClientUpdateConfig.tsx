import { Button, Input } from "antd";
import styles from "./index.module.less";
import Table, { ColumnsType } from "antd/es/table";
import { useState } from "react";
import ClientUpdateEditModal from "../../components/clientUpdateEditModal/ClientUpdateEditModal";
import { IClientUpdate } from "../../types";

const mockDataSource: IClientUpdate[] = [
  {
    id: 1,
    ver: "v1.0.1",
    os: 0,
    url: "/upd/android/beta",
    md5: "9482307293859",
    size: 5432648,
    must_upd: true,
    title: "v0.1.1更新",
    change_log: "修复了137个bug",
    release_date: new Date().getTime(),
  },
  {
    id: 2,
    ver: "v1.0.1",
    os: 1,
    url: "/upd/android/beta",
    md5: "9482307293859",
    size: 5432648,
    must_upd: true,
    title: "v1.0.1更新",
    change_log: "杀死了一个程序员祭天",
    release_date: new Date().getTime(),
  },
  {
    id: 3,
    ver: "v1.0.1",
    os: 2,
    url: "/upd/android/beta",
    md5: "9482307293859",
    size: 5432648,
    must_upd: false,
    title: "v1.0.1更新",
    change_log: "裁了一个运营当炮灰",
    release_date: new Date().getTime(),
  },
];

const ClientUpdateConfig = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentClientUpdateConfig, setCurrentClientUpdateConfig] = useState(
    {} as IClientUpdate
  );
  const columns: ColumnsType<IClientUpdate> = [
    {
      title: "版本号",
      dataIndex: "ver",
      key: "version",
    },
    {
      title: "系统",
      dataIndex: "os",
      key: "system",
    },
    {
      title: "下载地址",
      dataIndex: "url",
      key: "url",
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
      dataIndex: "must_upd",
      key: "isForceUpdate",
      render: (must_upd: boolean) => (must_upd ? "是" : "否"),
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "内容",
      dataIndex: "change_log",
      key: "content",
    },
    {
      title: "上线时间",
      dataIndex: "release_date",
      key: "release_date",
    },
    {
      title: "操作",
      key: "operation",
      render: (_, record) => (
        <Button
          type="primary"
          className={styles.editBtn}
          onClick={(e) => editClientUpdateConfigHandler(e, record.id)}
        >
          编辑
        </Button>
      ),
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editClientUpdateConfigHandler = (e: any, key: number) => {
    console.log(e);
    console.log(key);
    setCurrentClientUpdateConfig(
      mockDataSource.filter((item) => item.id === key)[0] ?? {}
    );
    setShowModal(true);
  };

  const addNewClientUpdateConfigHandler = () => {
    console.log("add new line");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentClientUpdateConfig({} as IClientUpdate);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.text}>客户端升级配置</div>
        <div className={styles.operator}>
          <Input.Search
            placeholder="在此搜索版本号"
            className={styles.search}
          />
          <Button
            onClick={addNewClientUpdateConfigHandler}
            type="primary"
            className={styles.addNewBtn}
          >
            新增版本
          </Button>
        </div>
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
