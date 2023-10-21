import { Button, Form, Input, Modal } from "antd";
import styles from "./index.module.less";
import { useContext } from "react";

import { LoadingContext } from "../../router/Router";
import { IAclGroup } from "../../types/index";
import { addAclGroup, editAclGroup } from "../../api/groupAcl";

interface IProps {
  aclGroup: IAclGroup;
  closeModal: (needRefresh: boolean) => void;
  editMode: boolean;
}

const aclContentTextAreaPlaceholder = `
请输入具体的 ACL ，每行一条
配置格式如下：

DM ：域名，完整匹配域名
DMK ：域名关键字，域名中存在配置的关键字即可，一般不用
DMS ：域名后缀，后缀匹配
port ：匹配端口号
IP ：按 CIDR 匹配某个 IP 或者某个 IP 段
DEF ：匹配不上时的默认
DL ：走下载节点
HS ：走高速节点
NP ：直连，不走服务器转发
`;

const AclGroupEditModal = (props: IProps) => {
  const { closeModal, aclGroup, editMode } = props;
  const { showLoading, hideLoading } = useContext(LoadingContext);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (fieldsValue: any) => {
    if (editMode) {
      editAclGroupHandler(fieldsValue);
      return;
    }
    addAclGroupHandler(fieldsValue);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addAclGroupHandler = async (fieldsValue: any) => {
    showLoading();
    await addAclGroup(fieldsValue)
      .then(() => closeModal(true))
      .finally(() => hideLoading());
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editAclGroupHandler = async (fieldsValue: any) => {
    showLoading();
    await editAclGroup({ ...fieldsValue, id: aclGroup.id })
      .then(() => closeModal(true))
      .finally(() => hideLoading());
  };

  return (
    <Modal
      centered
      open
      footer={null}
      onCancel={() => closeModal(false)}
      width={800}
      closable
      maskClosable={false}
    >
      <div className={styles.formTitle}>ACL配置/ACL组配置/新增&编辑ACL组</div>
      <div className={styles.formWrapper}>
        <Form
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          wrapperCol={{ flex: 1 }}
          colon={false}
          onFinish={onSubmit}
        >
          <Form.Item label="ACL组名" name="name" initialValue={aclGroup.name}>
            <Input style={{ width: "50%" }} placeholder="请输入ACL组名称" />
          </Form.Item>

          <Form.Item label="备注" name="desc" initialValue={aclGroup.desc}>
            <Input style={{ width: "50%" }} placeholder="请输入ACL组备注" />
          </Form.Item>
          <Form.Item
            label="ACL配置"
            name="content"
            initialValue={aclGroup.content}
          >
            <Input.TextArea
              autoSize={{ minRows: 15 }}
              placeholder={aclContentTextAreaPlaceholder}
            />
          </Form.Item>
          <Form.Item label="">
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};
export default AclGroupEditModal;
