const datetime_hud = document.getElementById("datetime");
const notes = document.getElementById("notes");

const notes_storage = localStorage.getItem("notes_storage_botany_bay");
const ai_dedstorage = localStorage.getItem("dedstorage");
const ai_storage = JSON.parse(ai_dedstorage);

const word_problems_answers = document.getElementById("word-problems-answers");
const answer_keys_links = document.getElementById("answer-keys-links");

const chatbox = document.getElementById("chatbox");
let chat_slot = "";
const name_set = document.getElementById("name-set");
const msg_for_chat = document.getElementById("msg-for-chat");
const name_set_storage = localStorage.getItem("botany-bay-name-set");

$("#set-name").submit(function () {
  event.preventDefault();

  localStorage.setItem("botany-bay-name-set", name_set.value);
});

name_set.value = name_set_storage;

$("#chat-msg").submit(function () {
  event.preventDefault();

  fetch ("/postchat", {
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({
      username : name_set.value,
      message : msg_for_chat.value
    })
  })
  .then(response => response.text())
  .then(data => {
    console.log(data);

    msg_for_chat.value = "";
  })
  .catch(error => {
    throw error;
  });
});

chatbox.scrollTo(0, chatbox.scrollHeight);

if (ai_dedstorage === null) {
  localStorage.setItem("dedstorage", "[]");
  location = "";
}

$("#notes-hud").hide();
$("#calendar-hud").hide();
$("#chatroom-hud").hide();

setInterval(function () {
  const datetime = new Date().toLocaleString();
  datetime_hud.innerText = datetime;
}, 500);

$("#basic-calc").submit(function () {
  event.preventDefault();

  const num1 = document.getElementById("num1").value;
  const num2 = document.getElementById("num2").value; 

  const eqtype = document.getElementById("eqtype");
  const result = document.getElementById("basic-calc-result");

  const parsed_num1 = parseFloat(num1);
  const parsed_num2 = parseFloat(num2);

  if (parsed_num1 === NaN) {
    parsed_num1 = 0;
  }

  else {
    // PASS
  }

  if (parsed_num2 === NaN) {
    parsed_num2 = 0;
  }

  else {
    // PASS
  }

  if (eqtype.value === "+") {
    result.innerText = "Result: " + parseFloat(parsed_num1 + parsed_num2);
  }

  else if (eqtype.value === "-") {
    result.innerText = "Result: " + parseFloat(parsed_num1 - parsed_num2);
  }

  else if (eqtype.value === "*") {
    result.innerText = "Result: " + parseFloat(parsed_num1 * parsed_num2);
  }

  else if (eqtype.value === "÷") {
    result.innerText = "Result: " + parseFloat(parsed_num1 / parsed_num2);
  }
});

$("#simplify").submit(function () {
  event.preventDefault();

  const expression = document.getElementById("expression").value;
  const result = document.getElementById("expression-result");

  const simplified = nerdamer(expression);
  result.innerText = "Result: " + simplified.toString();
});

$("#open-notes").click(function () {
  $("#tool-hud").hide();
  $("#notes-hud").show();
});

$("#back-to-tool-hud-from-notes").click(function () {
  $("#notes-hud").hide();
  $("#tool-hud").show();
});

$("#save-notes").click(function () {
  localStorage.setItem("notes_storage_botany_bay", notes.value);
});

$("#open-calendar").click(function () {
  $("#tool-hud").hide();
  $("#calendar-hud").show();
});

$("#back-to-tool-hud-from-calendar").click(function () {
  $("#calendar-hud").hide();
  $("#tool-hud").show();
});

$("#open-chat").click(function () {
  $("#chatroom-hud").show();
  $("#tool-hud").hide();

  chatbox.scrollTo(0, chatbox.scrollHeight);
});

$("#back-to-tool-hud-from-chat").click(function () {
  $("#chatroom-hud").hide();
  $("#tool-hud").show();
});

$("#dontcancelme").click(function () {
  window.open("https://discord.gg/nBGnytRr8x");
});

