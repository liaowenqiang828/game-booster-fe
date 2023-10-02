import { Button, Form, Input, Modal } from "antd";
import styles from "./index.module.less";
import { IAclGroup } from "../../pages/aclGroupConfig/AclGroupConfig";
import { useContext, useState } from "react";

import { LoadingContext } from "../../router/Router";

interface IProps {
  aclGroup: IAclGroup;
  closeModal: () => void;
  aclConfig: string;
}
const AclGroupEditModal = (props: IProps) => {
  const { closeModal, aclGroup, aclConfig } = props;
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const [currentAclConfig, setCurrentAclConfig] = useState(aclConfig);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (fieldsValue: any) => {
    const submitObj = {
      ...fieldsValue,
      aclConfig: currentAclConfig,
    };
    console.log(submitObj);
    showLoading();
    setTimeout(() => {
      hideLoading();
      closeModal();
    }, 2000);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onAclConfigChange = (e: any) => {
    setCurrentAclConfig(e.target.value);
  };
  return (
    <Modal
      centered
      open
      footer={null}
      onCancel={closeModal}
      width={800}
      closable
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
            initialValue={aclGroup.aclGroupName}
          >
            <Input style={{ width: "50%" }} />
          </Form.Item>

          <Form.Item
            label="备注"
            name="comment"
            initialValue={aclGroup.comment}
          >
            <Input style={{ width: "50%" }} />
          </Form.Item>
          <Form.Item label="ACL配置" name="aclConfig">
            <Input.TextArea
              autoSize={{ minRows: 15 }}
              onChange={onAclConfigChange}
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
