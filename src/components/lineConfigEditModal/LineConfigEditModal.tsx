import { Button, Form, Input, Modal, Switch } from "antd";
import styles from "./index.module.less";
import { ILineConfig } from "../../pages/lineConfig/LineConfig";

interface IProps {
  lineConfig: ILineConfig;
  closeModal: () => void;
}
const LineConfigEditModal = (props: IProps) => {
  const { lineConfig, closeModal } = props;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (fieldsValue: any) => {
    console.log(fieldsValue);
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
      <div className={styles.formTitle}>线路配置/新增&编辑线路</div>
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
            label="线路名"
            name="lineName"
            initialValue={lineConfig.lineName}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="是否启用"
            name="isStart"
            initialValue={lineConfig.isStart}
          >
            <Switch checked={lineConfig.isStart} />
          </Form.Item>
          <Form.Item
            label="国家"
            name="country"
            initialValue={lineConfig.country}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="地区"
            name="region"
            initialValue={lineConfig.region}
          >
            <Input />
          </Form.Item>
          <Form.Item label="入口" name="entry" initialValue={lineConfig.entry}>
            <Input />
          </Form.Item>
          <Form.Item label="出口" name="exit" initialValue={lineConfig.exit}>
            <Input />
          </Form.Item>
          <Form.Item
            label="测速地址"
            name="speedTestAddress"
            initialValue={lineConfig.speedTestAddress}
          >
            <Input />
          </Form.Item>
          <Form.Item label="节点地址" name="nodeAddress" initialValue="">
            <Input />
          </Form.Item>
          <Form.Item
            label="创建时间"
            name="startTime"
            initialValue={lineConfig.startTime}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="更新时间"
            name="updateTime"
            initialValue={lineConfig.updateTime}
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

export default LineConfigEditModal;
