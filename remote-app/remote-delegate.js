module.exports = new Promise(async (resolve, reject) => {
    const { importDelegatedModule } = await import('@module-federation/utilities');

    console.log('Delegate being called for', __resourceQuery, 'from', __webpack_runtime_id__);
    const currentRequest = new URLSearchParams(__resourceQuery).get('remote');
    const [global, url] = currentRequest.split('@');
    importDelegatedModule({
      global,
      url,
    })
      .then(async (remote) => {
        resolve(remote)
      })
      .catch((err) => {
        reject(err);
      });
  });