import { Button, Form, Input, Modal } from "antd";
import styles from "./index.module.less";
import { IDnsConfig } from "../../pages/dnsConfig/DnsConfig";
import { useContext } from "react";
import { LoadingContext } from "../../router/Router";

interface IProps {
  dnsConfig: IDnsConfig;
  closeModal: () => void;
}
const DnsEditModal = (props: IProps) => {
  const { dnsConfig, closeModal } = props;
  const { showLoading, hideLoading } = useContext(LoadingContext);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (fieldsValue: any) => {
    console.log(fieldsValue);
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
      <div className={styles.formTitle}>DNS配置/新增&编辑DNS配置</div>
      <div className={styles.formWrapper}>
        <Form
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ maxWidth: 300 }}
          onFinish={onSubmit}
        >
          <Form.Item
            label="名称"
            name="dnsName"
            className={styles.formItem}
            initialValue={dnsConfig.dnsName}
          >
            <Input />
          </Form.Item>

          <Form.Item label="内容" name="content" initialValue="">
            <Input />
          </Form.Item>
          <Form.Item
            label="创建时间"
            name="createTime"
            initialValue={dnsConfig.createTime}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="更新时间"
            name="updateTime"
            initialValue={dnsConfig.updateTime}
          >
            <Input disabled />
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
