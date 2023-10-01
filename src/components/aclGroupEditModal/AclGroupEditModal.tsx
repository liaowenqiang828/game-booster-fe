import { Button, Form, Input, Modal } from "antd";
import styles from "./index.module.less";
import { IAclGroup } from "../../pages/aclGroupConfig/AclGroupConfig";

interface IProps {
  aclGroup: IAclGroup;
  closeModal: () => void;
  aclConfig: string;
}
const AclGroupEditModal = (props: IProps) => {
  const { closeModal, aclGroup, aclConfig } = props;
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
          style={{ maxWidth: 300 }}
        >
          <Form.Item label="ACL组名" name="aclGroupName">
            <Input defaultValue={aclGroup.aclGroupName} />
          </Form.Item>

          <Form.Item label="备注" name="comment">
            <Input defaultValue={aclGroup.comment} />
          </Form.Item>
          <Form.Item label="ACL配置" name="aclConfig">
            <Input defaultValue={aclConfig} />
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
