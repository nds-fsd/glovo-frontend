/* eslint-disable no-console */
export const uploadImage = (data, stateVariableSetter) => {
  const formData = new FormData();
  formData.append('file', data);
  formData.append('upload_preset', 'globoApp');
  formData.append('cloud_name', 'partycloud');
  fetch('	https://api.cloudinary.com/v1_1/partycloud/image/upload', {
    method: 'post',
    body: formData,
  })
    .then((res) => res.json())
    .then((payload) => {
      console.log('image uploaded', payload);
      stateVariableSetter(payload.url);
    })
    .catch((err) => {
      console.log(err);
    });
};
