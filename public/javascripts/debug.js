function _f() {
//INSERT_CODE
//EXIT;
}//USER_SCRIPT
Debug = debug.Debug
var _steps = 0;

if (typeof _maxStep === 'undefined') {
    var _maxStep = 100;
}

var _print = print;
var _exit = false;
var _stdout = '';
print = function() {
    if (arguments.length === 0) return 
    var result = ''+arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        //_print(result, i, arguments.length)
        result += ' ' + arguments[i];
        //_print(result, 'x')
    }
    //_print(_stdout);
    _stdout += result+'\n';
    //_print(_stdout);
};
var _typeof = function(obj) {
    if (obj === undefined || obj === null)
        return 'string'
    var type = typeof obj;
    if (type === 'number' || type === 'string' || type == 'function') {
        return type;
    }
    var s = JSON.stringify(obj);
    if (s[0] === '[') return 'LIST';
    if (s[0] === '{') return 'DICT';
    return 'NONE';
}

var _globals_internals = [];
function listener(event, exec_state, event_data, data) {
  if (event == Debug.DebugEvent.Break) {
      if (_steps > _maxStep) {
          var end = {
              event: "instruction_limit_reached",
              exception_msg: "max _steps reached:"+_maxStep,
          }
          _print(JSON.stringify(end));
          return;
      }
      //if (_exit) { return; }
      var frame = exec_state.frame();
      var text = frame.sourceLineText();
      if (text.indexOf("//USER_SCRIPT") < 0) { 
          exec_state.prepareStep(Debug.StepAction.StepIn, 1);
          return;
      } 
      //_print(JSON.stringify(frame));
      var details_ = frame.details_.details_;
      var globals_ = details_[1];
      if (_steps === 0) {
          for (var _key in globals_) {
              //_print(_key);
              if (globals_.hasOwnProperty(_key)) {
                  _globals_internals.push(_key);
              }
          }
          //_print(_globals_internals);
      }
      var globals = {};
      var globals_list = [];
      var globals_dict = globals_list;
      var globals_function = globals_list;
      for (var _key in globals_) {
          if (globals_.hasOwnProperty(_key) && _globals_internals.indexOf(_key) < 0) {
              var _value = globals_[_key];
              var _type = _typeof(_value);
              //_print(_type);
              if (_type === 'number' || _type === 'string') {
                  globals[_key] = _value;
              }
              if (_type === 'LIST') {
                  var _id = globals_list.indexOf(_value);
                  if (_id < 0) {
                      _id = globals_list.push(_value);
                  }
                  else {
                      _id++;
                  }
                  //_print(_id);
                  var _copy = ['LIST',_id].concat(_value);
                  globals[_key] = _copy;
              }
              if (_type === 'DICT') {
                  var _id = globals_dict.indexOf(_value);
                  if (_id < 0) {
                      _id = globals_dict.push(_value);
                  }
                  else {
                      _id++;
                  }
                  //_print(_id);
                  var _copy = ['DICT',_id];
                  for (var _j in _value) {
                      if (_value.hasOwnProperty(_j)) {
                          var _v = _value[_j];
                          _copy.push([_j, _v]);
                      }
                  }
                  globals[_key] = _copy;
              }
              if (_type === 'function') {
                  var _id = globals_function.indexOf(_value);
                  if (_id < 0) {
                      _id = globals_function.push(_value);
                  }
                  else {
                      _id++;
                  }
                  globals[_key] = ['function',_id, '<function '+_key+'>'];
              }
          }
      }
      //_print(JSON.stringify(globals));
      //_print(JSON.stringify(details_));
      var local = 9;
      var locals = {};
      while(local+1 < details_.length) {
          var _key = details_[local];
          if (_key === null || typeof _key === 'undefined') {
              _key = 'anonymous';
          }
          var _value = details_[local+1];
          local += 2;
          var _type = _typeof(_value);
          if (_type === 'number' || _type === 'string' || _type === 'undefined' || _type === null) {
              locals[_key] = _value;
          }
          if (_type === 'LIST') {
              var _id = globals_list.indexOf(_value);
              if (_id < 0) {
                  _id = globals_list.push(_value);
              }
              else {
                  _id++;
              }
              //_print(_id);
              var _copy = ['LIST',_id].concat(_value);
              locals[_key] = _copy;
          }
          if (_type === 'DICT') {
              var _id = globals_dict.indexOf(_value);
              if (_id < 0) {
                  _id = globals_dict.push(_value);
              }
              else {
                  _id++;
              }
              //_print(_id);
              var _copy = ['DICT',_id];
              for (var _j in _value) {
                  if (_value.hasOwnProperty(_j)) {
                      var _v = _value[_j];
                      _copy.push([_j, _v]);
                  }
              }
              locals[_key] = _copy;
          }
          if (_type === 'function') {
              var _id = globals_function.indexOf(_value);
              if (_id < 0) {
                  _id = globals_function.push(_value);
              }
              else {
                  _id++;
              }
              locals[_key] = ['function',_id, '<function '+_key+'>'];
          }
      }
      var step = {
        event: "step_line",
        func_name: "",//frame.func(),
        globals: globals,
        locals: locals,
        line: frame.sourceLine(),
        //text: frame.sourceLineText(),
        stack_locals: [],
        stdout: _stdout,
        }
      _steps++;
      exec_state.prepareStep(Debug.StepAction.StepIn, 1);
      _print(JSON.stringify(step));
  }
};

// Add the debug event listener.
Debug.setListener(listener);

// Set a breakpoint on the for statement (line 1).
Debug.setBreakPoint(_f, 1);

try {
_f();
}
catch(e) {
    Debug.setListener(null);
    _exit = true;
    var exception = {"event":"uncaught_exception","exception_msg":e.toString(), stdout: _stdout};
    _print(JSON.stringify(exception));
}
// Get rid of the debug event listener.

