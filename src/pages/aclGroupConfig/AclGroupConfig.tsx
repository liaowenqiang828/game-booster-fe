import { useState } from "react";
import { Button, Input, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import styles from "./index.module.less";
import AclGroupEditModal from "../../components/aclGroupEditModal/AclGroupEditModal";
import { IAclGroup } from "../../types";
import { convertTimestampToStr } from "../../utils/dataTime";

const mockAclGroupData: IAclGroup[] = [
  {
    id: 1,
    name: "Google组",
    desc: "主要包含Google常用登录、API等域名",
    created_at: new Date().getTime(),
    updated_at: new Date().getTime(),
    content: "content value",
  },
  {
    id: 2,
    name: "Facebook组",
    desc: "主要包含Google常用登录、API等域名",
    created_at: new Date().getTime(),
    updated_at: new Date().getTime(),
    content: "content value",
  },
  {
    id: 3,
    name: "Google组",
    desc: "主要包含Google常用登录、API等域名",
    created_at: new Date().getTime(),
    updated_at: new Date().getTime(),
    content: "content value",
  },
];
const AclGroupConfig = () => {
  const [showAclGroupEditModal, setShowAclGroupEditModal] = useState(false);

  const [currentAclGroup, setCurrentAclGroup] = useState({} as IAclGroup);
  const columns: ColumnsType<Omit<IAclGroup, "content">> = [
    {
      title: "ACL组名",
      dataIndex: "name",
      key: "aclGroupName",
    },
    {
      title: "备注",
      dataIndex: "desc",
      key: "comment",
    },
    {
      title: "添加时间",
      dataIndex: "created_at",
      key: "addTime",
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
      dataIndex: "",
      key: "operation",
      render: (_, record) => (
        <Button
          className={styles.editBtn}
          onClick={(e) => editAclGroup(e, record.id)}
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
  const editAclGroup = (e: any, key: number) => {
    console.log(e, key);
    setCurrentAclGroup(
      mockAclGroupData.filter((Item) => Item.id === key)[0] ?? ({} as IAclGroup)
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
        <AclGroupEditModal closeModal={closeModal} aclGroup={currentAclGroup} />
      )}
    </div>
  );
};

export default AclGroupConfig;
