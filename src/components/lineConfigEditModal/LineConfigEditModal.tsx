import { Button, Form, Input, Modal, Select, Switch } from "antd";
import styles from "./index.module.less";
import { useContext, useMemo, useState } from "react";
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

interface IProps {
  lineConfig: IBoostZone;
  closeModal: (needRefresh: boolean) => void;
  editMode: boolean;
  boostNodes: string[];
}

const countryOptions = [
  { value: "中国", label: "中国" },
  { value: "日本", label: "日本" },
  { value: "韩国", label: "韩国" },
  { value: "美国", label: "美国" },
  { value: "中国香港", label: "中国香港" },
  { value: "中国台湾", label: "中国台湾" },
  { value: "新加坡", label: "新加坡" },
  { value: "欧洲", label: "欧洲" },
];
const regionOptions = [
  { value: "上海", label: "上海" },
  { value: "广州", label: "广州" },
  { value: "深圳", label: "深圳" },
  { value: "北京", label: "北京" },
  { value: "杭州", label: "杭州" },
  { value: "南京", label: "南京" },
  { value: "成都", label: "成都" },
  { value: "重庆", label: "重庆" },
  { value: "武汉", label: "武汉" },
];
const entryOptions = [{ value: "CN", label: "CN" }];
const exitOptions = [
  { value: "JP", label: "JP" },
  { value: "KR", label: "KR" },
  { value: "US", label: "US" },
  { value: "HK", label: "HK" },
  { value: "TW", label: "TW" },
  { value: "SG", label: "SG" },
  { value: "CN", label: "CN" },
  { value: "EU", label: "EU" },
];

const LineConfigEditModal = (props: IProps) => {
  const { lineConfig, closeModal, editMode, boostNodes } = props;
  const nodeAddressOptions = useMemo(() => {
    return boostNodes.map((node) => ({ value: node, label: node }));
  }, [boostNodes]);
  const { hideLoading, showLoading } = useContext(LoadingContext);
  const [enabled, setEnabled] = useState(!!lineConfig.enabled);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (fieldsValue: any) => {
    delete fieldsValue.created_at;
    delete fieldsValue.updated_at;
    console.log(fieldsValue);

    if (editMode) {
      await editBoostZoneHandler({
        id: lineConfig.id,
        ...fieldsValue,
        enabled,
        desc: lineConfig.desc,
      });
      return;
    }

    await addBoostZoneHandler({
      ...fieldsValue,
      enabled,
      desc: "",
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
        closeModal(true);
      })
      .finally(() => hideLoading());
  };

  const updateEnabledStatus = (checked: boolean) => {
    setEnabled(checked);
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

          <Form.Item label="是否启用">
            <Switch checked={enabled} onChange={updateEnabledStatus} />
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
              showSearch
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
