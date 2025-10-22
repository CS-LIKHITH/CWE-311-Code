const userData = {
    username: "johndoe",
    password: "SuperSecretPassword123"
};

function sendUserData(data) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://example.com/api/send-data");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
}

sendUserData(userData);
