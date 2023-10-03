import { Button, Form, Input, Modal, Select, Switch } from "antd";
import styles from "./index.module.less";
import { ILineConfig } from "../../pages/lineConfig/LineConfig";
import { useContext } from "react";
import { LoadingContext } from "../../router/Router";
import { generateDateTimeForCurrentOperation } from "../../utils/dataTime";

interface IProps {
  lineConfig: ILineConfig;
  closeModal: () => void;
  editMode: boolean;
}

const countryOptions = [
  { value: "中国", label: "中国" },
  { value: "日本", label: "日本" },
  { value: "新加坡", label: "新加坡" },
];
const regionOptions = [
  { value: "上海", label: "上海" },
  { value: "广州", label: "广州" },
  { value: "深圳", label: "深圳" },
];
const entryOptions = [
  { value: "CN", label: "CN" },
  { value: "HK", label: "HK" },
];
const exitOptions = [
  { value: "JP", label: "JP" },
  { value: "HK", label: "HK" },
];

const nodeAddressOptions = [
  { value: "192.168.5.5", label: "192.168.5.5" },
  { value: "192.168.1.1", label: "192.168.1.1" },
  { value: "1.1.1.1", label: "1.1.1.1" },
  { value: "2.2.2.2", label: "2.2.2.2" },
  { value: "4.4.4.4", label: "4.4.4.4" },
  { value: "9.9.9.9", label: "9.9.9.9" },
];

const LineConfigEditModal = (props: IProps) => {
  const { lineConfig, closeModal, editMode } = props;
  const { hideLoading, showLoading } = useContext(LoadingContext);
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
            <Switch defaultChecked={lineConfig.isStart} />
          </Form.Item>
          <Form.Item
            label="国家"
            name="country"
            initialValue={lineConfig.country}
          >
            <Select options={countryOptions} />
          </Form.Item>
          <Form.Item
            label="地区"
            name="region"
            initialValue={lineConfig.region}
          >
            <Select options={regionOptions} />
          </Form.Item>
          <Form.Item label="入口" name="entry" initialValue={lineConfig.entry}>
            <Select options={entryOptions} />
          </Form.Item>
          <Form.Item label="出口" name="exit" initialValue={lineConfig.exit}>
            <Select options={exitOptions} />
          </Form.Item>
          <Form.Item
            label="测速地址"
            name="speedTestAddress"
            initialValue={lineConfig.speedTestAddress}
          >
            <Input />
          </Form.Item>
          <Form.Item label="节点地址" name="nodeAddress" initialValue={[]}>
            <Select
              options={nodeAddressOptions}
              mode="multiple"
              style={{ width: "190px" }}
            />
          </Form.Item>
          <Form.Item
            label="创建时间"
            name="startTime"
            initialValue={
              editMode
                ? lineConfig.startTime
                : generateDateTimeForCurrentOperation()
            }
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="更新时间"
            name="updateTime"
            initialValue={
              editMode
                ? lineConfig.updateTime
                : generateDateTimeForCurrentOperation()
            }
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
