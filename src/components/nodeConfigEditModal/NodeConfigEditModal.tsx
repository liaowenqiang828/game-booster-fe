import { Button, Form, Input, Modal, Select, Switch, Tag } from "antd";
import { INodeConfig } from "../../pages/nodeConfig/NodeConfig";
import type { SelectProps } from "antd";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import styles from "./index.module.less";
import { useState } from "react";

interface IProps {
  nodeConfig: INodeConfig;
  closeModal: () => void;
}
const NodeConfigEditModal = (props: IProps) => {
  const { nodeConfig, closeModal } = props;
  const [isStart, setIsStart] = useState(nodeConfig.isStart);
  const options: SelectProps["options"] = [
    {
      label: "高速",
      value: "高速",
    },
    {
      label: "下载",
      value: "下载",
    },
  ];

  const handleAccelerateModeChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  const tagRender = (props: CustomTagProps) => {
    const { label } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color="#1677ff"
        onMouseDown={onPreventMouseDown}
        closable={false}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };

  const changeIsStartHandler = (checked: boolean) => setIsStart(checked);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (fieldsValue: any) => {
    console.log({ ...fieldsValue, isStart });
    // todo update api call
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
      <div className={styles.formTitle}>节点配置/编辑</div>
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
            label="节点地址"
            name="nodeAddress"
            className={styles.formItem}
            initialValue={nodeConfig.nodeAddress}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="节点名"
            name="nodeNameValue"
            initialValue={nodeConfig.nodeName}
          >
            <Input />
          </Form.Item>
          <Form.Item label="是否启动" valuePropName="isStart">
            <div className={styles.switchWrapper}>
              <Switch onChange={changeIsStartHandler} checked={isStart} />
            </div>
          </Form.Item>
          <Form.Item
            label="程序版本"
            name="version"
            initialValue={nodeConfig.version}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="加速模式"
            name="accelerateMode"
            initialValue={nodeConfig.accelerateMode || []}
          >
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="选择加速模式"
              // defaultValue={nodeConfig.accelerateMode || []}
              onChange={handleAccelerateModeChange}
              options={options}
              tagRender={tagRender}
            />
          </Form.Item>
          <Form.Item
            label="当前在线人数"
            name="onLinePeopleNumber"
            initialValue={nodeConfig.onLinePeopleNumber}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="创建时间"
            name="startTime"
            initialValue={nodeConfig.startTime}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="更新时间"
            name="updateTime"
            initialValue={nodeConfig.updateTime}
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

export default NodeConfigEditModal;
