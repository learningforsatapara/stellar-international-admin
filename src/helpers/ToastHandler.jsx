import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { App } from "antd";

function ToastHandler() {
  const { message } = App.useApp();

  // selector
  const { error, success } = useSelector((state) => state.msg);
  // use
  const dispatch = useDispatch();
  // useEffect
  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch({ type: "CLEAR_TOAST" });
    }
    if (success) {
      message.success(success);
      dispatch({ type: "CLEAR_TOAST" });
    }
  }, [error, success, dispatch]);
  return <></>;
}

export default ToastHandler;
