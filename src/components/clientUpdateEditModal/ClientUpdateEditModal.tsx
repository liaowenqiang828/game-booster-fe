import { Button, Checkbox, Form, Input, Modal, Select } from "antd";
import styles from "./index.module.less";
import { useContext } from "react";
import { LoadingContext } from "../../router/Router";
import { IClientUpdate, OSENUM } from "../../types";

interface IProps {
  clientUpdateConfig: IClientUpdate;
  closeModal: () => void;
}

const osSelectorOptions = [
  {
    label: OSENUM[OSENUM.Android],
    value: OSENUM.Android,
  },
  {
    label: OSENUM[OSENUM.IOS],
    value: OSENUM.IOS,
  },
  {
    label: OSENUM[OSENUM.PC],
    value: OSENUM.PC,
  },
];
const ClientUpdateEditModal = (props: IProps) => {
  const { clientUpdateConfig, closeModal } = props;

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
      <div className={styles.formTitle}>客户端升级配置/新增&编辑版本</div>
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
            label="版本号"
            name="version"
            initialValue={clientUpdateConfig.ver}
          >
            <Input />
            <Checkbox>勾选表“更强”</Checkbox>
          </Form.Item>

          <Form.Item
            label="系统"
            name="system"
            initialValue={clientUpdateConfig.os}
          >
            <Select options={osSelectorOptions} />
          </Form.Item>
          <Form.Item label="安装包" name="package">
            <Input />
            <Button
              type="primary"
              style={{ position: "absolute", marginLeft: "20px" }}
            >
              上传
            </Button>
          </Form.Item>
          <Form.Item
            label="标题"
            name="title"
            initialValue={clientUpdateConfig.title}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            initialValue={clientUpdateConfig.change_log}
          >
            <Input.TextArea autoSize={{ minRows: 5 }} />
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
