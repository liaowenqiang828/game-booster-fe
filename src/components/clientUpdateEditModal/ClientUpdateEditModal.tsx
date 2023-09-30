import { Button, Form, Input, Modal } from "antd";
import styles from "./index.module.less";
import { IClientUpdateConfig } from "../../pages/clientUpdateConfig/ClientUpdateConfig";

interface IProps {
  clientUpdateConfig: IClientUpdateConfig;
  closeModal: () => void;
}
const ClientUpdateEditModal = (props: IProps) => {
  const { clientUpdateConfig, closeModal } = props;

  return (
    <Modal
      centered
      open
      footer={null}
      onCancel={closeModal}
      width={800}
      closable
    >
      <div className={styles.formTitle}>客户端升级配置/新增&编辑版本</div>
      <div className={styles.formWrapper}>
        <Form
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ maxWidth: 300 }}
        >
          <Form.Item label="版本号" name="version">
            <Input defaultValue={clientUpdateConfig.version} />
          </Form.Item>

          <Form.Item label="系统" name="system">
            <Input defaultValue={clientUpdateConfig.system} />
          </Form.Item>
          <Form.Item label="安装包" name="package">
            <Input />
          </Form.Item>
          <Form.Item label="标题" name="title">
            <Input defaultValue={clientUpdateConfig.title} />
          </Form.Item>
          <Form.Item label="内容" name="content">
            <Input defaultValue={clientUpdateConfig.content} />
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

export default ClientUpdateEditModal;