$("#proxy-form").submit(function () {
  event.preventDefault();
  const url_input = document.getElementById("url-input");

  if (url_input.value.includes("https://" || url_input.value.includes("http://"))) {
    window.open("https://borgcube.codesalvageon.repl.co/u/" + url_input.value);
  }

  else {
    url_input.value = "https://" + url_input.value;

    localStorage.setItem("dedstorage", JSON.stringify(ai_storage));

    window.open("https://botany-bay.codesalvageon.repl.co/u/" + url_input.value);
  }
  
  /*
  if (ai_storage === null) {
    url_input.value = "";
  }

  else {
    let preset_val1 = 0;
    let preset_val2 = 0;
    let preset_val3 = 0;
    let preset_val4 = 0;
    let preset_val5 = 0;

    for (i = 0; i < ai_storage.length; i++) {
      if (ai_storage[i] === ai_storage[0]) {
        preset_val1 = preset_val1 + 1;
      }

      else if (ai_storage[i] === ai_storage[1]) {
        preset_val2 = preset_val2 + 1;
      }

      else if (ai_storage[i] === ai_storage[2]) {
        preset_val3 = preset_val3 + 1;
      }

      else if (ai_storage[i] === ai_storage[3]) {
        preset_val4 = preset_val4 + 1;
      }

      else if (ai_storage[i] === ai_storage[4]) {
        preset_val5 = preset_val5 + 1;
      }
    }

    if (preset_val1 > preset_val2 && preset_val1 > preset_val3 && preset_val1 > preset_val4 && preset_val1 > preset_val5) {
      url_input.value = ai_storage[0];
    }

    else if (preset_val2 > preset_val1 && preset_val2 > preset_val3 && preset_val2 > preset_val4 && preset_val2 > preset_val5) {
      url_input.value = ai_storage[1];
    }

    else if (preset_val3 > preset_val1 && preset_val3 > preset_val2 && preset_val3 > preset_val4 && preset_val3 > preset_val5) {
      url_input.value = ai_storage[2];
    }

    else if (preset_val4 > preset_val1 && preset_val4 > preset_val2 && preset_val4 > preset_val3 && preset_val4 > preset_val5) {
      url_input.value = ai_storage[3];
    }

    else if (preset_val5 > preset_val1 && preset_val5 > preset_val2 && preset_val5 > preset_val3 && preset_val5 > preset_val4) {
      url_input.value = ai_storage[1];
    }

    else {
      url_input.value = ai_storage[0];
    }

    */
});

notes.value = localStorage.getItem("notes_storage_botany_bay");

const word_problem_input = document.getElementById("word-problems-input");
const answer_keys_input = document.getElementById("answer-keys-input");
const company_select = document.getElementById("company-select");

$("#word-problems").submit(function () {
  event.preventDefault();

  const fixed_url = word_problem_input.value.replace(" ", "%20");
  
  fetch ("/getlinks", {
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({
      url : "https://www.google.com/search?q=" + fixed_url
    })
  })
  .then(response => response.text())
  .then(data => {
    const data_array = data.split("<a href=");
    const all_array = [];
    let turn = 0;

    word_problems_answers.innerHTML = "";

    for (i = 0; i < data_array.length; i++) {
      if (data_array[i].includes("https://")) {
        const link_array = data_array[i].split('"');

        if (turn === 0) {
          // PASS 
          turn = turn + 1;
        }

        else {
          all_array.push(link_array[1]);
        }
      }
    }

    for (i = 0; i < all_array.length; i++) {
      word_problems_answers.innerHTML = word_problems_answers.innerHTML + "<p class='glow-augment small-text'><a href='https://google.com" + all_array[i] + "' target='_blank'>" + all_array[i] + "</a></p>";
    }
  })
  .catch(error => {
    throw error;
  });
});


$("#answer-keys").submit(function () {
  event.preventDefault();

  const fixed_url = answer_keys_input.value.replace(" ", "%20");
  let company_value = "";

  if (company_select.value === "svr") {
    company_value = "savvas realize";
  }

  else if (company_select.value === "iready") {
    company_value = "i-ready";
  }

  else if (company_select.value === "ixl") {
    company_value = "ixl";
  }

  else if (company_select.value === "pearson") {
    company_value = "pearson";
  }

  else if (company_select.value === "commonlit") {
    company_value = "commnonlit";
  }

  else if (company_select.value === "mgh") {
    company_value = "McGraw-Hill";
  }

  else if (company_select.value === "bim") {
    company_value = "big ideas math";
  }
  
  else if (company_select.value === "nela") {
    company_value = "Newsela";
  }

  else if (company_select.value === "schol") {
    company_value = "scholastic";
  }

  else if (company_select.value === "cgl") {
    company_value = "cengage learning";
  }

  else if (company_select.value === "hmh") {
    company_value = "houghton mifflin harcourt";
  }
  
  fetch ("/getlinks", {
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({
      url : "https://www.google.com/search?q=" + company_value + " " + fixed_url
    })
  })
  .then(response => response.text())
  .then(data => {
    const data_array = data.split("<a href=");
    const all_array = [];
    let turn = 0;

    answer_keys_links.innerHTML = "";

    for (i = 0; i < data_array.length; i++) {
      if (data_array[i].includes("https://")) {
        const link_array = data_array[i].split('"');

        if (turn === 0) {
          // PASS 
          turn = turn + 1;
        }

        else {
          all_array.push(link_array[1]);
        }
      }
    }

    for (i = 0; i < all_array.length; i++) {
      answer_keys_links.innerHTML = answer_keys_links.innerHTML + "<p class='glow-augment small-text'><a href='https://google.com" + all_array[i] + "' target='_blank'>" + all_array[i] + "</a></p>";
    }
  })
  .catch(error => {
    throw error;
  });
});