import { Button, Form, Input, Modal } from "antd";
import styles from "./index.module.less";
import { IDnsConfig } from "../../pages/dnsConfig/DnsConfig";

interface IProps {
  dnsConfig: IDnsConfig;
  closeModal: () => void;
}
const DnsEditModal = (props: IProps) => {
  const { dnsConfig, closeModal } = props;

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
          <Form.Item label="名称" name="dnsName" className={styles.formItem}>
            <Input defaultValue={dnsConfig.dnsName} />
          </Form.Item>

          <Form.Item label="内容" name="content">
            <Input />
          </Form.Item>
          <Form.Item label="创建时间" name="createTime">
            <Input defaultValue={dnsConfig.createTime} />
          </Form.Item>
          <Form.Item label="更新时间" name="updateTime">
            <Input defaultValue={dnsConfig.updateTime} />
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

export default DnsEditModal;
