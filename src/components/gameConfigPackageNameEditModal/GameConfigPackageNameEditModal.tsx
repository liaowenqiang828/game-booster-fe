import { Button, Form, Input, Modal, Switch } from "antd";
import styles from "./index.module.less";
import { IPackageInfo } from "../viewPackageAndServerModal/ViewPackageAndServerModal";

interface IProps {
  packageInfo: IPackageInfo;
  gameName: string;
  closeModal: () => void;
}
const GameConfigPackageNameEditModal = (props: IProps) => {
  const { closeModal, packageInfo, gameName } = props;
  return (
    <Modal
      centered
      open
      footer={null}
      onCancel={closeModal}
      width={800}
      closable
    >
      <div className={styles.formTitle}>游戏配置/新增&编辑游戏/包名&区服</div>
      <div className={styles.formWrapper}>
        <Form
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ maxWidth: 300 }}
        >
          <Form.Item label="游戏名" name="gameName" className={styles.formItem}>
            <Input defaultValue={gameName} />
          </Form.Item>

          <Form.Item label="包名" name="packageName">
            <Input defaultValue={packageInfo.packageName} />
          </Form.Item>
          <Form.Item label="是否启用" name="isStart">
            <Switch checked={packageInfo.isStart} />
          </Form.Item>
          <Form.Item label="渠道" name="channel">
            <Input defaultValue={packageInfo.channel} />
          </Form.Item>
          <Form.Item label="签名" name="signature">
            <Input defaultValue={packageInfo.signature} />
          </Form.Item>
          <Form.Item label="启动时间" name="startTime">
            <Input defaultValue={packageInfo.startTime} />
          </Form.Item>
          <Form.Item label="更新时间" name="updateTime">
            <Input defaultValue={packageInfo.updateTime} />
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
export default GameConfigPackageNameEditModal;
