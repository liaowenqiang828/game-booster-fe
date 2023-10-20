export const clearLoginInfo = () => {
  localStorage.removeItem("userName");
  localStorage.removeItem("authorization");
};

export const convertArrayBufferToBase64 = (arrayBuffer: ArrayBuffer) => {
  return (
    "data:image/png;base64," +
    window.btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))
  );
};
