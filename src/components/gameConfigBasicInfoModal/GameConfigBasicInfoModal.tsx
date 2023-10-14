import { Button, Form, Input, Modal } from "antd";
import styles from "./index.module.less";
import { useContext, useRef, useState } from "react";
import { LoadingContext } from "../../router/Router";
import { IGame } from "../../types/index";
import {
  addGame,
  editGame,
  getUploadUrl,
  putImageFileIntoTencentOSS,
} from "../../api/game";
import { IGetUploadUrlResponse } from "../../types/response";

interface IProps {
  gameConfig: IGame;
  closeModal: () => void;
  editMode: boolean;
}
const GameConfigBasicInfoModal = (props: IProps) => {
  const { gameConfig, closeModal, editMode } = props;
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const iconInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const characterInputRef = useRef<HTMLInputElement>(null);
  const [iconUrl, setIconUrl] = useState<string>("");
  const [bannerUrl, setBannerUrl] = useState<string>("");
  const [characterUrl, setCharacterUrl] = useState<string>("");
  const [savedImagesUrl, setSavedImagesUrl] = useState<{
    iconSavedUrl: string;
    bannerSavedUrl: string;
    characterSavedUrl: string;
  }>({} as any);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (fieldsValue: any) => {
    if (editMode) {
      editGameHandler(fieldsValue);
      return;
    }
    addGameHandler(fieldsValue);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addGameHandler = (fieldsValue: any) => {
    // showLoading();
    console.log("fieldsValue", fieldsValue);
    console.log("request", {
      ...fieldsValue,
      enabled: false,
      icon: savedImagesUrl.iconSavedUrl,
      banner: savedImagesUrl.bannerSavedUrl,
      character_pic: savedImagesUrl.characterSavedUrl,
    });

    // addGame({
    //   ...fieldsValue,
    //   enabled: false,
    //   icon: savedImagesUrl.iconSavedUrl,
    //   banner: savedImagesUrl.bannerSavedUrl,
    //   character_pic: savedImagesUrl.characterSavedUrl,
    // })
    //   .then(() => closeModal())
    //   .finally(() => hideLoading());
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editGameHandler = (fieldsValue: any) => {
    showLoading();
    console.log("fieldsValue", fieldsValue);
    editGame(fieldsValue)
      .then(() => closeModal())
      .finally(() => hideLoading());
  };

  const uploadIconPicture = () => {
    iconInputRef.current?.click();
  };

  const uploadBannerPicture = () => {
    bannerInputRef.current?.click();
  };

  const uploadCharacterPicture = () => {
    characterInputRef.current?.click();
  };

  // todo error handler
  const getIconImageData = async () => {
    const files = iconInputRef.current?.files;
    if (files) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files[0]);

      const imageUploadResponse: IGetUploadUrlResponse = await getUploadUrl({
        type: 0,
        name: files[0].name,
      });
      await putImageFileIntoTencentOSS({
        uplaodUrl: imageUploadResponse.upload_url,
        file: "",
      });
      console.log("imageUploadResponse", imageUploadResponse);
      setSavedImagesUrl({
        ...savedImagesUrl,
        iconSavedUrl: imageUploadResponse.saved_url,
      });

      fileReader.addEventListener("load", () => {
        setIconUrl(fileReader.result as string);
        putImageFileIntoTencentOSS({
          uplaodUrl: imageUploadResponse.upload_url,
          file: fileReader.result,
        });
      });
    }
  };

  const getBannerImageData = async () => {
    const files = bannerInputRef.current?.files;
    if (files) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files[0]);
      const imageUploadResponse: IGetUploadUrlResponse = await getUploadUrl({
        type: 0,
        name: files[0].name,
      });

      console.log("imageUploadResponse", imageUploadResponse);
      setSavedImagesUrl({
        ...savedImagesUrl,
        bannerSavedUrl: imageUploadResponse.saved_url,
      });

      fileReader.addEventListener("load", async () => {
        setBannerUrl(fileReader.result as string);
        await putImageFileIntoTencentOSS({
          uplaodUrl: imageUploadResponse.upload_url,
          file: fileReader.result,
        });
      });
    }
  };

  const getCharacterImageData = async () => {
    const files = characterInputRef.current?.files;
    if (files) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files[0]);
      const imageUploadResponse: IGetUploadUrlResponse = await getUploadUrl({
        type: 0,
        name: files[0].name,
      });

      console.log("imageUploadResponse", imageUploadResponse);
      setSavedImagesUrl({
        ...savedImagesUrl,
        characterSavedUrl: imageUploadResponse.saved_url,
      });
      fileReader.addEventListener("load", async () => {
        setCharacterUrl(fileReader.result as string);
        await putImageFileIntoTencentOSS({
          uplaodUrl: imageUploadResponse.upload_url,
          file: fileReader.result,
        });
      });
    }
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
      <div className={styles.formTitle}>游戏配置/新增&编辑游戏/基本信息</div>
      <div className={styles.formWrapper}>
        <Form
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ maxWidth: 1000 }}
          onFinish={onSubmit}
        >
          <Form.Item
            label="游戏名"
            name="title"
            initialValue={gameConfig.title}
          >
            <Input />
          </Form.Item>
          <span>(该名称将在APP游戏卡中实际展示)</span>

          <Form.Item
            label="简介"
            name="summary"
            initialValue={gameConfig.summary}
          >
            <Input />
          </Form.Item>
          <Form.Item label="icon">
            <input
              ref={iconInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              className={styles.input}
              onChange={getIconImageData}
            />
            <label>
              <Button
                type="primary"
                onClick={uploadIconPicture}
                className={styles.uploadBtn}
              >
                上传
              </Button>
            </label>
            <img
              src={iconUrl || ""}
              className={styles.iconImg}
              alt="icon"
              style={{ visibility: iconUrl ? "visible" : "hidden" }}
            />
          </Form.Item>
          <Form.Item label="banner">
            <input
              ref={bannerInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              className={styles.input}
              onChange={getBannerImageData}
            />
            <label>
              <Button
                type="primary"
                onClick={uploadBannerPicture}
                className={styles.uploadBtn}
              >
                上传
              </Button>
            </label>
            <img
              src={bannerUrl || ""}
              alt="banner"
              className={styles.iconImg}
              style={{ visibility: bannerUrl ? "visible" : "hidden" }}
            />
          </Form.Item>
          <Form.Item label="character">
            <input
              ref={characterInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              className={styles.input}
              onChange={getCharacterImageData}
            />
            <label>
              <Button
                type="primary"
                onClick={uploadCharacterPicture}
                className={styles.uploadBtn}
              >
                上传
              </Button>
            </label>

            <img
              src={characterUrl || ""}
              alt="character"
              className={styles.characterImg}
              style={{ visibility: characterUrl ? "visible" : "hidden" }}
            />
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

export default GameConfigBasicInfoModal;
