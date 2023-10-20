import { Button, Form, Input, Modal, Switch, Select, Tag } from "antd";
import styles from "./index.module.less";
import { useContext, useState } from "react";
import { LoadingContext } from "../../router/Router";
import { IBoostZone, IDnsGroup, IGameRegion } from "../../types";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import {
  IAddGameRegionRequest,
  IEditGameRegionRequest,
} from "../../types/request";
import { addGameRegion, editGameRegion } from "../../api/game";
import { convertTimestampToStr } from "../../utils/dataTime";

interface IProps {
  regionServer: IGameRegion;
  gameName: string;
  closeModal: (needRefresh: boolean) => void;
  editMode: boolean;
  gameId: number;
  dnsGroup: IDnsGroup[];
  boostZones: IBoostZone[];
}
const GameConfigRegionServerEditModal = (props: IProps) => {
  const {
    closeModal,
    regionServer,
    gameName,
    editMode,
    gameId,
    dnsGroup,
    boostZones,
  } = props;
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const [currentEnabled, setCurrentEnabled] = useState(regionServer.enabled);

  const dnsOptions = dnsGroup.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const boostZonesOptions = boostZones.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (fieldsValue: any) => {
    const commonRequest = {
      name: fieldsValue.name,
      enabled: fieldsValue.enabled,
      dns_group: fieldsValue.dns_group,
      boost_zones: fieldsValue.boost_zones,
    };
    if (editMode) {
      const request: IEditGameRegionRequest = {
        ...commonRequest,
        id: regionServer.id,
      };
      editGameRegionHandler(request);
      return;
    }

    const request: IAddGameRegionRequest = {
      ...commonRequest,
      game_id: gameId,
    };
    addGameRegionHandler(request);
  };

  const addGameRegionHandler = (request: IAddGameRegionRequest) => {
    showLoading();
    addGameRegion(request)
      .then(() => closeModal(true))
      .finally(() => hideLoading());
  };

  const editGameRegionHandler = (request: IEditGameRegionRequest) => {
    showLoading();
    console.log("request", request);

    editGameRegion(request)
      .then(() => closeModal(true))
      .finally(() => hideLoading());
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
      <div className={styles.formTitle}>
        游戏配置/新增&编辑游戏/包名/新增&编辑区服
      </div>
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
            label="游戏名"
            name="gameName"
            className={styles.formItem}
            initialValue={gameName}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="区服名"
            name="name"
            initialValue={regionServer.name}
          >
            <Input placeholder="请填写区服名" />
          </Form.Item>
          <Form.Item label="是否启用" name="enabled">
            <Switch
              checked={currentEnabled}
              onChange={(checked: boolean) => setCurrentEnabled(checked)}
            />
          </Form.Item>
          <Form.Item
            label="DNS"
            name="dns_group"
            initialValue={regionServer.dns_group}
          >
            <Select
              options={dnsOptions}
              tagRender={tagRender}
              placeholder="请选择DNS"
            />
          </Form.Item>
          <Form.Item
            label="加速路线"
            name="boost_zones"
            initialValue={regionServer.boost_zones}
          >
            <Select
              options={boostZonesOptions}
              tagRender={tagRender}
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="请选择加速路线"
            />
          </Form.Item>
          <Form.Item
            label="启动时间"
            name="startTime"
            initialValue={
              editMode
                ? convertTimestampToStr(regionServer.created_at)
                : convertTimestampToStr(new Date().getTime())
            }
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="更新时间"
            name="updateTime"
            initialValue={
              editMode
                ? convertTimestampToStr(regionServer.updated_at)
                : convertTimestampToStr(new Date().getTime())
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
export default GameConfigRegionServerEditModal;
