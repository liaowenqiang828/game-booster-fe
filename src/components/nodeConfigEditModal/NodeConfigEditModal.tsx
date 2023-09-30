import { Button, Form, Input, Modal, Switch } from "antd";
import styles from "./index.module.less";
import { INodeConfig } from "../../pages/nodeConfig/NodeConfig";

interface IProps {
  nodeConfig: INodeConfig;
  closeModal: () => void;
}
const NodeConfigEditModal = (props: IProps) => {
  const { nodeConfig, closeModal } = props;
  console.log("nodeConfig", nodeConfig);

  return (
    <Modal
      centered
      open
      footer={null}
      onCancel={closeModal}
      width={800}
      closable
    >
      <div className={styles.formTitle}>节点配置/编辑</div>
      <div className={styles.formWrapper}>
        <Form
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ maxWidth: 300 }}
        >
          <Form.Item
            label="节点地址"
            name="nodeAddress"
            className={styles.formItem}
          >
            <Input defaultValue={nodeConfig.nodeAddress} />
          </Form.Item>

          <Form.Item label="节点名" name="addressName">
            <Input defaultValue={nodeConfig.nodeName} />
          </Form.Item>

          <Form.Item label="是否启动">
            <Switch checked={nodeConfig.isStart} />
          </Form.Item>
          <Form.Item label="程序版本" name="version">
            <Input defaultValue={nodeConfig.version} />
          </Form.Item>
          <Form.Item label="加速模式" name="accelerateMode">
            <Input defaultValue={nodeConfig.accelerateMode} />
          </Form.Item>
          <Form.Item label="当前在线人数" name="onLinePeopleNumber">
            <Input defaultValue={nodeConfig.onLinePeopleNumber} />
          </Form.Item>
          <Form.Item label="创建时间" name="createTime">
            <Input defaultValue={nodeConfig.startTime} />
          </Form.Item>
          <Form.Item label="更新时间" name="updateTime">
            <Input defaultValue={nodeConfig.updateTime} />
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

export default NodeConfigEditModal;
