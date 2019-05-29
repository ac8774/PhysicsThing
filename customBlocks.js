Blockly.Blocks['on_reset'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("When the world starts:");
    this.appendStatementInput("code")
        .setCheck(null);
    this.setInputsInline(true);
    this.setColour(60);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['every_n_frames'] = {
  init: function() {
    this.appendValueInput("N")
        .setCheck(null)
        .appendField("Every");
    this.appendDummyInput()
        .appendField("frames:");
    this.appendStatementInput("code")
        .setCheck(null);
    this.setInputsInline(true);
    this.setColour(60);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['statement'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("//JavaScript statement"), "code")
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['expression'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("\"JavaScript expression\""), "code");
    this.setOutput(true, null);
    this.setColour(60);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['new_shape'] = {
  init: function() {
    this.appendValueInput("x")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("new")
        .appendField(new Blockly.FieldDropdown([["circle","circle"],["square","square"]]), "shape")
        .appendField("at x:");
    this.appendValueInput("y")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("y:");
    this.appendValueInput("r")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("r:");
    this.appendValueInput("color")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("color:");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};





Blockly.JavaScript['on_reset'] = function(block) {
  var statements_code = Blockly.JavaScript.statementToCode(block, 'code');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['every_n_frames'] = function(block) {
  var value_n = Blockly.JavaScript.valueToCode(block, 'N', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_code = Blockly.JavaScript.statementToCode(block, 'code');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['statement'] = function(block) {
  var text_code = block.getFieldValue('code');
  var code = text_code + '\n';
  return code;
};

Blockly.JavaScript['expression'] = function(block) {
  var text_code = block.getFieldValue('code');
  var code = text_code;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['new_shape'] = function(block) {
  var dropdown_shape = block.getFieldValue('shape');
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
  var value_r = Blockly.JavaScript.valueToCode(block, 'r', Blockly.JavaScript.ORDER_ATOMIC);
  var value_color = Blockly.JavaScript.valueToCode(block, 'color', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = "";
  if(dropdown_shape=="circle") code = 'newCircle('+value_r+','+value_x+','+value_y+','+value_color+');\n';
  if(dropdown_shape=="square") code = 'newSquare('+value_r+','+value_x+','+value_y+','+value_color+');\n';
  
  return code;
};