import { Button, Form, Input, Modal } from "antd";
import styles from "./index.module.less";
import { useContext } from "react";
import { LoadingContext } from "../../router/Router";
import {
  convertTimestampToStr,
  generateDateTimeForCurrentOperation,
} from "../../utils/dataTime";
import { IDnsGroup } from "../../types/index";
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
    await addDnsGroup({
      name: fieldsValue.name,
      dns: [...fieldsValue.dns.split("\n")],
    })
      .then(() => closeModal())
      .finally(() => hideLoading());
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editDnsGroupHandler = async (fieldsValue: any) => {
    console.log(fieldsValue);

    showLoading();
    await editDnsGroup({
      id: dnsConfig.id,
      name: fieldsValue.name,
      dns: [...fieldsValue.dns.split("\n")],
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
            label="DNS名称"
            name="name"
            className={styles.formItem}
            initialValue={editMode ? dnsConfig.name : ""}
          >
            <Input style={{ width: "190px" }} placeholder="请输入DNS名称" />
          </Form.Item>

          <Form.Item
            label="内容"
            name="dns"
            initialValue={editMode ? dnsConfig.dns.join("\n") : ""}
          >
            <Input.TextArea
              autoSize={{ minRows: 15 }}
              style={{ width: "80%" }}
              placeholder="请逐行填写，一行一个DNS, 如：1.1.1.1"
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
