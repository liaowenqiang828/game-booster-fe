import { Button, Form, Input, message, Modal } from "antd";
import styles from "./index.module.less";
import { useContext, useRef, useState } from "react";
import { LoadingContext } from "../../router/Router";
import { IGame } from "../../types/index";
import {
  addGame,
  editGame,
  getUploadUrl,
  putFileIntoTencentOSS,
} from "../../api/game";
import { IGetUploadUrlResponse } from "../../types/response";
import { IMAGE_BASE_URL } from "../../constant/index";
import { IUploadImageRequest } from "../../types/request";

interface IProps {
  gameConfig: IGame;
  closeModal: () => void;
  editMode: boolean;
}

const GameConfigBasicInfoModal = (props: IProps) => {
  const { gameConfig, closeModal, editMode } = props;
  console.log("gameConfig", gameConfig);
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const iconInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const characterInputRef = useRef<HTMLInputElement>(null);
  const [iconUrl, setIconUrl] = useState<string>(
    editMode ? `${IMAGE_BASE_URL}${gameConfig.icon}` : ""
  );
  const [bannerUrl, setBannerUrl] = useState<string>(
    editMode ? `${IMAGE_BASE_URL}${gameConfig.banner}` : ""
  );
  const [characterUrl, setCharacterUrl] = useState<string>(
    editMode ? `${IMAGE_BASE_URL}${gameConfig.character_pic}` : ""
  );
  const [gameTitle, setGameTitle] = useState(gameConfig.title);
  const [savedImagesUrl, setSavedImagesUrl] = useState<{
    iconSavedUrl: string;
    bannerSavedUrl: string;
    characterSavedUrl: string;
  }>({} as any);
  const [showIconFileInput, setShowIconFileInput] = useState(!gameConfig.icon);
  const [showBannerFileInput, setShowBannerFileInput] = useState(
    !gameConfig.banner
  );
  const [showCharacterFileInput, setShowCharacterFileInput] = useState(
    !gameConfig.character_pic
  );
  const [iconUploadRequest, setIconUploadRequest] =
    useState<IUploadImageRequest>({} as IUploadImageRequest);
  const [bannerUploadRequest, setBannerUploadRequest] =
    useState<IUploadImageRequest>({} as IUploadImageRequest);
  const [characterUploadRequest, setCharacterUploadRequest] =
    useState<IUploadImageRequest>({} as IUploadImageRequest);

  const uploadImages = async () => {
    if (
      !editMode &&
      (JSON.stringify(iconUploadRequest) === "{}" ||
        JSON.stringify(bannerUploadRequest) === "{}" ||
        JSON.stringify(characterUploadRequest) === "{}")
    ) {
      message.warning("请确保选择上传所有图片资源！");
      return Promise.reject("请上传所有图片");
    }

    const promiseArray = [];
    JSON.stringify(iconUploadRequest) !== "{}" &&
      promiseArray.push(putFileIntoTencentOSS(iconUploadRequest));
    JSON.stringify(bannerUploadRequest) !== "{}" &&
      promiseArray.push(putFileIntoTencentOSS(bannerUploadRequest));
    JSON.stringify(characterUploadRequest) !== "{}" &&
      promiseArray.push(putFileIntoTencentOSS(characterUploadRequest));

    return Promise.all(promiseArray);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (fieldsValue: any) => {
    if (editMode) {
      editGameHandler(fieldsValue);
      return;
    }
    addGameHandler(fieldsValue);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addGameHandler = async (fieldsValue: any) => {
    // console.log("fieldsValue", fieldsValue);
    // console.log("request", {
    //   ...fieldsValue,
    //   enabled: false,
    //   title: gameTitle,
    //   icon: savedImagesUrl.iconSavedUrl,
    //   banner: savedImagesUrl.bannerSavedUrl,
    //   character_pic: savedImagesUrl.characterSavedUrl,
    // });
    try {
      showLoading("图片上传中...");
      await uploadImages();
    } catch (error) {
      hideLoading();
      if (error === "请上传所有图片") return;
      message.error("图片上传失败，请重试！");
      return;
    }

    showLoading();
    addGame({
      ...fieldsValue,
      enabled: false,
      title: gameTitle,
      icon: savedImagesUrl.iconSavedUrl,
      banner: savedImagesUrl.bannerSavedUrl,
      character_pic: savedImagesUrl.characterSavedUrl,
    })
      .then(() => closeModal())
      .finally(() => hideLoading());
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editGameHandler = async (fieldsValue: any) => {
    showLoading();
    console.log("fieldsValue", fieldsValue);
    console.log({
      id: gameConfig.id,
      ...fieldsValue,
      enabled: gameConfig.enabled,
      title: gameTitle,
      icon: savedImagesUrl.iconSavedUrl,
      banner: savedImagesUrl.bannerSavedUrl,
      character_pic: savedImagesUrl.characterSavedUrl,
    });

    try {
      showLoading("图片上传中...");
      await uploadImages();
    } catch (error) {
      hideLoading();
      if (error === "请上传所有图片") return;
      message.error("图片上传失败，请重试！");
      return;
    }

    editGame({
      id: gameConfig.id,
      ...fieldsValue,
      enabled: gameConfig.enabled,
      title: gameTitle,
      icon: savedImagesUrl.iconSavedUrl || `${IMAGE_BASE_URL}gameConfig.icon`,
      banner:
        savedImagesUrl.bannerSavedUrl || `${IMAGE_BASE_URL}gameConfig.banner`,
      character_pic:
        savedImagesUrl.characterSavedUrl ||
        `${IMAGE_BASE_URL}gameConfig.character_pic`,
    })
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
      const imageUploadResponse: IGetUploadUrlResponse = await getUploadUrl({
        type: 0,
        name: files[0].name,
      });

      console.log("imageUploadResponse", imageUploadResponse);
      setSavedImagesUrl({
        ...savedImagesUrl,
        iconSavedUrl: imageUploadResponse.saved_url,
      });

      // const fileReader = new FileReader();
      // fileReader.readAsBinaryString(files[0]);

      // setShowIconFileInput(true);
      // console.log("fileReader.result", fileReader.result);
      // setIconUrl(fileReader.result as string);

      // setIconUploadRequest({
      //   uplaodUrl: imageUploadResponse.upload_url,
      //   file: files[0],
      // });

      const fileReader = new FileReader();
      fileReader.readAsBinaryString(files[0]);

      fileReader.addEventListener("load", () => {
        setShowIconFileInput(true);
        console.log("fileReader.result", fileReader.result);
        setIconUrl(fileReader.result as string);
        setIconUploadRequest({
          uplaodUrl: imageUploadResponse.upload_url,
          file: fileReader.result,
        });
      });
    }
  };

  const getBannerImageData = async () => {
    const files = bannerInputRef.current?.files;
    if (files) {
      const imageUploadResponse: IGetUploadUrlResponse = await getUploadUrl({
        type: 0,
        name: files[0].name,
      });

      console.log("imageUploadResponse", imageUploadResponse);
      setSavedImagesUrl({
        ...savedImagesUrl,
        bannerSavedUrl: imageUploadResponse.saved_url,
      });

      const fileReader = new FileReader();
      fileReader.readAsDataURL(files[0]);

      fileReader.addEventListener("load", async () => {
        console.log("fileReader.result", fileReader.result);
        setShowBannerFileInput(true);

        setBannerUrl(fileReader.result as string);
        setBannerUploadRequest({
          uplaodUrl: imageUploadResponse.upload_url,
          file: fileReader.result,
        });
      });
    }
  };

  const getCharacterImageData = async () => {
    const files = characterInputRef.current?.files;
    if (files) {
      const imageUploadResponse: IGetUploadUrlResponse = await getUploadUrl({
        type: 0,
        name: files[0].name,
      });

      console.log("imageUploadResponse", imageUploadResponse);
      setSavedImagesUrl({
        ...savedImagesUrl,
        characterSavedUrl: imageUploadResponse.saved_url,
      });

      const fileReader = new FileReader();
      fileReader.readAsDataURL(files[0]);

      fileReader.addEventListener("load", async () => {
        setShowCharacterFileInput(true);
        console.log("fileReader.result", fileReader.result);
        setCharacterUrl(fileReader.result as string);
        setCharacterUploadRequest({
          uplaodUrl: imageUploadResponse.upload_url,
          file: fileReader.result,
        });
      });
    }
  };

  const onGameTitleChange = (e: any) => {
    setGameTitle(e.target.value);
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
          <Form.Item label="游戏名" name="title">
            <>
              <Input
                value={gameTitle}
                onChange={onGameTitleChange}
                placeholder="请输入游戏名称"
              />
              <span>(该名称将在APP游戏卡中实际展示)</span>
            </>
          </Form.Item>

          <Form.Item
            label="简介"
            name="summary"
            initialValue={gameConfig.summary}
          >
            <Input placeholder="此处为游戏卡片内简介" />
          </Form.Item>
          <Form.Item label="icon">
            <>
              {editMode && (
                <input
                  disabled
                  value={gameConfig.icon.split("/").pop()}
                  className={styles.input}
                  style={{ display: showIconFileInput ? "none" : "block" }}
                />
              )}
              <input
                ref={iconInputRef}
                type={"file"}
                accept="image/*"
                className={styles.input}
                style={{ display: showIconFileInput ? "block" : "none" }}
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
            </>
          </Form.Item>
          <Form.Item label="banner">
            <>
              {editMode && (
                <input
                  disabled
                  value={gameConfig.banner.split("/").pop()}
                  className={styles.input}
                  style={{ display: showBannerFileInput ? "none" : "block" }}
                />
              )}
              <input
                ref={bannerInputRef}
                type="file"
                accept="image/*"
                className={styles.input}
                onChange={getBannerImageData}
                style={{ display: showBannerFileInput ? "block" : "none" }}
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
            </>
          </Form.Item>
          <Form.Item label="character">
            <>
              {editMode && (
                <input
                  disabled
                  value={gameConfig.character_pic.split("/").pop()}
                  className={styles.input}
                  style={{ display: showCharacterFileInput ? "none" : "block" }}
                />
              )}
              <input
                ref={characterInputRef}
                type="file"
                accept="image/*"
                className={styles.input}
                onChange={getCharacterImageData}
                style={{ display: showCharacterFileInput ? "block" : "none" }}
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
            </>
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
