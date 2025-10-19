fetch(
  "https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry"
)
  .then((response) => {
    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // Parse the response body as JSON
    return response.text();
  })
  .then((data) => {
    // Handle the loaded data
    language_data_list = data.split("%%");
    language_data_list.shift();
    console.log(language_data_list.length);
    let language_information_list = [];
    language_data_list.forEach((language_data) => {
      console.log(language_data);
      const data = language_data.split(/\r?\n/);
      const dict_data = {};
      console.log(`Length of data = ${data.length}`);
      for (i = 0; i < data.length; i++) {
        const pair = data[i].split(":");
        let k = pair[0];
        let v = pair[1];
        if (!k || !v) {
          continue;
        }
        k = k.trim();
        v = v.trim();
        console.log(`Length of pair = ${pair.length}`);
        console.log(`Key = ${k} and Value = ${v}`);
        if (k == "Description") {
          if (dict_data[k]) {
            dict_data[k].push(v);
          } else {
            dict_data[k] = [v];
          }
        } else {
          dict_data[k] = v;
        }
      }
      if (
        dict_data["Subtag"] == undefined ||
        dict_data["Subtag"] == null ||
        dict_data["Type"] !== "language" ||
        dict_data["Subtag"].includes(".") ||
        dict_data["Description"] == "Private use"
      ) {
        return;
      }
      language_information_list.push(dict_data);
    });
    const fs = require("fs");

    const jsonString = JSON.stringify(language_information_list, null, 2); // Pretty-print with 2-space indentation

    fs.writeFile(
      "sidepanel/language_information.json",
      jsonString,
      "utf8",
      (err) => {
        if (err) {
          console.error("Error writing file:", err);
        } else {
          console.log("language_information.json saved successfully!");
        }
      }
    );
  })
  .catch((error) => {
    // Handle any errors during the fetch operation
    console.error("Error fetching data:", error);
  });
