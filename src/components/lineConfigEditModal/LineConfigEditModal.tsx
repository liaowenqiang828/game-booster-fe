import { Button, Form, Input, Modal, Select, Switch, Tag } from "antd";
import styles from "./index.module.less";
import { useContext } from "react";
import { LoadingContext } from "../../router/Router";
import {
  convertTimestampToStr,
  generateDateTimeForCurrentOperation,
} from "../../utils/dataTime";
import { addBoostZone, editBoostZone } from "../../api/boostZones";
import { IBoostZone } from "../../types";
import {
  IAddBoostZoneRequest,
  IEditBoostZoneRequest,
} from "../../types/request";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";

interface IProps {
  lineConfig: IBoostZone;
  closeModal: (needRefresh: boolean) => void;
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
  const onSubmit = async (fieldsValue: any) => {
    delete fieldsValue.created_at;
    delete fieldsValue.updated_at;
    if (editMode) {
      await editBoostZoneHandler({
        id: lineConfig.id,
        ...fieldsValue,
        desc: lineConfig.desc,
      });
      return;
    }

    await addBoostZoneHandler({
      ...fieldsValue,
      desc: "3333",
    });
  };

  const editBoostZoneHandler = async (editRequest: IEditBoostZoneRequest) => {
    showLoading();
    await editBoostZone(editRequest)
      .then(() => {
        closeModal(true);
      })
      .finally(() => hideLoading());
  };

  const addBoostZoneHandler = async (addRequest: IAddBoostZoneRequest) => {
    showLoading();
    await addBoostZone(addRequest)
      .then(() => {
        closeModal(false);
      })
      .finally(() => hideLoading());
  };

  return (
    <Modal
      centered
      open
      footer={null}
      onCancel={() => closeModal(false)}
      width={800}
      closable
      maskClosable={false}
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
          <Form.Item label="线路名" name="name" initialValue={lineConfig.name}>
            <Input placeholder="参考格式：上海日本一区" />
          </Form.Item>

          <Form.Item label="是否启用" name="enabled">
            <Switch defaultChecked={lineConfig.enabled} />
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
          <Form.Item
            label="入口"
            name="inbound_country_code"
            initialValue={lineConfig.inbound_country_code}
          >
            <Select options={entryOptions} />
          </Form.Item>
          <Form.Item
            label="出口"
            name="outbound_country_code"
            initialValue={lineConfig.outbound_country_code}
          >
            <Select options={exitOptions} />
          </Form.Item>
          <Form.Item
            label="测速地址"
            name="ping_addr"
            initialValue={lineConfig.ping_addr}
          >
            <Input placeholder="请前往测速软件确认格式无误" />
          </Form.Item>
          <Form.Item
            label="节点地址"
            name="nodes"
            initialValue={lineConfig.nodes}
          >
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
                ? convertTimestampToStr(lineConfig.created_at)
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
                ? convertTimestampToStr(lineConfig.updated_at)
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
