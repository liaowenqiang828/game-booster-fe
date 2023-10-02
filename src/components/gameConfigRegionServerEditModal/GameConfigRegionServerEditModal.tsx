import { Button, Form, Input, Modal, Switch } from "antd";
import styles from "./index.module.less";
import { IServerInfo } from "../viewPackageAndServerModal/ViewPackageAndServerModal";
import { useContext } from "react";
import { LoadingContext } from "../../router/Router";

interface IProps {
  regionServer: IServerInfo;
  gameName: string;
  closeModal: () => void;
}
const GameConfigRegionServerEditModal = (props: IProps) => {
  const { closeModal, regionServer, gameName } = props;
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const onSubmit = () => {
    showLoading();
    setTimeout(() => {
      hideLoading();
      closeModal();
    }, 2000);
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
      <div className={styles.formTitle}>游戏配置/新增&编辑游戏/包名&区服</div>
      <div className={styles.formWrapper}>
        <Form
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ maxWidth: 300 }}
          onFinish={onSubmit}
        >
          <Form.Item label="游戏名" name="gameName" className={styles.formItem}>
            <Input disabled defaultValue={gameName} />
          </Form.Item>

          <Form.Item label="区服名" name="regionServerName">
            <Input defaultValue={regionServer.regionServerName} />
          </Form.Item>
          <Form.Item label="是否启用" name="isStart">
            <Switch checked={regionServer.isStart} />
          </Form.Item>
          <Form.Item label="DNS" name="dns">
            <Input defaultValue="" />
          </Form.Item>
          <Form.Item label="加速网络" name="accelerateLine">
            <Input defaultValue={regionServer.accelerateLine} />
          </Form.Item>
          <Form.Item label="签名" name="signature">
            <Input defaultValue="" />
          </Form.Item>
          <Form.Item label="启动时间" name="startTime">
            <Input disabled defaultValue="" />
          </Form.Item>
          <Form.Item label="更新时间" name="updateTime">
            <Input disabled defaultValue="" />
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
export default GameConfigRegionServerEditModal;
