function getJson() {
    const jsonArea = document.getElementById("json");
    return jsonArea.value;
}

const ResultTypes = {
    Valid: "Valid",
    Invalid: "Invalid",
    Unverified: "Unverified"
}
function setJsonResult(resultType, message) {
    const resultsArea = document.getElementById("validation-results");
    if (resultType === ResultTypes.Valid) {
        resultsArea.innerText = "Json is Valid";
    }
    else if (resultType === ResultTypes.Invalid) {
        resultsArea.innerText = `Json is Invalid. ${message}`;
    }
    else if (resultType === ResultTypes.Unverified) {
        resultsArea.innerText = "Json is not verified";
    }
}

function validateJson() {
    const jsonString = getJson();
    try {
        JSON.parse(jsonString);
        setJsonResult(ResultTypes.Valid)
    }
    catch (error) {
        setJsonResult(ResultTypes.Invalid, error);
    }

    // TODO add more advanced JSON validation
}