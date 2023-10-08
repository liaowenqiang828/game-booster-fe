import { Button, Form, Input, Modal } from "antd";
import styles from "./index.module.less";
import { useContext } from "react";
import { LoadingContext } from "../../router/Router";
import {
  convertTimestampToStr,
  generateDateTimeForCurrentOperation,
} from "../../utils/dataTime";
import { IDnsGroup } from "../../types";
import { addDnsGroup, editDnsGroup } from "../../api/dns";

interface IProps {
  dnsConfig: IDnsGroup;
  closeModal: () => void;
  editMode: boolean;
}
const DnsEditModal = (props: IProps) => {
  const { dnsConfig, closeModal, editMode } = props;
  const { showLoading, hideLoading } = useContext(LoadingContext);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (fieldsValue: any) => {
    if (editMode) {
      editDnsGroupHandler(fieldsValue);
      return;
    }
    addDnsGroupHandler(fieldsValue);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addDnsGroupHandler = async (fieldsValue: any) => {
    showLoading();
    await addDnsGroup({ name: fieldsValue.name, dns: fieldsValue.dns })
      .then(() => closeModal)
      .finally(() => hideLoading());
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editDnsGroupHandler = async (fieldsValue: any) => {
    showLoading();
    await editDnsGroup({
      id: fieldsValue.id,
      name: fieldsValue.name,
      dns: fieldsValue.dns,
    })
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
      <div className={styles.formTitle}>DNS配置/新增&编辑DNS配置</div>
      <div className={styles.formWrapper}>
        <Form
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          wrapperCol={{ flex: 1 }}
          colon={false}
          onFinish={onSubmit}
        >
          <Form.Item
            label="名称"
            name="dnsName"
            className={styles.formItem}
            initialValue={dnsConfig.name}
            rules={[{ required: true }]}
          >
            <Input style={{ width: "190px" }} />
          </Form.Item>

          <Form.Item
            label="内容"
            name="content"
            initialValue={dnsConfig.dns}
            rules={[{ required: true }]}
          >
            <Input.TextArea
              autoSize={{ minRows: 15 }}
              style={{ width: "80%" }}
            />
          </Form.Item>
          <Form.Item
            label="创建时间"
            name="createTime"
            initialValue={
              editMode
                ? convertTimestampToStr(dnsConfig.created_at)
                : generateDateTimeForCurrentOperation()
            }
          >
            <Input disabled style={{ width: "190px" }} />
          </Form.Item>
          <Form.Item
            label="更新时间"
            name="updateTime"
            initialValue={
              editMode
                ? convertTimestampToStr(dnsConfig.updated_at)
                : generateDateTimeForCurrentOperation()
            }
          >
            <Input disabled style={{ width: "190px" }} />
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
