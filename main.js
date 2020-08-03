var commands = [
  "SS",
  "SLS",
  "SLT",
  "SLL",
  "TSSS",
  "TSST",
  "TSSL",
  "TSTS",
  "TSTT",
  "TTS",
  "TTT",
  "LSS",
  "LST",
  "LSL",
  "LTS",
  "LTT",
  "LTL",
  "LLL",
  "TLSS",
  "TLST",
  "TLTS",
  "TLTT"
]
var stack = []
var heap = {}
var labels= {}
var call_stack = []
var jump_label = [false]
var stop_run = false
var raw_program
var program
var program_i
var output = document.getElementById("output")
var sleep_time = 30

function run() {
  program_i[0] += program_i[1]

  if (jump_label[0]) {
    switch (match_command()) {
      case 0:
      case 12:
      case 13:
      case 14:
      case 15:
        number()
        break
      case 11:
        var label = number(true)
        labels[label] = program_i.concat()
        if (jump_label[1] == label) jump_label = [false]
        break
    }
  } else {
    switch (match_command()) {
      case 0:
        stack.unshift(number())
        break
      case 1:
        stack.unshift(stack[0])
        break
      case 2:
        stack.unshift(stack[1])
        stack.splice(2, 1)
        break
      case 3:
        stack.shift()
        break
      case 4:
        stack.unshift(stack[1] + stack[0])
        stack.splice(1, 2)
        break
      case 5:
        stack.unshift(stack[1] - stack[0])
        stack.splice(1, 2)
        break
      case 6:
        stack.unshift(stack[1] * stack[0])
        stack.splice(1, 2)
        break
      case 7:
        stack.unshift(Math.floor(stack[1] / stack[0]))
        stack.splice(1, 2)
        break
      case 8:
        stack.unshift(stack[1] % stack[0])
        stack.splice(1, 2)
        break
      case 9:
        heap[stack[1]] = stack[0]
        stack.splice(0, 2)
        break
      case 10:
        stack.unshift(heap[stack[0]])
        stack.splice(1, 1)
        break
      case 11:
        labels[number(true)] = program_i.concat()
        break
      case 12:
        var label = number(true)
        call_stack.unshift(program_i.concat())
        if (labels[label]) program_i = labels[label].concat()
        else jump_label = [true, label]
        break
      case 13:
        var label = number(true)
        if (labels[label]) program_i = labels[label].concat()
        else jump_label = [true, label]
        break
      case 14:
        var label = number(true)
        if (stack[0] == 0 && labels[label]) program_i = labels[label].concat()
        else if (stack[0] == 0) jump_label = [true, label]
        stack.shift()
        break
      case 15:
        var label = number(true)
        if (stack[0] < 0 && labels[label]) program_i = labels[label].concat()
        else if (stack[0] < 0) jump_label = [true, label]
        stack.shift()
        break
      case 16:
        program_i = call_stack[0]
        call_stack.shift()
        break
      case 17:
        stop_run = true
        break
      case 18:
        output.innerText += String.fromCharCode(stack[0])
        stack.shift()
        break
      case 19:
        output.innerText += stack[0]
        stack.shift()
        break
      case 20:
        
        break
      case 21:
        
        break
    }
  }
  
  show()

  if (program_i[0] + program_i[1] < program.length && !stop_run) setTimeout(run, sleep_time)
  else {
    program_i[0] = program.length
    setTimeout(show, sleep_time)
  }
}

function match_command() {
  var run_command
  commands.forEach((command, index) => {
    var next_command = program.slice(program_i[0], program_i[0] + command.length)
    next_command = next_command.replace(/ /g, "S").replace(/\t/g, "T").replace(/\n/g, "L")
    if (next_command == command) {
      program_i[1] = command.length
      run_command = index
    }
  })
  return run_command
}

function number(label_number) {
  var number_i = program_i[0] + program_i[1] - (label_number ? 1 : 0)
  program_i[1] = 1
  var binary_number = "0"
  var sign = label_number || program[number_i] == " " ? 1 : -1
  for (var i=number_i; i<program.length; i++) {
    number_i++
    if (program[number_i] == "\n") break
    else {
      binary_number += program[number_i].replace(" ", "0").replace("\t", "1")
    }
  }
  program_i[1] = number_i - program_i[0] +1
  return parseInt(binary_number, 2) * sign
}

function show() {
  var program_elm_html = ""
  var count_commands = 0
  var line_count = 1
  var auto_scroll = true
  for (var i=0; i<raw_program.length; i++) {
    var is_command = /[ \t\n]/.test(raw_program[i])
    var show_program = raw_program[i].replace(" ", "[SPACE]").replace("\t", "[TAB]").replace("\n", "[LF]\n")
    
    if (count_commands == program_i[0] && is_command) program_elm_html += `<span class="running">`
    program_elm_html += `<span>${show_program}</span>`
    if (count_commands == program_i[0] + program_i[1] - 1 && is_command) {
      program_elm_html += `</span>`
      auto_scroll = false
    }
    
    if (raw_program[i] == "\n" && auto_scroll) line_count++
    if (is_command) count_commands++
  }
  var program_elm = document.getElementById("program")
  program_elm.innerHTML = program_elm_html
  var program_wrapper = program_elm.parentNode
  var line_height = parseFloat(getComputedStyle(program_elm).getPropertyValue("line-height"))
  program_wrapper.scrollTo(0, line_height * (line_count + 1) - program_wrapper.offsetHeight)
}

document.getElementById("run").addEventListener("click", ()=>{
  stop_run = false
  raw_program = document.getElementById("input_program").value
  program = raw_program.replace(/[^ \t\n]/g, "")
  program_i = [0, 0]
  output.innerText = null
  setTimeout(run, sleep_time)
})