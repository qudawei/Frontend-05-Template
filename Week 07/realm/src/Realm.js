import G6 from '@antv/g6'

 let realmObjs = [
 'Array',
 'ArrayBuffer',
 'ArrayBufferPrototype',
 'ArrayIteratorPrototype',
 'ArrayPrototype',
 'ArrayProto_entries',
 'ArrayProto_forEach',
 'ArrayProto_keys',
 'ArrayProto_values',
 'AsyncFromSyncIteratorPrototype',
 'AsyncFunction',
 'AsyncFunctionPrototype',
 'AsyncGenerator',
 'AsyncGeneratorFunction',
 'AsyncGeneratorPrototype',
 'AsyncIteratorPrototype',
 'Atomics',
 'Boolean',
 'BooleanPrototype',
 'DataView',
 'DataViewPrototype',
 'Date',
 'DatePrototype',
 'decodeURI',
 'decodeURIComponent',
 'encodeURI',
 'encodeURIComponent',
 'Error',
 'ErrorPrototype',
 'eval',
 'EvalError',
 'EvalErrorPrototype',
 'Float32Array',
 'Float32ArrayPrototype',
 'Float64Array',
 'Float64ArrayPrototype',
 'Function',
 'FunctionPrototype',
 'Generator',
 'GeneratorFunction',
 'GeneratorPrototype',
 'Int8Array',
 'Int8ArrayPrototype',
 'Int16Array',
 'Int16ArrayPrototype',
 'Int32Array',
 'Int32ArrayPrototype',
 'isFinite',
 'isNaN',
 'IteratorPrototype',
 'JSON',
 'JSONParse',
 'Map',
 'MapIteratorPrototype',
 'MapPrototype',
 'Math',
 'Number',
 'NumberPrototype',
 'Object',
 'ObjectPrototype',
 'ObjProto_toString',
 'ObjProto_valueOf',
 'parseFloat',
 'parseInt',
 'Promise',
 'PromisePrototype',
 'PromiseProto_then',
 'Promise_all',
 'Promise_reject',
 'Promise_resolve',
 'Proxy',
 'RangeError',
 'RangeErrorPrototype',
 'ReferenceError',
 'ReferenceErrorPrototype',
 'Reflect',
 'RegExp',
 'RegExpPrototype',
 'Set',
 'SetIteratorPrototype',
 'SetPrototype',
 'SharedArrayBuffer',
 'SharedArrayBufferPrototype',
 'String',
 'StringIteratorPrototype',
 'StringPrototype',
 'Symbol',
 'SymbolPrototype',
 'SyntaxError',
 'SyntaxErrorPrototype',
 'ThrowTypeError',
 'TypedArray',
 'TypedArrayPrototype',
 'TypeError',
 'TypeErrorPrototype',
 'Uint8Array',
 'Uint8ArrayPrototype',
 'Uint8ClampedArray',
 'Uint8ClampedArrayPrototype',
 'Uint16Array',
 'Uint16ArrayPrototype',
 'Uint32Array',
 'Uint32ArrayPrototype',
 'URIError',
 'URIErrorPrototype',
 'WeakMap',
 'WeakMapPrototype',
 'WeakSet',
 'WeakSetPrototype',
 ]

 let classification = {}
 function classificate(){
  let bases = [
         'Array',
         'Async',
         'Atomics',
         'Boolean',
         'DataView',
         'Date',
         'URI',
         'Error',
         'eval',
         'Float',
         'Function',
         'Generator',
         'Int',
         'isFinite',
         'isNaN',
         'IteratorPrototype',
         'JSON',
         'Map',
         'Math',
         'Number',
         'Object',
         'ObjProto',
         'parse',
         'Promise',
         'Proxy',
         'Reflect',
         'Regexp',
         'Set',
         'String',
         'Symbol',
         'Syntax',
         'ThrowType',
         'Unit',
         'Weak',
     ]
     let classification= {}
     for(let base of bases){
         for(let re of realmObjs){
             if(re.includes(base)){
                 if(!classification[base]) classification[base] = []
                 classification[base].push(re)
             }
         }
     }
     console.dir(classification)
 }

 classificate(realmObjs)

