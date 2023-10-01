import { useState } from "react";
import { Button, Input, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import styles from "./index.module.less";

interface IAclGroup {
  key: string;
  aclGroupName: string;
  comment: string;
  addTime: string;
  updateTime: string;
}

const mockAclGroupData: IAclGroup[] = [
  {
    key: "1",
    aclGroupName: "Google组",
    comment: "主要包含Google常用登录、API等域名",
    addTime: "2023-06-02 10:00:00",
    updateTime: "2023-06-02 10:00:00",
  },
  {
    key: "2",
    aclGroupName: "Facebook组",
    comment: "主要包含Google常用登录、API等域名",
    addTime: "2023-06-02 10:00:00",
    updateTime: "2023-06-02 10:00:00",
  },
  {
    key: "3",
    aclGroupName: "Google组",
    comment: "主要包含Google常用登录、API等域名",
    addTime: "2023-06-02 10:00:00",
    updateTime: "2023-06-02 10:00:00",
  },
];
const AclGroupConfig = () => {
  const [showAclGroupEditModal, setShowAclGroupEditModal] = useState(false);

  const columns: ColumnsType<IAclGroup> = [
    {
      title: "ACL组名",
      dataIndex: "aclGroupName",
      key: "aclGroupName",
    },
    {
      title: "备注",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "添加时间",
      dataIndex: "addTime",
      key: "addTime",
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      key: "updateTime",
    },
    {
      title: "操作",
      dataIndex: "",
      key: "operation",
      render: (_, record) => (
        <Button
          className={styles.editBtn}
          onClick={() => editAclGroup(e, record.key)}
          type="primary"
        >
          编辑
        </Button>
      ),
    },
  ];

  const addNewAclGroup = () => {};

  const closeModal = () => {
    setShowAclGroupEditModal(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editAclGroup = (e: any, key: string) => {
    console.log(e, key);

    setShowAclGroupEditModal(true);
  };

  return (
    <div>
      <div>面包屑</div>
      <div className={styles.titleSection}>
        <div className={styles.title}>ACL 组配置</div>
        <div className={styles.desc}>
          <div>通用的ACL组，用来简化配置，如Google Facebook等通用组</div>
          <Input.Search placeholder="在此搜索ACL组名" />
          <Button type="primary" onClick={addNewAclGroup}>
            新增ACL组
          </Button>
          ``
        </div>
      </div>
      <Table dataSource={mockAclGroupData} columns={columns} />

      {/* {showAclGroupEditModal && <AclGroupEditModal closeModal={closeModal} />} */}
    </div>
  );
};

export default AclGroupConfig;
