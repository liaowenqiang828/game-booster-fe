import { useState } from "react";
import { Button, Input, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import styles from "./index.module.less";
import AclGroupEditModal from "../../components/aclGroupEditModal/AclGroupEditModal";

export interface IAclGroup {
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

  const [currentAclGroup, setCurrentAclGroup] = useState({} as IAclGroup);
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
          onClick={(e) => editAclGroup(e, record.key)}
          type="primary"
        >
          编辑
        </Button>
      ),
    },
  ];

  const addNewAclGroup = () => {
    setShowAclGroupEditModal(true);
  };

  const closeModal = () => {
    setCurrentAclGroup({} as IAclGroup);
    setShowAclGroupEditModal(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editAclGroup = (e: any, key: string) => {
    console.log(e, key);
    setCurrentAclGroup(
      mockAclGroupData.filter((Item) => Item.key === key)[0] ??
        ({} as IAclGroup)
    );
    setShowAclGroupEditModal(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <div>面包屑</div>
        <div className={styles.titleSection}>
          <div className={styles.title}>ACL 组配置</div>
          <div className={styles.descSection}>
            <div>通用的ACL组，用来简化配置，如Google Facebook等通用组</div>
            <Input.Search
              placeholder="在此搜索ACL组名"
              style={{ width: "200px" }}
            />
            <Button type="primary" onClick={addNewAclGroup}>
              新增ACL组
            </Button>
          </div>
        </div>
      </div>
      <Table dataSource={mockAclGroupData} columns={columns} />

      {showAclGroupEditModal && (
        <AclGroupEditModal
          closeModal={closeModal}
          aclConfig=""
          aclGroup={currentAclGroup}
        />
      )}
    </div>
  );
};

export default AclGroupConfig;
