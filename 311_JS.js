secmgr.createSecret(params, (err, data) => {
    if (err) console.log(err);
    else {
        console.log(data);
        res.end(data.ARN);
        res.end(data.Name);
        res.end(data.VersionId);
        res.end(secretValue);
    }
});
