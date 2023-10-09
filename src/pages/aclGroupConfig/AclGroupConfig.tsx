import { useContext, useEffect, useState } from "react";
import { Breadcrumb, Button, Input, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import styles from "./index.module.less";
import AclGroupEditModal from "../../components/aclGroupEditModal/AclGroupEditModal";
import { IAclGroup } from "../../types";
import { convertTimestampToStr } from "../../utils/dataTime";
import { getAclGroupList } from "../../api/groupAcl";
import { LoadingContext } from "../../router/Router";

const AclGroupConfig = () => {
  const [showAclGroupEditModal, setShowAclGroupEditModal] = useState(false);
  const [aclGroups, setAclGroups] = useState([] as IAclGroup[]);
  const [currentAclGroup, setCurrentAclGroup] = useState({} as IAclGroup);
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const [editMode, setEditMode] = useState(false);
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

  const getAclGroupsAsync = async () => {
    showLoading();
    const res = await getAclGroupList().finally(() => hideLoading());
    setAclGroups(res.groups);
  };

  useEffect(() => {
    getAclGroupsAsync();
  }, []);

  const addNewAclGroup = () => {
    setEditMode(false);
    setShowAclGroupEditModal(true);
  };

  const closeModal = () => {
    setCurrentAclGroup({} as IAclGroup);
    setShowAclGroupEditModal(false);
    getAclGroupsAsync();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editAclGroup = (e: any, key: number) => {
    console.log(e, key);
    setEditMode(true);
    setCurrentAclGroup(
      aclGroups.filter((Item) => Item.id === key)[0] ?? ({} as IAclGroup)
    );
    setShowAclGroupEditModal(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <Breadcrumb
          items={[
            {
              title: "ACL配置",
            },
            {
              title: "ACL组配置",
            },
          ]}
        />
        <div className={styles.titleSection}>
          <div className={styles.title}>ACL 组配置</div>
          <div className={styles.descSection}>
            <div>通用的ACL组，用来简化配置，如Google Facebook等通用组</div>
            <div className={styles.operator}>
              <Button
                className={styles.addBtn}
                type="primary"
                onClick={addNewAclGroup}
              >
                新增ACL组
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Table rowKey="id" dataSource={aclGroups} columns={columns} />

      {showAclGroupEditModal && (
        <AclGroupEditModal
          editMode={editMode}
          closeModal={closeModal}
          aclGroup={currentAclGroup}
        />
      )}
    </div>
  );
};

export default AclGroupConfig;
