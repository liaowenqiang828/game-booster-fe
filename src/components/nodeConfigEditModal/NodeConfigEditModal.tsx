import { Button, Form, Input, Modal, Select, Switch, Tag } from "antd";
import { IBoostNodeModel } from "../../pages/nodeConfig/NodeConfig";
import type { SelectProps } from "antd";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import styles from "./index.module.less";
import { useContext, useState } from "react";
import { LoadingContext } from "../../router/Router";
import { convertTimestampToStr } from "../../utils/dataTime";
import { editBoostNode } from "../../api/boostNode";

interface IProps {
  nodeConfig: IBoostNodeModel;
  closeModal: (needRefresh: boolean) => void;
}
const NodeConfigEditModal = (props: IProps) => {
  const { nodeConfig, closeModal } = props;
  console.log(nodeConfig);

  const [isStart, setIsStart] = useState(nodeConfig.enabled);
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const options: SelectProps["options"] = [
    {
      label: "高速",
      value: 1,
    },
    {
      label: "下载",
      value: 2,
    },
  ];

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
    // todo prevent to change prod data
    // todo remove when deploy to prod
    if (nodeConfig.id !== 6 && nodeConfig.id !== 7) return;

    showLoading();
    editBoostNode({
      id: nodeConfig.id,
      name: fieldsValue.name,
      enabled: isStart,
      modes: [...fieldsValue.modes].reduce(
        (pre: number, cur: number) => pre + cur,
        0
      ),
      bandwidth: nodeConfig.bandwidth,
    })
      .then(() => {
        closeModal(true);
      })
      .finally(() => {
        hideLoading();
      });
  };
  return (
    <Modal
      centered
      open
      footer={null}
      onCancel={() => closeModal(false)}
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
            initialValue={nodeConfig.public_addr}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item label="节点名" name="name" initialValue={nodeConfig.name}>
            <Input />
          </Form.Item>
          <Form.Item label="是否启动" valuePropName="isStart">
            <div className={styles.switchWrapper}>
              <Switch onChange={changeIsStartHandler} checked={isStart} />
            </div>
          </Form.Item>
          <Form.Item label="程序版本" name="ver" initialValue={nodeConfig.ver}>
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="加速模式"
            name="modes"
            initialValue={nodeConfig.modes > 2 ? [1, 2] : [nodeConfig.modes]}
          >
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="选择加速模式"
              options={options}
              tagRender={tagRender}
            />
          </Form.Item>
          <Form.Item
            label="当前在线人数"
            name="online_cnt"
            initialValue={nodeConfig.online_cnt}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="创建时间"
            name="startTime"
            initialValue={convertTimestampToStr(nodeConfig.started_at)}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="更新时间"
            name="updateTime"
            initialValue={convertTimestampToStr(nodeConfig.updated_at)}
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
