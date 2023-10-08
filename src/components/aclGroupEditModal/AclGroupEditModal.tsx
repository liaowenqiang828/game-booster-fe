import { Button, Form, Input, Modal } from "antd";
import styles from "./index.module.less";
import { useContext, useState } from "react";

import { LoadingContext } from "../../router/Router";
import { IAclGroup } from "../../types";
import { addAclGroup, editAclGroup } from "../../api/groupAcl";

interface IProps {
  aclGroup: IAclGroup;
  closeModal: () => void;
  editMode: boolean;
}
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
      .then(() => closeModal())
      .finally(() => hideLoading());
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editAclGroupHandler = async (fieldsValue: any) => {
    showLoading();
    await editAclGroup(fieldsValue)
      .then(() => closeModal())
      .finally(() => hideLoading());
  };

  return (
    <Modal
      centered
      open
      footer={null}
      onCancel={closeModal}
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
          <Form.Item
            label="ACL组名"
            name="aclGroupName"
            initialValue={aclGroup.name}
          >
            <Input style={{ width: "50%" }} />
          </Form.Item>

          <Form.Item label="备注" name="comment" initialValue={aclGroup.desc}>
            <Input style={{ width: "50%" }} />
          </Form.Item>
          <Form.Item
            label="ACL配置"
            name="aclConfig"
            initialValue={aclGroup.content}
          >
            <Input.TextArea autoSize={{ minRows: 15 }} />
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
