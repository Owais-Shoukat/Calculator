
let input = document.querySelector("input");
let buttons = document.querySelectorAll("button");

let done = false;

buttons.forEach(function (button) {
    button.addEventListener("click", function () {

        let value = button.textContent.trim();

        if (value === "") {
            value = "DEL";
        }

        let text = input.value;

        if (text === "Error") {
            text = "";
        }

        let last = text.slice(-1);

        let start = Math.max(
            text.lastIndexOf("+"),
            text.lastIndexOf("-"),
            text.lastIndexOf("X"),
            text.lastIndexOf("÷")
        );
        let currentNumber = text.slice(start + 1);

        let lastIsOperator = false;
        if (last === "+" || last === "-" || last === "X" || last === "÷") {
            lastIsOperator = true;
        }

        if (value === "AC") {
            input.value = "";
            done = false;
        }

        else if (value === "C" || value === "DEL") {
            if (done) {
                input.value = "";
                done = false;
            } else {
                input.value = text.slice(0, -1);
            }
        }

        else if (value === "=") {
            if (text === "" || text === "-") {
                return;
            }

            if (lastIsOperator) {
                text = text.slice(0, -1);
            }

            text = text.replaceAll("X", "*");
            text = text.replaceAll("÷", "/");
            text = text.replaceAll("%", "/100");

            let result = eval(text);

            if (isFinite(result)) {
                input.value = parseFloat(result.toFixed(8));
            } else {
                input.value = "Error";
            }

            done = true;
        }

        else if (value === "+" || value === "-" || value === "X" || value === "÷") {
            done = false;

            if (text === "") {
                if (value === "-") {
                    input.value = "-";
                } else {
                    input.value = "";
                }
            }
            else if (text === "-") {
                input.value = "-";
            }
            else if (last === "+" && value === "+") {
                input.value = text;
            }
            else if (last === "-" && value === "-") {
                input.value = text;
            }
            else if (last === "X" && value === "X") {
                input.value = text;
            }
            else if (last === "÷" && value === "÷") {
                input.value = text;
            }
            else if (lastIsOperator) {
                input.value = text.slice(0, -1) + value;
            }
            else {
                input.value = text + value;
            }
        }

        else if (value === "%") {
            if (text !== "" && "0123456789".includes(last)) {
                input.value = text + "%";
                done = false;
            }
        }

        else if (value === ".") {
            if (done) {
                input.value = "0.";
                done = false;
            }
            else if (last === "%") {
            }
            else if (currentNumber.includes(".")) {
            }
            else if (currentNumber === "") {
                input.value = text + "0.";
            }
            else {
                input.value = text + ".";
            }
        }

        else {
            if (done) {
                input.value = value;
                done = false;
            }
            else if (last === "%") {
            }
            else if (currentNumber === "0") {
                input.value = text.slice(0, -1) + value;
            }
            else {
                input.value = text + value;
            }
        }

    });
});
