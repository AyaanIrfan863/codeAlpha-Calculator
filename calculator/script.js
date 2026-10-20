const display = document.getElementById("display");

function addValue(value) {
  if (display.value === "Error") {
    display.value = "0";
  }

  if (display.value === "0" && /[0-9.]/.test(value)) {
    display.value = value;
  } else {
    display.value += value;
  }
}

function clearDisplay() {
  display.value = "0";
}

function deleteLast() {
  display.value = display.value.slice(0, -1) || "0";
}

function percentage() {
  const value = Number(display.value);

  if (Number.isFinite(value)) {
    display.value = String(value / 100);
  }
}

function calculate() {
  try {
    const expression = display.value;

    if (!/^[0-9+\-*/.() ]+$/.test(expression)) {
      throw new Error("Invalid expression");
    }

    const result = Function(
      '"use strict"; return (' + expression + ')'
    )();

    if (!Number.isFinite(result)) {
      throw new Error("Invalid result");
    }

    display.value = String(
      Number(result.toPrecision(12))
    );
  } catch {
    display.value = "Error";
  }
}