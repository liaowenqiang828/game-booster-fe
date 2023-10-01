import { Button, Form, Input, Modal, Switch } from "antd";
import styles from "./index.module.less";

export interface IGameAccelerateConfig {
  gameName: string;
  acceratePackageName: string;
  system: string;
  applyAclGroup: string[];
  content: string;
}
interface IProps {
  gameAccerateConfig: IGameAccelerateConfig;
  closeModal: () => void;
}
const GameAccelerateConfigEditModal = (props: IProps) => {
  const { closeModal, gameAccerateConfig } = props;
  return (
    <Modal
      centered
      open
      footer={null}
      onCancel={closeModal}
      width={800}
      closable
    >
      <div className={styles.formTitle}>DNS配置/新增&编辑DNS配置</div>
      <div className={styles.formWrapper}>
        <Form
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ maxWidth: 300 }}
        >
          <Form.Item label="游戏名" name="gameName" className={styles.formItem}>
            <Input defaultValue={gameAccerateConfig.gameName} />
          </Form.Item>

          <Form.Item label="加速包名" name="acceratePackageName">
            <Input />
          </Form.Item>
          <Form.Item label="" name="system">
            <Switch />
          </Form.Item>
          <Form.Item label="调用ACL组(可多选)" name="applyAclGroup">
            <Input defaultValue={gameAccerateConfig.applyAclGroup} />
          </Form.Item>
          <Form.Item label="内容" name="content">
            <Input defaultValue={gameAccerateConfig.content} />
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
export default GameAccelerateConfigEditModal;
