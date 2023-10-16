import { useState } from "react";
import styles from "./index.module.less";
import { Input, Button, Checkbox, message } from "antd";
import alienIcon from "../../assets/images/alien_icon.svg";
import { useNavigate } from "react-router-dom";
import ROUTER_PATH from "../../constant/routerPath";
import { login as loginApi } from "../../api/login";
import { ErrorCode } from "../../types";
import { md5 } from "js-md5";

const Login = () => {
  const navigator = useNavigate();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const loginEnable = !!(emailValue && passwordValue);
  // const [messageApi, contextHolder] = message.useMessage();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputEmailValue = (e: any) => {
    setEmailValue(e.target.value);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputPasswordValue = (e: any) => {
    setPasswordValue(e.target.value);
  };

  const loginHandler = () => {
    loginApi({ name: emailValue, password: md5(passwordValue) })
      .then(() => {
        navigator(ROUTER_PATH.HOME);
        // todo replace nameValue
        window.localStorage.setItem("userName", emailValue);
      })
      .catch((error) => {
        if (error.code === ErrorCode.INCORRECT_USER_OR_PASSWORD) {
          message.error("账号或密码错误，请重试");
        }
      });
  };

  return (
    <div className={styles.container}>
      {/* {contextHolder} */}
      <div className={styles.left}>
        <h2 className={styles.loginHeader}>账号登陆</h2>
        <Input
          className={styles.emailInput}
          type="email"
          placeholder="请输入邮箱"
          value={emailValue}
          onChange={inputEmailValue}
          autoComplete="off"
        />
        <Input.Password
          className={styles.passwordInput}
          placeholder="请输入密码"
          value={passwordValue}
          onChange={inputPasswordValue}
          autoComplete="off"
        />
        <Checkbox className={styles.storeAccount}>记住账号</Checkbox>
        <Button
          disabled={!loginEnable}
          className={styles.loginBtn}
          onClick={loginHandler}
        >
          登陆
        </Button>
      </div>
      <div className={styles.right}>
        <div className={styles.rightHeader}>
          <img className={styles.icon} alt="icon" src={alienIcon} />
          <span>加速器后台管理</span>
        </div>
        <div className={styles.rightContent}>探索游戏宇宙一切可能</div>
      </div>
    </div>
  );
};

export default Login;
