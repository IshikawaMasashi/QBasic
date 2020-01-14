export var WorkerCommand;
(function (WorkerCommand) {
    WorkerCommand[WorkerCommand["OptimizeWasmWithBinaryen"] = 0] = "OptimizeWasmWithBinaryen";
    WorkerCommand[WorkerCommand["ValidateWasmWithBinaryen"] = 1] = "ValidateWasmWithBinaryen";
    WorkerCommand[WorkerCommand["CreateWasmCallGraphWithBinaryen"] = 2] = "CreateWasmCallGraphWithBinaryen";
    WorkerCommand[WorkerCommand["ConvertWasmToAsmWithBinaryen"] = 3] = "ConvertWasmToAsmWithBinaryen";
    WorkerCommand[WorkerCommand["DisassembleWasmWithBinaryen"] = 4] = "DisassembleWasmWithBinaryen";
    WorkerCommand[WorkerCommand["AssembleWatWithBinaryen"] = 5] = "AssembleWatWithBinaryen";
    WorkerCommand[WorkerCommand["DisassembleWasmWithWabt"] = 6] = "DisassembleWasmWithWabt";
    WorkerCommand[WorkerCommand["AssembleWatWithWabt"] = 7] = "AssembleWatWithWabt";
    WorkerCommand[WorkerCommand["TwiggyWasm"] = 8] = "TwiggyWasm";
})(WorkerCommand || (WorkerCommand = {}));
//# sourceMappingURL=message.js.map